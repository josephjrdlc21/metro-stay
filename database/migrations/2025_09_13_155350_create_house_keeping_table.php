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
        Schema::create('house_keeping', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('room_id')->index()->nullable();
            $table->bigInteger('assigned_to')->index()->nullable();
            $table->string('status')->default('pending')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_keeping');
    }
};
