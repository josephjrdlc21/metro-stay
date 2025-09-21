<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('room_types', function (Blueprint $table) {
            $table->string('bed_type')->nullable()->after('name');
            $table->json('amenities')->nullable()->after('description');
            $table->string('source')->nullable()->after('amenities');
            $table->string('filename')->nullable()->after('source');
            $table->string('path')->nullable()->after('filename');
            $table->string('directory')->nullable()->after('path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('room_types', function (Blueprint $table) {
            $table->dropColumn([
                'bed_type', 
                'amenities', 
                'source', 
                'filename', 
                'path', 
                'directory']);
        });
    }
};
