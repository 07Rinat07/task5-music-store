FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Ставим необходимые пакеты
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    postgresql-dev \
    libpq \
    autoconf \
    make \
    g++

# ==== GD ====
# Для PHP 8.2 ДОЛЖНО быть так:
#   --with-freetype
#   --with-jpeg
# Без путей и БЕЗ --with-png
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

RUN docker-php-ext-install -j$(nproc) gd

# PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

EXPOSE 9000

CMD ["sh", "-c", "if [ ! -d vendor ]; then composer install --no-interaction --prefer-dist; fi && php-fpm"]
