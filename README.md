# Croply — App (Front-end)

Marketplace agro mobile-first que conecta **Produtores** e **Compradores**, sem intermediários.
Front-end em **React Native (Expo + TypeScript)**.

## 🎨 Identidade
- Verde (`#1B5E20`) — identidade principal
- Amarelo trigo (`#F4B400`) — ações e destaques

## 📱 Telas implementadas (12)
1. **Splash** — abertura com logo
2. **Onboarding** — 3 slides com paginação e "Pular"
3. **Auth** — login/cadastro com seleção de perfil (Produtor/Comprador)
4. **Home** — localização, busca, banner, categorias, produtos próximos, produtores em destaque
5. **Marketplace** — grid, busca em tempo real, filtros por categoria e ordenação
6. **Detalhe do Produto** — galeria, quantidade, card do produtor, mapa, Conversar/Comprar
7. **Perfil do Produtor** — capa, avatar, estatísticas, produtos e avaliações
8. **Lista de Conversas** — chats com indicador de online e não lidas
9. **Chat** — mensagens em tempo real, envio de imagem, indicador online
10. **Mapa** — pins interativos, card expansível, localização do usuário
11. **Painel do Produtor** — KPIs, gráfico de receita, produtos, pedidos e FAB
12. **Cadastro de Produto** — upload de fotos, categoria, preço, toggle orgânico, localização
13. **Perfil do Usuário** — histórico de compras, acesso ao painel, configurações e LGPD

## 🏗️ Arquitetura
```
src/
  theme/        # cores, espaçamentos, tipografia
  components/   # Button, ProductCard, common (badges, stars, etc.)
  data/         # tipos + dados mockados (roda sem backend)
  context/      # estado global (auth, carrinho, favoritos)
  navigation/   # stack + bottom tabs
  screens/      # 13 telas
```

Estado global via **Context API** (`src/context/store.tsx`): autenticação, carrinho e favoritos.
Navegação com **React Navigation** (native-stack + bottom-tabs).

## ▶️ Como rodar
```bash
cd croply-app
npm install
npm start        # abre o Expo (escaneie o QR com o app Expo Go)
# ou
npm run android
npm run ios
npm run web
```

## 🔌 Próximos passos (integração)
- Substituir `src/data/mock.ts` por chamadas à API Python (FastAPI).
- Auth real (JWT) no `store.tsx`.
- `react-native-maps` no lugar do mapa mockado.
- WebSocket no chat.
- Gráfico do painel com `victory-native`.
- Push notifications (Expo Notifications).
