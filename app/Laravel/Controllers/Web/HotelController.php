<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Models\RoomType;

use App\Laravel\Actions\Web\Hotel\{RoomList};

use App\Laravel\Requests\PageRequest;
//use App\Laravel\Requests\Web\RoomRequest;

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
}