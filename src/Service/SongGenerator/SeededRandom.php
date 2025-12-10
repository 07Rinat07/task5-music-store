<?php

namespace App\Service\SongGenerator;

final class SeededRandom
{
    private int $state;

    public function __construct(int $seed)
    {
        $this->state = $seed ?: 1;
    }

    // Простейшая детерминированная функция (LCG)
    public function next(): int
    {
        $this->state = (1103515245 * $this->state + 12345) & 0x7fffffff;
        return $this->state;
    }

    public function nextFloat(): float
    {
        return $this->next() / 0x7fffffff;
    }

    public function nextInt(int $max): int
    {
        return $this->next() % $max;
    }
}
