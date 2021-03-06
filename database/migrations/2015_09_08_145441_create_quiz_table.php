<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

class CreateQuizTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiz', function(Blueprint $table){
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->text('question')->nullable();
            $table->string('locale');
            $table->string('slug');
            $table->timestamps();
            $table->timestamp('published_at');
            $table->timestamp('date')->default(Carbon::today());
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('quiz', function(Blueprint $table) {

            $table->dropForeign('quiz_user_id_foreign');
            $table->dropSoftDeletes();

        });

    }
}
