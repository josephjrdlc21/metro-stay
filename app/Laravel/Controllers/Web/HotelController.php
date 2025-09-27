<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Models\RoomType;
use App\Laravel\Models\Booking;

use App\Laravel\Actions\Web\Hotel\{RoomList, BookCreate};

use App\Laravel\Requests\PageRequest;
use App\Laravel\Requests\Web\HotelRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

class HotelController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Hotels";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new RoomList(
            $this->data,
            $this->per_page
        );

        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('modules/hotels/hotels-index', ['values' => $this->data]);
    }

    public function book(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show Hotel Type";

        $this->data['room_type'] = RoomType::find($id);

        if(!$this->data['room_type']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('web.hotels.index');
        }

        return inertia('modules/hotels/hotels-book', ['values' => $this->data]);
    }

    public function store_book(HotelRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['customer'] = $this->data['auth']->id;
        $this->request['check_in'] = $request->input('check_in');
        $this->request['check_out'] = $request->input('check_out');
        $this->request['guest'] = $request->input('guest');

        $action = new BookCreate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('web.bookings.index') : redirect()->back();
    }
}