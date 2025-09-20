<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Models\User;

use App\Laravel\Actions\Portal\User\{UserList, UserCreate, UserUpdate, 
    UserUpdateStatus, UserUpdatePassword, UserDelete};

use App\Laravel\Requests\PageRequest;
use App\Laravel\Requests\Portal\UserRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class UserController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Users";
        $this->data['statuses'] = ['active' => "Active", 'inactive' => "Inactive"];
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - Login";

        $this->data['keyword'] = Str::lower($request->get('keyword'));
        $this->data['selected_status'] = $request->get('status');

        $first_record = User::where('id', '!=', '1')->oldest()->first();
        $start_date = $first_record ? $request->get('start_date', $first_record->created_at->format("Y-m-d")) : $request->get('start_date', now()->startOfMonth());
        
        $this->data['start_date'] = Carbon::parse($start_date)->format("Y-m-d");
        $this->data['end_date'] = Carbon::parse($request->get('end_date', now()))->format("Y-m-d");

        $action = new UserList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/users/users-index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create User";

        return inertia('modules/users/users-create', ['values' => $this->data]);
    }

    public function store(UserRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');

        $action = new UserCreate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit User";

        $this->data['user'] = User::find($id);

        if(!$this->data['user']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.users.index');
        }

        return inertia('modules/users/users-edit', ['values' => $this->data]);
    }

    public function update(UserRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');

        $action = new UserUpdate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function update_status(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserUpdateStatus(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function update_password(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserUpdatePassword(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function destroy(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserDelete(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }
}