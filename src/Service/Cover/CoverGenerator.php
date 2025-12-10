<?php

namespace App\Service\Cover;

final class CoverGenerator
{
    public function generate(string $title, string $artist, int $seed, int $index): string
    {
        $hash = md5($title . $artist . $seed . $index);

        $r = hexdec(substr($hash, 0, 2));
        $g = hexdec(substr($hash, 2, 2));
        $b = hexdec(substr($hash, 4, 2));

        $img = imagecreatetruecolor(400, 400);
        $color = imagecolorallocate($img, $r, $g, $b);
        imagefilledrectangle($img, 0, 0, 400, 400, $color);

        ob_start();
        imagepng($img);
        $png = ob_get_clean();
        imagedestroy($img);

        return $png;
    }
}
