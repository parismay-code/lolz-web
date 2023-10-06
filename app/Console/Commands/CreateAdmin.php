<?php

namespace App\Console\Commands;

use App\Models\Admin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {login} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new administrator';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $login = $this->argument('login');
        $password = Hash::make($this->argument('password'));

        if (Admin::where('login', $login)->exists()) {
            $this->info("Admin with login $login already exists");
            return;
        }

        if (!Admin::create(['login' => $login, 'password' => $password])) {
            $this->info("Admin wasn't created");
            return;
        }

        $this->info("Admin $login successfully created");
    }
}
