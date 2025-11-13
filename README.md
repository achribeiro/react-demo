# React Demo - Projeto Completo com Laravel Backend

Este é um projeto completo de estudo que demonstra features avançadas do React.js integrado com um backend Laravel.

## 🚀 Features Implementadas

### Frontend (React)
- ✅ Custom Hooks (useDebounce, useApi, usePagination)
- ✅ Context API com useReducer para gerenciamento de estado global
- ✅ React.memo para otimização de performance
- ✅ useMemo e useCallback para evitar re-renders desnecessários
- ✅ Error Boundaries para tratamento de erros
- ✅ Suspense e Lazy Loading para code splitting
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Paginação
- ✅ Busca com debounce
- ✅ Filtros avançados
- ✅ Estatísticas em tempo real

### Backend (Laravel)
- ✅ API RESTful completa
- ✅ Migrations e Seeders
- ✅ Validação de dados
- ✅ CORS configurado
- ✅ Paginação no backend
- ✅ Busca e filtros
- ✅ Endpoint de estatísticas

## 📁 Estrutura do Projeto

```
react-demo/
├── backend/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
├── src/                     # Frontend React
│   ├── components/          # Componentes React
│   ├── context/             # Context API
│   ├── hooks/               # Custom Hooks
│   └── services/            # Serviços (API)
└── FEATURES_AVANCADAS.md    # Documentação completa das features
```

## 🛠️ Instalação e Configuração

### Backend (Laravel)

1. **Instalar dependências:**
```bash
cd backend
composer install
```

2. **Configurar ambiente:**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Configurar banco de dados no `.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_demo
DB_USERNAME=root
DB_PASSWORD=
```

4. **Executar migrations e seeders:**
```bash
php artisan migrate
php artisan db:seed --class=UserSeeder
```

5. **Iniciar servidor:**
```bash
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

### Frontend (React)

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:8000/api
```

3. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📡 Endpoints da API

### Users

- `GET /api/users` - Lista usuários (com paginação, busca e filtros)
  - Query params: `search`, `role`, `is_active`, `sort_by`, `sort_order`, `per_page`, `page`
- `GET /api/users/stats` - Estatísticas dos usuários
- `GET /api/users/{id}` - Mostra um usuário específico
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/{id}` - Atualiza um usuário
- `DELETE /api/users/{id}` - Deleta um usuário

## 🎓 Features Avançadas do React

Para uma explicação detalhada de todas as features avançadas implementadas, consulte o arquivo [FEATURES_AVANCADAS.md](./FEATURES_AVANCADAS.md).

### Resumo das Features:

1. **Custom Hooks** - Lógica reutilizável encapsulada
2. **Context API + useReducer** - Gerenciamento de estado global complexo
3. **React.memo** - Otimização de performance
4. **useMemo e useCallback** - Memoização de valores e funções
5. **Error Boundaries** - Tratamento gracioso de erros
6. **Suspense e Lazy Loading** - Code splitting e carregamento assíncrono
7. **Debounce** - Otimização de requisições
8. **Paginação** - Navegação eficiente em grandes datasets
9. **CRUD Completo** - Operações completas de banco de dados

## 🧪 Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- Custom Hooks
- Context API
- React.memo, useMemo, useCallback

### Backend
- Laravel (PHP)
- MySQL
- Eloquent ORM
- API RESTful

## 📝 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

### Backend
- `php artisan serve` - Inicia servidor Laravel
- `php artisan migrate` - Executa migrations
- `php artisan db:seed` - Executa seeders

## 🎯 Próximos Passos (Sugestões)

- [ ] Adicionar autenticação (Laravel Sanctum)
- [ ] Implementar testes (Jest + React Testing Library)
- [ ] Adicionar TypeScript
- [ ] Implementar cache (React Query)
- [ ] Adicionar notificações toast
- [ ] Implementar drag and drop
- [ ] Adicionar gráficos e visualizações
- [ ] Implementar modo escuro/claro

## 📚 Documentação Adicional

- [Documentação React](https://react.dev)
- [Documentação Laravel](https://laravel.com/docs)
- [FEATURES_AVANCADAS.md](./FEATURES_AVANCADAS.md) - Explicação detalhada de todas as features

## 👨‍💻 Autor

Projeto criado para estudo de features avançadas do React.js

---

**Nota:** Este é um projeto de estudo. Para produção, considere adicionar autenticação, validação mais robusta, testes e outras melhorias de segurança e performance.


