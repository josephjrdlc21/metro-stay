<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Models\Customer;

use App\Laravel\Actions\Portal\Customer\{CustomerList, CustomerUpdateStatus,
    CustomerUpdatePassword};

use App\Laravel\Requests\PageRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class CustomerController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Customers";
        $this->data['statuses'] = ['active' => "Active", 'inactive' => "Inactive"];
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        $this->data['keyword'] = Str::lower($request->get('keyword'));
        $this->data['selected_status'] = $request->get('status');

        $first_record = Customer::oldest()->first();
        $start_date = $first_record ? $request->get('start_date', $first_record->created_at->format("Y-m-d")) : $request->get('start_date', now()->startOfMonth());
        
        $this->data['start_date'] = Carbon::parse($start_date)->format("Y-m-d");
        $this->data['end_date'] = Carbon::parse($request->get('end_date', now()))->format("Y-m-d");

        $action = new CustomerList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/customers/customers-index', ['values' => $this->data]);
    }

    public function update_status(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new CustomerUpdateStatus(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.customers.index') : redirect()->back();
    }

    public function update_password(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new CustomerUpdatePassword(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.customers.index') : redirect()->back();
    }

    public function show(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show Customer";

        $this->data['customer'] = Customer::find($id);

        if(!$this->data['customer']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.customers.index');
        }

        return inertia('modules/customers/customers-show', ['values' => $this->data]);
    }
}