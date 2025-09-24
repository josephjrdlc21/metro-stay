<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Laravel\Models\Customer;

class UserAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Customer::where('email', 'juandelacruz@gmail.com')->first();

        if(!$user){
            $account = new Customer;
            $account->name = "Juan Dela Cruz";
            $account->email = "juandelacruz@gmail.com";
            $account->password = bcrypt("admin");
            $account->save();
        }
    }
}
