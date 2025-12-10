<?php

namespace App\Service\SongGenerator;

final class LocaleDataProvider
{
    private string $localeDir;

    public function __construct(string $projectDir)
    {
        $this->localeDir = $projectDir . '/config/locale';
    }

    public function get(string $locale): array
    {
        $file = $this->localeDir . '/' . $locale . '.json';

        if (!file_exists($file)) {
            throw new \RuntimeException("Locale file not found: {$file}");
        }

        $json = json_decode(file_get_contents($file), true);

        if (!is_array($json)) {
            throw new \RuntimeException("Locale file invalid: {$file}");
        }

        return $json;
    }
}
