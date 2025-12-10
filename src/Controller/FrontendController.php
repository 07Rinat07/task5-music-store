<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class FrontendController extends AbstractController
{
    #[Route('/', name: 'app_frontend_home')]
    public function index(Request $request)
    {
        return $this->render('frontend/index.html.twig');
    }

    #[Route('/song/{index}', name: 'app_frontend_song')]
    public function song(int $index, Request $request)
    {
        return $this->render('frontend/details.html.twig', [
            'index' => $index
        ]);
    }
}
