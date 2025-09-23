<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Models\{Room, RoomType};

use App\Laravel\Actions\Portal\Room\{RoomList};

use App\Laravel\Requests\PageRequest;
//use App\Laravel\Requests\Portal\RoomRequest;

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
}