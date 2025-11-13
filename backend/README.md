# Laravel API Backend

## Instalação

1. Instale as dependências do Composer:
```bash
composer install
```

2. Configure o arquivo `.env`:
```bash
cp .env.example .env
php artisan key:generate
```

3. Configure o banco de dados no `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_demo
DB_USERNAME=root
DB_PASSWORD=
```

4. Execute as migrations e seeders:
```bash
php artisan migrate
php artisan db:seed --class=UserSeeder
```

5. Inicie o servidor:
```bash
php artisan serve
```

A API estará disponível em `http://localhost:8000/api`

## Endpoints da API

### Users

- `GET /api/users` - Lista todos os usuários (com paginação, busca e filtros)
  - Query params: `search`, `role`, `is_active`, `sort_by`, `sort_order`, `per_page`
- `GET /api/users/stats` - Estatísticas dos usuários
- `GET /api/users/{id}` - Mostra um usuário específico
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/{id}` - Atualiza um usuário
- `DELETE /api/users/{id}` - Deleta um usuário


