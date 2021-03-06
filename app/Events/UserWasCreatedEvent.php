<?php

namespace itway\Events;

use itway\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use itway\User;
use Illuminate\Contracts\Bus\SelfHandling;

class UserWasCreatedEvent extends Event implements ShouldBroadcast, SelfHandling
{
    use SerializesModels;

    public $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['user-registered'];
    }
}
