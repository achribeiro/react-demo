# Features Avançadas do React - Documentação

Este documento explica todas as features avançadas do React implementadas neste projeto.

## 📋 Índice

1. [Custom Hooks](#custom-hooks)
2. [Context API com useReducer](#context-api-com-usereducer)
3. [React.memo e Otimização de Performance](#reactmemo-e-otimização-de-performance)
4. [useMemo e useCallback](#usememo-e-usecallback)
5. [Error Boundaries](#error-boundaries)
6. [Suspense e Lazy Loading](#suspense-e-lazy-loading)
7. [Debounce](#debounce)
8. [Gerenciamento de Estado Complexo](#gerenciamento-de-estado-complexo)
9. [Paginação](#paginação)
10. [CRUD Completo](#crud-completo)

---

## 1. Custom Hooks

### `useDebounce`
**Localização:** `src/hooks/useDebounce.js`

**O que faz:** Atrasa a atualização de um valor até que o usuário pare de digitar por um período determinado.

**Por que usar:** Evita fazer requisições desnecessárias à API enquanto o usuário está digitando. Melhora a performance e reduz a carga no servidor.

**Como funciona:**
```javascript
const debouncedSearch = useDebounce(searchTerm, 500);
// O valor só será atualizado 500ms após o usuário parar de digitar
```

**Uso no projeto:** Aplicado na busca de usuários para evitar requisições a cada tecla pressionada.

---

### `useApi`
**Localização:** `src/hooks/useApi.js`

**O que faz:** Hook genérico para fazer requisições à API, gerenciando automaticamente os estados de loading, error e data.

**Por que usar:** Elimina código repetitivo e centraliza a lógica de requisições HTTP.

**Características:**
- Gerencia estados de loading, error e data
- Suporta execução imediata ou sob demanda
- Permite refetch dos dados

**Exemplo de uso:**
```javascript
const { data, loading, error, refetch } = useApi('/users', { immediate: true });
```

---

### `usePagination`
**Localização:** `src/hooks/usePagination.js`

**O que faz:** Gerencia a lógica de paginação de uma lista de itens.

**Por que usar:** Centraliza a lógica de paginação, facilitando a navegação entre páginas.

**Funcionalidades:**
- Calcula páginas automaticamente
- Navegação entre páginas (next, prev, goToPage)
- Retorna itens paginados automaticamente

---

## 2. Context API com useReducer

### **Context API**
**Localização:** `src/context/UserContext.jsx`

**O que faz:** Fornece um estado global para toda a aplicação, evitando prop drilling.

**Por que usar:** Quando múltiplos componentes precisam acessar o mesmo estado, o Context API é mais eficiente que passar props por vários níveis.

**Estrutura:**
- `UserProvider`: Componente que envolve a aplicação e fornece o contexto
- `useUsers`: Hook customizado para acessar o contexto

### **useReducer**
**O que faz:** Gerencia estado complexo com múltiplas ações e transições.

**Por que usar:** Para estados com lógica complexa, useReducer é mais apropriado que useState, especialmente quando:
- Há múltiplas ações que modificam o estado
- A lógica de atualização é complexa
- Você quer separar a lógica de atualização do componente

**Actions implementadas:**
- `SET_LOADING`: Controla o estado de carregamento
- `SET_ERROR`: Gerencia erros
- `SET_USERS`: Atualiza a lista de usuários
- `SET_PAGINATION`: Atualiza informações de paginação
- `SET_FILTERS`: Aplica filtros de busca
- `ADD_USER`: Adiciona novo usuário
- `UPDATE_USER`: Atualiza usuário existente
- `DELETE_USER`: Remove usuário
- `SET_STATS`: Atualiza estatísticas

**Vantagens:**
- Estado previsível e testável
- Fácil de debugar (cada ação é explícita)
- Melhor para estados complexos

---

## 3. React.memo e Otimização de Performance

### **React.memo**
**O que faz:** Memoriza um componente, evitando re-renders desnecessários quando as props não mudam.

**Por que usar:** Melhora significativamente a performance em listas grandes ou componentes que renderizam frequentemente.

**Componentes otimizados:**
- `UserCard`: Só re-renderiza se as props do usuário mudarem
- `UserList`: Só re-renderiza se a lista de usuários mudar
- `SearchBox`: Só re-renderiza se value ou onChange mudarem
- `Pagination`: Só re-renderiza se currentPage ou totalPages mudarem

**Comparação customizada:**
```javascript
React.memo(Component, (prevProps, nextProps) => {
  // Retorna true se props são iguais (não re-renderiza)
  // Retorna false se props são diferentes (re-renderiza)
});
```

**Exemplo no UserCard:**
```javascript
React.memo(UserCard, (prevProps, nextProps) => {
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    // ... outras comparações
  );
});
```

---

## 4. useMemo e useCallback

### **useMemo**
**O que faz:** Memoriza o resultado de um cálculo caro, recalculando apenas quando as dependências mudam.

**Por que usar:** Evita cálculos desnecessários em cada render.

**Exemplo:**
```javascript
const filtered = useMemo(
  () => users.filter(u => u.name.includes(search)),
  [users, search] // Só recalcula se users ou search mudarem
);
```

### **useCallback**
**O que faz:** Memoriza uma função, evitando criar uma nova função em cada render.

**Por que usar:** Útil quando você passa funções como props para componentes memoizados. Sem useCallback, o componente filho sempre re-renderizaria porque receberia uma nova função.

**Exemplo:**
```javascript
const handleSearch = useCallback(value => setSearch(value), []);
// A função só é recriada se as dependências mudarem (neste caso, nunca)
```

**Benefícios:**
- Reduz re-renders desnecessários
- Melhora performance em listas grandes
- Mantém referências estáveis de funções

---

## 5. Error Boundaries

### **O que são:**
**Localização:** `src/components/ErrorBoundary.jsx`

**O que faz:** Componentes que capturam erros JavaScript em qualquer lugar da árvore de componentes, registram esses erros e exibem uma UI de fallback.

**Por que usar:** Previne que um erro em um componente quebre toda a aplicação. Em vez disso, mostra uma mensagem amigável ao usuário.

**Características:**
- Captura erros durante renderização, em métodos do ciclo de vida e em construtores
- Não captura erros em event handlers, código assíncrono, ou durante SSR
- Permite recuperação graciosa de erros

**Implementação:**
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log do erro
  }
}
```

**Uso:**
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 6. Suspense e Lazy Loading

### **React.lazy**
**O que faz:** Permite carregar componentes dinamicamente (code splitting).

**Por que usar:** Reduz o tamanho do bundle inicial, melhorando o tempo de carregamento da aplicação.

**Exemplo:**
```javascript
const UserForm = lazy(() => import('./components/UserForm'));
const StatsPanel = lazy(() => import('./components/StatsPanel'));
```

### **Suspense**
**O que faz:** Permite que componentes "esperem" por algo antes de renderizar, exibindo um fallback.

**Por que usar:** Melhora a experiência do usuário mostrando um indicador de carregamento enquanto componentes são carregados.

**Uso:**
```javascript
<Suspense fallback={<div>Carregando...</div>}>
  <UserForm />
</Suspense>
```

**Benefícios:**
- Reduz bundle inicial
- Melhora performance de carregamento
- Melhor experiência do usuário

---

## 7. Debounce

### **O que é:**
Técnica que atrasa a execução de uma função até que um período de tempo tenha passado desde a última vez que foi chamada.

**Implementação:** `useDebounce` hook

**Por que usar:** 
- Em buscas: evita fazer requisições a cada tecla pressionada
- Melhora performance
- Reduz carga no servidor
- Melhora experiência do usuário

**Exemplo prático:**
```javascript
// Sem debounce: 10 requisições ao digitar "React"
// Com debounce (500ms): 1 requisição após parar de digitar
```

---

## 8. Gerenciamento de Estado Complexo

### **Arquitetura:**
- **Context API**: Estado global
- **useReducer**: Lógica de atualização de estado
- **Custom Hooks**: Lógica reutilizável

### **Fluxo de dados:**
1. Componente dispara ação via função do contexto
2. useReducer processa a ação
3. Estado é atualizado
4. Componentes que usam o contexto são re-renderizados

### **Vantagens:**
- Estado centralizado
- Lógica de negócio separada dos componentes
- Fácil de testar
- Previsível e debuggável

---

## 9. Paginação

### **Implementação:**
- Backend: Laravel retorna dados paginados
- Frontend: Componente `Pagination` gerencia navegação

### **Características:**
- Navegação entre páginas
- Indicadores visuais
- Suporte a muitas páginas (com ellipsis)
- Integração com API

---

## 10. CRUD Completo

### **Operações implementadas:**

#### **Create (Criar)**
- Formulário com validação
- Integração com API
- Feedback visual

#### **Read (Ler)**
- Listagem com paginação
- Busca e filtros
- Detalhes expandíveis

#### **Update (Atualizar)**
- Edição inline
- Validação de formulário
- Atualização otimista

#### **Delete (Deletar)**
- Confirmação antes de deletar
- Remoção da lista
- Feedback ao usuário

---

## 🎯 Resumo das Features Avançadas

| Feature | Localização | Benefício |
|---------|------------|-----------|
| Custom Hooks | `src/hooks/` | Reutilização de lógica |
| Context API | `src/context/` | Estado global sem prop drilling |
| useReducer | `src/context/UserContext.jsx` | Estado complexo gerenciável |
| React.memo | Componentes | Reduz re-renders |
| useMemo | `App.jsx` | Otimiza cálculos |
| useCallback | `App.jsx` | Otimiza funções |
| Error Boundary | `src/components/ErrorBoundary.jsx` | Tratamento de erros |
| Suspense | `App.jsx`, `main.jsx` | Code splitting |
| Lazy Loading | `App.jsx` | Reduz bundle inicial |
| Debounce | `src/hooks/useDebounce.js` | Otimiza requisições |
| Paginação | `src/components/Pagination.jsx` | Navegação eficiente |
| CRUD | Todo o projeto | Funcionalidade completa |

---

## 🚀 Como Usar

1. **Backend Laravel:**
   ```bash
   cd backend
   composer install
   php artisan migrate
   php artisan db:seed --class=UserSeeder
   php artisan serve
   ```

2. **Frontend React:**
   ```bash
   npm install
   npm run dev
   ```

3. **Configurar API URL:**
   Crie um arquivo `.env` na raiz do projeto:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

---

## 📚 Recursos Adicionais

- [React Hooks Documentation](https://react.dev/reference/react)
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Code Splitting](https://react.dev/reference/react/lazy)


