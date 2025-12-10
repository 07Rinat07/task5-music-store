<?php

namespace App\Service\SongGenerator;

final class ReviewGenerator
{
    public function __construct(
        private LocaleDataProvider $locales
    ) {}

    public function generate(string $locale, int $seed, int $songIndex): string
    {
        $dict = $this->locales->get($locale);

        // Сид рецензий связан с песней
        $random = new SeededRandom($seed + $songIndex * 17);

        $phrases = $dict['reviews'];

        return $phrases[$random->nextInt(count($phrases))];
    }
}
