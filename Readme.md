# Запуск приложения
1. yarn install / npm install
2. composer install
3. Скопировать .env.example в файл .env
   - Linux: cp .env.example .env
4. Собрать реакт
   - yarn build / npm run build
5. php artisan key:generate
6. Настроить .env файл
7. Собрать контейнеры 
   - ./vendor/bin/sail up -d
8. Запустить миграции
    - ./vendor/bin/sail artisan migrate
9. Создать администратора
    - ./vendor/bin/sail artisan admin:create {login} {password}
