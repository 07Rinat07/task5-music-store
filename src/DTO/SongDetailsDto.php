<?php

namespace App\DTO;

class SongDetailsDto
{
    public function __construct(
        public int $index,
        public string $title,
        public string $artist,
        public string $album,
        public string $genre,
        public int $likes,
        public string $review,
        public string $coverUrl,
        public string $audioUrl
    ) {}
}
