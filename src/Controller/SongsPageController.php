<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SongsPageController extends AbstractController
{
    #[Route('/song/{index}', name: 'app_song_page')]
    public function show(int $index): Response
    {
        return $this->render('songs_page/index.html.twig', [
            'index' => $index
        ]);
    }
}
