# br-helpers

Um kit de helpers **pragmáticos** para projetos Node.js no dia a dia — especialmente no contexto BR (dinheiro, datas, validações fiscais, normalização de texto, etc.).  
Sem dependências externas, com **testes**, e organizado por módulos.

> Filosofia: pequenos utilitários “sem drama” que você realmente usa em produção.

---

## ✨ O que tem aqui

- **money**: `parseMoney`, `parseMoneyStrict`, `moneyToCents`, `centsToMoney`, `formatBRL`, `formatBRLPlain`
- **string**: `casefold`, `cleanDigits`, `includesLoose`, `titleCasePTBR`, `splitNameBrandSize`
- **number**: `toNumberSafe`, `clamp`, `roundTo`, `pct`, `sum`, `avg`, `range`
- **date**: parse/format BR, ISO seguro (sem bug do UTC no `YYYY-MM-DD`), ranges e utilitários
- **async**: `sleep`, `withTimeout`, `retry` (backoff/jitter), `pLimit`, `pMap`, `createQueue`
- **validation**: `isCPF`, `isCNPJ`, `isCEP`, `isEAN13`, `isNCM`, `isCEST`, `pickValid`, `assert`
- **search**: `normalizeSearchText`, `makeSearchTokens`
- **regex**: `escapeRegex`, `safeRegex`
- **http**: `wantsJson`
- **geo**: `distanceInMeters` (Haversine)
- **stats**: `quantile`
- **cache**: `isFresh` (TTL simples)
- **parse**: `flagEnabled`, `parseWeekdays`, `parseBlackouts`
- **id**: `normId` (Mongo/Mongoose friendly)

---

## 📦 Instalação

### Usando como pacote (npm)
Se você publicar no npm:

```bash
npm i br-helpers
# ou (se usar escopo) npm i @seu-usuario/br-helpers
