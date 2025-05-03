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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('alias');
            $table->string('badge')->nullable();
            $table->integer('stock')->default(0);
            $table->integer('view')->default(0);
            $table->integer('price');
            $table->boolean('limited')->default(false);
            $table->boolean('negoable')->default(false);
            $table->json('category');
            $table->string('number');
            $table->date('date');
            $table->decimal('weight', 10, 2);
            $table->string('diameter');
            $table->string('cut');
            $table->string('shape');
            $table->string('color');
            $table->text('comments')->nullable();
            $table->string('origin');
            $table->text('description');
            $table->json('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
