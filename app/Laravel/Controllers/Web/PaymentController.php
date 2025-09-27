<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Models\Payment;

use App\Laravel\Actions\Web\Payment\{PaymentList};

use App\Laravel\Requests\PageRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class PaymentController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Payments";
        $this->data['statuses'] = ['paid' => "Paid", 'unpaid' => "Unpaid"];
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        $this->data['keyword'] = Str::lower($request->get('keyword'));
        $this->data['selected_status'] = $request->get('status');

        $first_record = Payment::oldest()->first();
        $start_date = $first_record ? $request->get('start_date', $first_record->created_at->format("Y-m-d")) : $request->get('start_date', now()->startOfMonth());

        $this->data['start_date'] = Carbon::parse($start_date)->format("Y-m-d");
        $this->data['end_date'] = Carbon::parse($request->get('end_date', now()))->format("Y-m-d");

        $action = new PaymentList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/payments/payments-index', ['values' => $this->data]);
    }
}