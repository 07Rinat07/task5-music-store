<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class StoreController extends AbstractController
{
    #[Route('/', name: 'app_store_index')]
    public function index(): Response
    {
        return $this->render('store/index.html.twig');
    }
}
