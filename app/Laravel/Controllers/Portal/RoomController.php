<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Models\{Room, RoomType};

use App\Laravel\Actions\Portal\Room\{RoomList, RoomCreate, RoomUpdate, RoomDelete};

use App\Laravel\Requests\PageRequest;
use App\Laravel\Requests\Portal\RoomRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class RoomController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Rooms";
        $this->data['statuses'] = ['available' => "Available", 'occupied' => "Occupied", 'reserved' => "Reserved", 'maintenance' => "Maintenance", 'cleaning' => "Cleaning"];
        $this->data['bed_types'] = RoomType::pluck('name', 'id')->toArray();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        $this->data['keyword'] = Str::lower($request->get('keyword'));
        $this->data['selected_status'] = $request->get('status');

        $first_record = Room::oldest()->first();
        $start_date = $first_record ? $request->get('start_date', $first_record->created_at->format("Y-m-d")) : $request->get('start_date', now()->startOfMonth());
        
        $this->data['start_date'] = Carbon::parse($start_date)->format("Y-m-d");
        $this->data['end_date'] = Carbon::parse($request->get('end_date', now()))->format("Y-m-d");

        $action = new RoomList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/rooms/rooms-index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create Room";

        return inertia('modules/rooms/rooms-create', ['values' => $this->data]);
    }

    public function store(RoomRequest $request): RedirectResponse {
        $this->request['room_number'] = $request->input('room_number');
        $this->request['bed_type'] = $request->input('bed_type');
        $this->request['status'] = $request->input('status');

        $action = new RoomCreate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.rooms.index') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit Room";

        $this->data['room'] = Room::find($id);

        if(!$this->data['room']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.rooms.index');
        }

        return inertia('modules/rooms/rooms-edit', ['values' => $this->data]);
    }

    public function update(RoomRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['room_number'] = $request->input('room_number');
        $this->request['bed_type'] = $request->input('bed_type');
        $this->request['status'] = $request->input('status');

        $action = new RoomUpdate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.rooms.index') : redirect()->back();
    }

    public function destroy(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;

        $action = new RoomDelete(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.rooms.index') : redirect()->back();
    }
}