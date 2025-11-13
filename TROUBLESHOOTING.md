# 🔧 Troubleshooting - Problemas Comuns

## Erro: "The connection was reset"

### 1. Verificar se o Backend Laravel está rodando

**No terminal, execute:**
```bash
cd backend
php artisan serve
```

Você deve ver:
```
INFO  Server running on [http://127.0.0.1:8000]
```

### 2. Testar a API diretamente

Abra no navegador: `http://localhost:8000/api/users`

Ou no PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:8000/api/users" -UseBasicParsing
```

### 3. Verificar se a porta 8000 está livre

```powershell
netstat -ano | findstr :8000
```

Se houver algo usando a porta, você pode:
- Parar o processo
- Ou usar outra porta: `php artisan serve --port=8001`

### 4. Verificar CORS

O arquivo `backend/config/cors.php` deve ter:
```php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
```

### 5. Verificar variáveis de ambiente

**Frontend:** Crie um arquivo `.env` na raiz do projeto:
```
VITE_API_URL=http://localhost:8000/api
```

**Backend:** Verifique `backend/.env`:
```
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_demo
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Limpar cache do Laravel

```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 7. Verificar logs de erro

**Laravel:**
```bash
cd backend
Get-Content storage\logs\laravel.log -Tail 50
```

**Navegador:**
- Abra DevTools (F12)
- Vá na aba Console
- Veja se há erros de CORS ou conexão

### 8. Testar conexão do banco

```bash
cd backend
php artisan tinker
>>> DB::connection()->getPdo();
```

Se der erro, verifique as credenciais no `.env`

## Erro: CORS Policy

Se você ver erros de CORS no console do navegador:

1. Verifique `backend/config/cors.php`
2. Limpe o cache: `php artisan config:clear`
3. Reinicie o servidor Laravel

## Erro: 404 Not Found

Se a rota `/api/users` retornar 404:

1. Verifique `backend/routes/api.php`
2. Limpe cache de rotas: `php artisan route:clear`
3. Liste as rotas: `php artisan route:list`

## Checklist Rápido

- [ ] Backend Laravel rodando em `http://localhost:8000`
- [ ] Frontend React rodando em `http://localhost:5173`
- [ ] Banco de dados `react_demo` criado
- [ ] Migrations executadas
- [ ] Seeders executados
- [ ] Arquivo `.env` configurado no backend
- [ ] CORS configurado corretamente
- [ ] Porta 8000 não está em uso por outro processo


