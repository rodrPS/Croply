# CLAUDE.md

Guia para trabalhar neste repositório com o Claude Code.

## Visão geral

**Croply** é um marketplace agro mobile-first que conecta **Produtores** e **Compradores** sem intermediários. O repositório é um monorepo com duas pastas de topo:

- `front-end/` — app React Native (Expo + TypeScript). É onde está todo o código atualmente.
- `back-end/` — vazio (placeholder). A API planejada é Python/FastAPI (ver "Próximos passos").

Toda a manipulação de comandos abaixo assume que você está dentro de `front-end/`.

## Stack

- **Expo SDK 54**, React Native 0.81.5, React 19.1.0
- **TypeScript** em modo `strict`
- **React Navigation v7** — native-stack + bottom-tabs
- **@expo/vector-icons** (Ionicons) para ícones
- Estado global via **Context API** (sem Redux/Zustand)
- **Sem backend**: a app roda 100% com dados mockados (`src/data/mock.ts`)

## Comandos

```bash
cd front-end
npm install
npm start        # inicia o Expo (QR code para Expo Go)
npm run android  # abre no emulador/dispositivo Android
npm run ios      # abre no simulador iOS
npm run web      # roda no navegador (bundler metro)
```

Não há scripts de teste, lint ou typecheck configurados. Para checar tipos manualmente: `npx tsc --noEmit`.

## Arquitetura (`front-end/src/`)

```
theme/        # cores, espaçamentos, tipografia, sombras (design tokens)
components/   # Button, ProductCard, common (badges, estrelas, etc.)
data/         # types.ts (modelos) + mock.ts (dados fake — roda sem backend)
context/      # store.tsx — estado global (auth, carrinho, favoritos)
navigation/   # RootNavigator (stack) + Tabs (bottom-tabs) + types.ts
screens/      # 13 telas
```

### Navegação
- `RootNavigator.tsx` — native-stack, `initialRouteName="Splash"`, `headerShown: false`. Fluxo: Splash → Onboarding → Auth → `Tabs`. Telas de detalhe (ProductDetail, ProducerProfile, Chat, ProducerDashboard, ProductForm) ficam empilhadas acima das tabs. `ProductForm` é apresentado como `modal`.
- `Tabs.tsx` — 5 abas: Home (Início), Marketplace (Mercado), Map (Mapa), Chats (Chat), Profile (Perfil).
- `navigation/types.ts` — `RootStackParamList` e `TabParamList`. **Sempre atualize os tipos de params ao adicionar/alterar rotas.**

### Estado global — `context/store.tsx`
Hook `useStore()` (lança erro fora do `StoreProvider`). Expõe:
- **Auth**: `user`, `login(user)`, `logout()`
- **Favoritos**: `favorites`, `isFavorite(id)`, `toggleFavorite(id)`
- **Carrinho**: `cart`, `cartCount`, `cartTotal`, `addToCart(productId, qty)`, `removeFromCart(productId)`, `clearCart()`

O estado é apenas em memória (some ao recarregar). Não há persistência.

### Dados — `data/`
- `types.ts` — modelos: `Product`, `Producer`, `Category`, `Review`, `Message`, `Conversation`, `Order`, `ProfileType` (`'producer' | 'buyer'`).
- `mock.ts` — dados mockados + helpers como `getProduct(id)`. Imagens são apenas seeds de cor hex/emoji (placeholders), não arquivos reais.

### Tema — `theme/index.ts`
Exporta `colors`, `spacing`, `radius`, `font`, `shadow`. **Use sempre esses tokens em vez de valores hard-coded.** Identidade visual:
- Verde principal `#1B5E20` (`colors.green`)
- Amarelo trigo `#F4B400` (`colors.wheat`) — ações e destaques

## Convenções

- **Imports com alias `@/`** → `src/` (configurado em `tsconfig.json` e `babel.config.js` via `babel-plugin-module-resolver`). Ex.: `import { colors } from '@/theme'`. Use o alias, não caminhos relativos longos.
- Componentes e telas são **exports nomeados** (ex.: `export function HomeScreen()`), não default.
- Telas terminam em `Screen` e ficam em `src/screens/`.
- Idioma: UI e textos em **português (pt-BR)**; código (nomes de variáveis/funções) em inglês.
- TypeScript `strict` — evite `any` (há exceções pontuais como o cast de ícone em `Tabs.tsx`).

## Próximos passos / integração (ainda não feitos)
- Substituir `src/data/mock.ts` por chamadas à API Python (FastAPI) no `back-end/`.
- Auth real (JWT) no `store.tsx`.
- `react-native-maps` no lugar do mapa mockado (`MapScreen`).
- WebSocket no chat (`ChatScreen`).
- Gráfico do painel do produtor com `victory-native`.
- Push notifications (Expo Notifications).
- Persistência do estado global (AsyncStorage).
