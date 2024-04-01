@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div id="app">
            <div class="panel panel-default">
                <div class="panel-heading">How To Build Live Chat App In Laravel 9 And Vue JS</div>

                <div class="panel-body">
                    <chat-message :messages="messages"></chat-message>
                </div>
                <div class="panel-footer">
                    <chat-form
                        v-on:messagesent="addMessage"
                        :user="{{ Auth::user() }}"
                    ></chat-form>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
@endsection