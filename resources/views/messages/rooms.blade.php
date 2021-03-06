<div class="ui tab active rooms" data-tab="rooms">
    <div class="conversation-wrap l-3">
        @if (Session::has('error_message'))
            <div class="alert alert-danger" role="alert">
                {!! Session::get('error_message') !!}
            </div>
        @endif
        <?php $threadId =  $thread->id; ?>
        @if($threads->count() > 0)

            @foreach($threads as $thread)

                <?php $class = $thread->isUnread($user->id) ? 'alert-info' : ''; ?>

                <a href="{{route("itway::chat.show", $thread->id)}}" class="room-link media alert {!!$class!!} @if($thread->id === $threadId) current @endif" data-room="{{ $thread->id }}">
                    <small class="media-heading"><b> {!! $thread->subject !!}</b></small>
                    <span class="clearfix"></span>
                    <small class="last-message-body">{!! str_limit($thread->latestMessage->body,50) !!}</small>
                    <p class="chat-user-name"><small><strong>Creator:</strong> {!! $thread->creator()->name !!}</small></p>
                    {{--<p class="chat-user-name"><small><strong>Participants:</strong> {!! $thread->participantsString(Auth::id()) !!}</small></p>--}}
                </a>
                <div class="clearfix"></div>
            @endforeach

        @else
            <p>Sorry, no threads.</p>
        @endif
    </div>
</div>
