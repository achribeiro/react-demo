<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'role' => 'Admin',
                'phone' => '+1-555-0101',
                'website' => 'https://alice.dev',
                'company' => 'Tech Corp',
                'bio' => 'Senior developer with 10+ years of experience',
                'avatar' => 'https://i.pravatar.cc/150?img=1',
                'is_active' => true,
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'role' => 'Editor',
                'phone' => '+1-555-0102',
                'website' => 'https://bob.dev',
                'company' => 'Design Studio',
                'bio' => 'Creative designer and content creator',
                'avatar' => 'https://i.pravatar.cc/150?img=2',
                'is_active' => true,
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'role' => 'User',
                'phone' => '+1-555-0103',
                'website' => 'https://charlie.dev',
                'company' => 'Startup Inc',
                'bio' => 'Entrepreneur and startup enthusiast',
                'avatar' => 'https://i.pravatar.cc/150?img=3',
                'is_active' => true,
            ],
            [
                'name' => 'Diana Prince',
                'email' => 'diana@example.com',
                'role' => 'Admin',
                'phone' => '+1-555-0104',
                'website' => 'https://diana.dev',
                'company' => 'Enterprise Solutions',
                'bio' => 'Full-stack developer and team lead',
                'avatar' => 'https://i.pravatar.cc/150?img=4',
                'is_active' => true,
            ],
            [
                'name' => 'Eve Wilson',
                'email' => 'eve@example.com',
                'role' => 'Editor',
                'phone' => '+1-555-0105',
                'website' => 'https://eve.dev',
                'company' => 'Media Group',
                'bio' => 'Content strategist and writer',
                'avatar' => 'https://i.pravatar.cc/150?img=5',
                'is_active' => false,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}


