#!/bin/bash

echo "----------------------------------------"
echo "   TASK5 MUSIC STORE — FULL REBUILD"
echo "----------------------------------------"

echo "1) Stopping and removing containers + volumes..."
docker compose down -v

echo "----------------------------------------"
echo "2) Building images from scratch..."
docker compose build --no-cache

echo "----------------------------------------"
echo "3) Starting containers..."
docker compose up -d

echo "----------------------------------------"
echo "4) Clearing Symfony cache..."
docker compose exec php php bin/console cache:clear

echo "----------------------------------------"
echo "5) Checking containers status..."
docker compose ps

echo "----------------------------------------"
echo "6) Testing Audio Server health..."
docker compose exec php curl -I http://audio-server:3000/audio?seed=1&index=5

echo "----------------------------------------"
echo "7) Testing Symfony API availability..."
curl -I http://localhost:8080/api/songs/list

echo "----------------------------------------"
echo "🎉 FULL REBUILD COMPLETE!"
echo "Open the app at: http://localhost:8080"
echo "----------------------------------------"
