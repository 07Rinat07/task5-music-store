<?php

namespace App\Service\SongGenerator;

use Symfony\Component\Filesystem\Filesystem;

class LocaleDataProvider
{
    private string $localeDir;

    public function __construct(string $projectDir)
    {
        $this->localeDir = $projectDir . '/config/locale';
    }

    /**
     * Загружает JSON-файл локали (например en_US.json)
     */
    public function get(string $locale): array
    {
        $file = $this->localeDir . '/' . $locale . '.json';

        if (!file_exists($file)) {
            throw new \RuntimeException("Locale file not found: $file");
        }

        $json = file_get_contents($file);
        $data = json_decode($json, true);

        if ($data === null) {
            throw new \RuntimeException("Invalid JSON in locale file: $file");
        }

        return $data;
    }
}
