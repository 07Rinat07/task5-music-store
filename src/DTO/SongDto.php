<?php

namespace App\DTO;

class SongDto
{
    public function __construct(
        public int $index,
        public string $title,
        public string $artist,
        public string $genre,
        public string $album,
        public int $likes
    ) {}
}
