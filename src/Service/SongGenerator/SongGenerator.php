<?php

namespace App\Service\SongGenerator;

use App\DTO\SongDto;

final class SongGenerator
{
    public function __construct(
        private LocaleDataProvider $locales
    ) {}

    public function generate(string $locale, int $seed, int $page, int $limit, float $avgLikes): array
    {
        $dict = $this->locales->get($locale);

        $random = new SeededRandom($seed + $page);

        $songs = [];

        for ($i = 0; $i < $limit; $i++) {
            $index = ($page - 1) * $limit + $i + 1;

            $title = $dict['titles'][$random->nextInt(count($dict['titles']))];
            $artist = $dict['artists'][$random->nextInt(count($dict['artists']))];
            $album = $dict['albums'][$random->nextInt(count($dict['albums']))];
            $genre = $dict['genres'][$random->nextInt(count($dict['genres']))];

            // детерминированные лайки
            $likes = (int)round(
                $avgLikes + ($random->nextFloat() - 0.5) * 2.0
            );

            if ($likes < 0) $likes = 0;

            $songs[] = new SongDto(
                index: $index,
                title: $title,
                artist: $artist,
                album: $album,
                genre: $genre,
                likes: $likes
            );
        }

        return $songs;
    }
}
