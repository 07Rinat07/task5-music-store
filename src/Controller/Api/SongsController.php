<?php

namespace App\Controller\Api;

use App\DTO\SongDetailsDto;
use App\Service\SongGenerator\SongGenerator;
use App\Service\SongGenerator\ReviewGenerator;
use App\Service\Cover\CoverGenerator;
use App\Service\Audio\AudioClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SongsController extends AbstractController
{
    public function __construct(
        private SongGenerator $songGenerator,
        private ReviewGenerator $reviewGenerator,
        private CoverGenerator $coverGenerator,
        private AudioClient $audioClient,
    ) {}

    #[Route('/api/songs/list', name: 'app_api_songs_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $locale   = $request->query->get('locale', 'en_US');
        $seed     = (int) $request->query->get('seed', 1);
        $page     = (int) $request->query->get('page', 1);
        $limit    = (int) $request->query->get('limit', 20);
        $avgLikes = (float) $request->query->get('likes', 3.5);

        $songs = $this->songGenerator->generate(
            $locale,
            $seed,
            $page,
            $limit,
            $avgLikes
        );

        return $this->json($songs);
    }

    #[Route('/api/songs/details/{index}', name: 'app_api_songs_details', methods: ['GET'])]
    public function details(int $index, Request $request): JsonResponse
    {
        $locale = $request->query->get('locale', 'en_US');
        $seed   = (int)$request->query->get('seed', 1);
        $avgLikes = (float)$request->query->get('likes', 3.5);

        // Страница = номер песни / 20
        $page = (int)ceil($index / 20);

        $songs = $this->songGenerator->generate(
            $locale,
            $seed,
            $page,
            20,
            $avgLikes
        );

        $song = $songs[($index - 1) % 20];

        $review = $this->reviewGenerator->generate($locale, $seed, $index);

        $coverUrl = "/api/songs/cover/{$index}?seed={$seed}";
        $audioUrl = $this->audioClient->getAudioUrl($seed, $index);

        $dto = new SongDetailsDto(
            index: $song->index,
            title: $song->title,
            artist: $song->artist,
            album: $song->album,
            genre: $song->genre,
            likes: $song->likes,
            review: $review,
            coverUrl: $coverUrl,
            audioUrl: $audioUrl
        );

        return $this->json($dto);
    }

    #[Route('/api/songs/cover/{index}', name: 'app_api_songs_cover', methods: ['GET'])]
    public function cover(int $index, Request $request): Response
    {
        $seed = (int)$request->query->get('seed', 1);

        $songs = $this->songGenerator->generate(
            'en_US',
            $seed,
            (int)ceil($index / 20),
            20,
            3.5
        );

        $song = $songs[($index - 1) % 20];

        $png = $this->coverGenerator->generate(
            $song->title,
            $song->artist,
            $seed,
            $index
        );

        return new Response($png, 200, [
            'Content-Type' => 'image/png'
        ]);
    }
}
