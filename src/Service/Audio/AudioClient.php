<?php

namespace App\Service\Audio;

final class AudioClient
{
    public function __construct(
        private string $baseUrl = 'http://localhost:4000'
    ) {}

    public function getAudioUrl(int $seed, int $index): string
    {
        return "{$this->baseUrl}/audio?seed={$seed}&index={$index}";
    }
}
