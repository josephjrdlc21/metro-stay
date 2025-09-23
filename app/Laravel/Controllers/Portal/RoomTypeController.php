<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Models\RoomType;

use App\Laravel\Actions\Portal\RoomType\{RoomTypeList, RoomTypeCreate, 
    RoomTypeUpdate, RoomTypeDelete};

use App\Laravel\Requests\PageRequest;
use App\Laravel\Requests\Portal\RoomTypeRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class RoomTypeController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Room Types";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $first_record = RoomType::oldest()->first();
        $start_date = $first_record ? $request->get('start_date', $first_record->created_at->format("Y-m-d")) : $request->get('start_date', now()->startOfMonth());
        
        $this->data['start_date'] = Carbon::parse($start_date)->format("Y-m-d");
        $this->data['end_date'] = Carbon::parse($request->get('end_date', now()))->format("Y-m-d");

        $action = new RoomTypeList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/room-types/room-types-index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create Room Type";

        return inertia('modules/room-types/room-types-create', ['values' => $this->data]);
    }

    public function store(RoomTypeRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['bed_type'] = $request->input('bed_type');
        $this->request['capacity'] = $request->input('capacity');
        $this->request['price'] = $request->input('price');
        $this->request['description'] = $request->input('description');
        $this->request['image'] = $request->hasFile('image') ? $request->file('image') : null;
        $this->request['amenities'] = $request->input('amenities');

        $action = new RoomTypeCreate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.room_types.index') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit Room Type";

        $this->data['room_type'] = RoomType::find($id);

        if(!$this->data['room_type']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.room_types.index');
        }

        return inertia('modules/room-types/room-types-edit', ['values' => $this->data]);
    }

    public function update(RoomTypeRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['name'] = $request->input('name');
        $this->request['bed_type'] = $request->input('bed_type');
        $this->request['capacity'] = $request->input('capacity');
        $this->request['price'] = $request->input('price');
        $this->request['description'] = $request->input('description');
        $this->request['image'] = $request->hasFile('image') ? $request->file('image') : null;
        $this->request['amenities'] = $request->input('amenities');

        $action = new RoomTypeUpdate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.room_types.index') : redirect()->back();
    }

    public function show(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show Room Type";

        $this->data['room_type'] = RoomType::find($id);

        if(!$this->data['room_type']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.room_types.index');
        }

        return inertia('modules/room-types/room-types-show', ['values' => $this->data]);
    }

    public function destroy(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new RoomTypeDelete(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.room_types.index') : redirect()->back();
    }
}