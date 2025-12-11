<?php

namespace App\Service\Audio;

class AudioClient
{
    private string $baseUrl;

    public function __construct(string $baseUrl)
    {
        // Убираем финальный / если есть
        $this->baseUrl = rtrim($baseUrl, '/');
    }

    public function getAudioUrl(int $seed, int $index): string
    {
        return sprintf(
            '%s/audio?seed=%d&index=%d',
            $this->baseUrl,
            $seed,
            $index
        );
    }
}
