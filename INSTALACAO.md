# 🚀 Guia Rápido de Instalação

## Pré-requisitos

- PHP 8.1+ e Composer
- Node.js 16+ e npm
- MySQL ou outro banco de dados compatível

## Passo a Passo

### 1. Backend Laravel

```bash
# Navegue até a pasta backend
cd backend

# Instale as dependências
composer install

# Configure o ambiente
cp .env.example .env
php artisan key:generate

# Edite o .env e configure o banco de dados:
# DB_DATABASE=react_demo
# DB_USERNAME=root
# DB_PASSWORD=sua_senha

# Crie o banco de dados
mysql -u root -p
CREATE DATABASE react_demo;
exit;

# Execute as migrations
php artisan migrate

# Popule o banco com dados de exemplo
php artisan db:seed --class=UserSeeder

# Inicie o servidor
php artisan serve
```

Backend rodando em: `http://localhost:8000`

### 2. Frontend React

```bash
# Na raiz do projeto (volte um nível)
cd ..

# Instale as dependências
npm install

# Crie arquivo .env (opcional, padrão já funciona)
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Inicie o servidor de desenvolvimento
npm run dev
```

Frontend rodando em: `http://localhost:5173`

### 3. Testar

1. Abra `http://localhost:5173` no navegador
2. Você verá uma lista de usuários
3. Teste:
   - Busca (com debounce)
   - Filtros
   - Criar novo usuário
   - Editar usuário
   - Deletar usuário
   - Paginação

## 🔧 Troubleshooting

### Erro de CORS
Se houver erro de CORS, verifique:
- `backend/config/cors.php` está configurado corretamente
- O frontend está rodando na porta 5173
- O backend está rodando na porta 8000

### Erro de conexão com banco
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco `react_demo` foi criado

### Erro ao executar migrations
```bash
php artisan migrate:fresh
php artisan db:seed --class=UserSeeder
```

## 📝 Notas

- O backend precisa estar rodando antes do frontend
- Certifique-se de que as portas 8000 e 5173 estão livres
- Para produção, configure CORS adequadamente


