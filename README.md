# clean-helpers

![npm](https://img.shields.io/npm/v/clean-helpers)
![downloads](https://img.shields.io/npm/dm/clean-helpers)
![node](https://img.shields.io/node/v/clean-helpers)
![license](https://img.shields.io/npm/l/clean-helpers)
![CI](https://github.com/DanielFA1/clean-helpers/actions/workflows/ci.yml/badge.svg)

Um kit de utilitários **robustos, testados e sem dependências**, focado em resolver problemas reais do dia a dia do desenvolvimento **brasileiro**: dinheiro pt-BR (sem dor com float), datas (ISO/BR safe), normalização de texto, validações (CPF/CNPJ/CEP/EAN/NCM/CEST) e helpers async — tudo **leve e modular**.

- ✅ **BR-first**: entende `R$ 1.234,56`, `DD/MM/YYYY` e particularidades comuns  
- ✅ **Zero deps**: não incha sua `node_modules`  
- ✅ **Modular**: importe só o que usar (`clean-helpers/money`, `clean-helpers/date`, …)  
- ✅ **Node >= 18** + testes com `node --test`

---

## Instalação

```bash
npm i clean-helpers
# ou: pnpm add clean-helpers
# ou: yarn add clean-helpers
```

---

## 30 segundos (copie e rode)

```js
const { money, date, validation, search, string, async: A } = require("clean-helpers");

(async () => {
  // dinheiro (seguro e com cents)
  console.log(money.parseMoneyStrict("R$ 1.234,56"));
  // { ok:true, value:1234.56, cents:123456, ... }

  // datas (ISO/BR safe)
  console.log(date.parseISODateOrBR("2026-01-21")); // Date local (sem bug UTC)
  console.log(date.formatBRDatetime(new Date()));   // "21/01/2026 18:40"

  // validações BR
  console.log(validation.isCPF("529.982.247-25")); // true
  console.log(validation.isCEP("01001-000"));      // true

  // busca / texto
  console.log(search.makeSearchTokens("Coca-Cola 2 L Retornável"));
  // ["coca","cola","2l","retornavel"]

  console.log(string.includesLoose("Refrigerante Coca-Cola 2L", "coca cola 2l")); // true

  // async
  await A.sleep(50);
})();
```

➡️ Quer carregar só um módulo específico?

```js
const money = require("clean-helpers/money");
```

---

## Conteúdo

- [Por que usar isso?](#por-que-usar-isso)
- [Destaques](#destaques)
- [Uso rápido](#uso-rápido)
- [Módulos](#módulos)
- [Demonstrações (mais completas)](#demonstrações-mais-completas)
- [Testes](#testes)
- [Versionamento](#versionamento)
- [Licença](#licença)

---

## 🎯 Por que usar isso?

Você provavelmente já passou por isso:

1. Pede para a IA gerar uma função de validar CPF e cola em `utils.js`.
2. Copia um regex de e-mail de um projeto antigo que falha em casos novos.
3. Importa bibliotecas gigantes só para formatar uma data simples.
4. Tem bugs de arredondamento financeiro porque tratou dinheiro como `float`.

O clean-helpers centraliza essas soluções de forma:

- ✅ **Segura**: testes unitários cobrindo edge-cases reais.
- ✅ **Modular**: importe apenas o que usar (tree-shaking friendly).
- ✅ **Zero Deps**: não incha sua `node_modules`.
- ✅ **BR First**: entende nativamente `R$ 1.234,56`, datas `DD/MM/YYYY` e fusos horários locais.

> Objetivo: parar de espalhar “helpers soltos” pelo projeto e centralizar utilidades num pacote pequeno, previsível e bem testado.

---

## Destaques

- ✅ Zero deps
- ✅ Node >= 18
- ✅ Modular (importe só o que precisa: `clean-helpers/money`, `clean-helpers/date`, …)
- ✅ Foco BR (pt-BR, datas, CPF/CNPJ, etc.)
- ✅ Testes com `node --test`

---

## Uso rápido

### 1) Import por “namespace” (recomendado)

```js
const { money, date, validation, search, string, async: A } = require("clean-helpers");

(async () => {
  // dinheiro
  const r = money.parseMoneyStrict("R$ 1.234,56");
  console.log(r); // { ok:true, value:1234.56, cents:123456, ... }

  // datas (parse BR e ISO seguro)
  console.log(date.formatBRDatetime(new Date()));   // "21/01/2026 18:40"
  console.log(date.parseISODateOrBR("2026-01-21")); // Date (local)

  // validações
  console.log(validation.isCPF("529.982.247-25")); // true
  console.log(validation.isCEP("01001-000"));      // true

  // busca
  console.log(search.makeSearchTokens("Coca-Cola 2 L Retornável"));
  // ["coca","cola","2l","retornavel"]

  // string “solta” (sem acento/pontuação/case)
  console.log(string.includesLoose("Refrigerante Coca-Cola 2L", "coca cola 2l")); // true

  // async
  await A.sleep(100);
})();
```

### 2) Import “flat” (atalhos)

```js
const { parseMoneyStrict, formatBRLPlain, safeRegex, isCNPJ } = require("clean-helpers");

console.log(parseMoneyStrict("1.234,56").cents); // 123456
console.log(formatBRLPlain(1234.56));            // "1.234,56"
console.log(isCNPJ("04.252.011/0001-10"));       // true

const rx = safeRegex("Coca-Cola");
console.log(rx.test("coca-cola"));               // true
```

### 3) Import por módulo (subpath exports)

Se você quer evitar carregar tudo, pode importar por módulo:

```js
const money = require("clean-helpers/money");
const date = require("clean-helpers/date");
const validation = require("clean-helpers/validation");

console.log(money.formatBRL(19.9));              // "R$ 19,90"
console.log(date.monthKey(new Date()));          // "2026-01"
console.log(validation.isCPF("529.982.247-25")); // true
```

---

## Módulos

> Dica: se você já sabe qual módulo vai usar, prefira `clean-helpers/<modulo>`.

- **money**: `parseMoney`, `parseMoneyStrict`, `moneyToCents`, `centsToMoney`, `formatBRL`, `formatBRLPlain`
- **string**: `casefold`, `cleanDigits`, `includesLoose`, `titleCasePTBR`, `splitNameBrandSize`
- **number**: `toNumberSafe`, `clamp`, `roundTo`, `pct`, `sum`, `avg`, `range`
- **date**: parse/format BR, ISO seguro (evita bug UTC em `"YYYY-MM-DD"`), ranges e utilitários
- **async**: `sleep`, `withTimeout`, `retry`, `pLimit`, `pMap`, `createQueue`
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

## Demonstrações (mais completas)

### money

#### parseMoney (flexível)

```js
const { money } = require("clean-helpers");

money.parseMoney("R$ 1.234,56"); // 1234.56
money.parseMoney("1234.56");     // 1234.56
money.parseMoney("10");          // 10
money.parseMoney("(1.234,56)");  // -1234.56 (se o parser aceitar parênteses no seu build)
```

#### parseMoneyStrict (estrito)

Retorna `{ ok, value, cents, reason }`.

```js
const { money } = require("clean-helpers");

money.parseMoneyStrict("1.234,56"); // { ok:true, value:1234.56, cents:123456, ... }

money.parseMoneyStrict("1,234", { decimals: 2 });
// { ok:false, reason:"too_many_decimals", ... }

money.parseMoneyStrict("(1.234,56)");
// { ok:true, cents:-123456, ... }
```

#### moneyToCents / centsToMoney

```js
const { money } = require("clean-helpers");

money.moneyToCents("1.234,56"); // 123456
money.centsToMoney(123456);     // 1234.56
```

#### formatBRL / formatBRLPlain

```js
const { money } = require("clean-helpers");

money.formatBRL(1234.56);       // "R$ 1.234,56"
money.formatBRLPlain(1234.56);  // "1.234,56"
```

---

### date

#### parseDateBR / formatDateBR

```js
const { date } = require("clean-helpers");

const d = date.parseDateBR("21/01/2026");
console.log(date.formatDateBR(d)); // "21/01/2026"
```

#### parseISODateOrBR (ISO seguro)

Pegadinha real: `"YYYY-MM-DD"` no JS pode cair em UTC e “voltar um dia” no Brasil.  
Aqui ele é interpretado como data local.

```js
const { date } = require("clean-helpers");

const d = date.parseISODateOrBR("2026-01-21"); // Date local do dia 21
```

#### formatBRDatetime / parseBRDatetime

```js
const { date } = require("clean-helpers");

date.formatBRDatetime(new Date());           // "21/01/2026 18:40"
date.parseBRDatetime("21/01/2026 10:30");    // Date
```

#### utilitários

```js
const { date } = require("clean-helpers");

date.startOfDay(new Date());
date.endOfDay(new Date());
date.addDays(new Date(), 7);
date.daysBetween("2026-01-01", "2026-01-21");

date.monthKey(new Date());   // "2026-01"
date.weekKeyISO(new Date()); // "2026-W04"
```

---

### validation

#### CPF / CNPJ / CEP

```js
const { validation } = require("clean-helpers");

validation.isCPF("529.982.247-25"); // true
validation.isCPF("111.111.111-11"); // false

validation.isCNPJ("04.252.011/0001-10"); // true
validation.isCNPJ("00.000.000/0000-00"); // false

validation.isCEP("01001-000"); // true
validation.isCEP("000");       // false
```

#### EAN-13

```js
const { validation } = require("clean-helpers");

validation.isEAN13("4006381333931"); // true
validation.isEAN13("123");           // false
```

#### NCM / CEST (formato)

`isNCM` e `isCEST` validam formato (tamanho/dígitos). Não fazem consulta oficial.

```js
const { validation } = require("clean-helpers");

validation.isNCM("12345678"); // true
validation.isCEST("1234567"); // true
```

#### pickValid (pega o primeiro válido)

```js
const { validation } = require("clean-helpers");

const r = validation.pickValid({
  cpf: "529.982.247-25",
  email: "teste@dominio.com",
});

console.log(r);
// { type:"cpf", key:"cpf", value:"52998224725" } (exemplo)
```

---

### string + search

#### casefold / includesLoose

```js
const { string } = require("clean-helpers");

string.casefold("Retornável"); // "retornavel"
string.includesLoose("Coca-Cola 2L", "coca cola"); // true
```

#### titleCasePTBR

```js
const { string } = require("clean-helpers");

string.titleCasePTBR("pao de trigo kg"); // "Pão de Trigo kg"
string.titleCasePTBR("EAN SKU NF");      // "EAN SKU NF"
```

#### splitNameBrandSize (nome, marca e tamanho)

```js
const { string } = require("clean-helpers");

string.splitNameBrandSize("Cerveja Amstel 350ml");
// { name:"Cerveja Amstel", brand:"", size:"350ML", raw:"..." }

string.splitNameBrandSize("Café Torrado - Pilão 500g");
// { name:"Café Torrado", brand:"Pilão", size:"500G", raw:"..." }

string.splitNameBrandSize("Sabão em pó (Omo) 1kg");
// { name:"Sabão em pó", brand:"Omo", size:"1KG", raw:"..." }
```

#### normalizeSearchText / makeSearchTokens

```js
const { search } = require("clean-helpers");

search.normalizeSearchText("Coca-Cola! 2L  Retornável");
// "coca cola 2l retornavel"

search.makeSearchTokens("Coca Cola 2 l retornável");
// ["coca","cola","2l","retornavel"]
```

---

### async

```js
const { async: A } = require("clean-helpers");

(async () => {
  await A.sleep(200);

  const res = await A.withTimeout(Promise.resolve("ok"), 1000);

  const r = await A.retry(async (attempt) => {
    if (attempt < 3) throw new Error("falhou");
    return "ok";
  }, { retries: 5 });

  const limit = A.pLimit(3);
  await Promise.all([1,2,3,4,5].map((x) => limit(() => Promise.resolve(x))));

  const out = await A.pMap([1,2,3,4], async (x) => x * 2, { concurrency: 2 });

  const q = A.createQueue(async (job) => job.id, { concurrency: 2 });
  q.push({ id: 1 });
  q.push({ id: 2 });
  await q.onIdle();
})();
```

---

### regex

```js
const { regex } = require("clean-helpers");

const escaped = regex.escapeRegex("a.b?c+d");
console.log(escaped); // "a\\.b\\?c\\+d"

const r = regex.safeRegex("Coca-Cola");
console.log(r.test("coca-cola")); // true
```

---

### http

```js
const { http } = require("clean-helpers");

http.wantsJson({ path: "/api/test", headers: {} }); // true
http.wantsJson({ path: "/pagina", headers: { accept: "text/html" } }); // false
```

---

### geo

```js
const { geo } = require("clean-helpers");

geo.distanceInMeters(0, 0, 0, 1); // ~111000
```

---

### stats

```js
const { stats } = require("clean-helpers");

stats.quantile([1,2,3,4], 0.5); // 2.5
```

---

### cache

```js
const { cache } = require("clean-helpers");

cache.isFresh({ ts: Date.now() - 500 }, 1000);  // true
cache.isFresh({ ts: Date.now() - 1500 }, 1000); // false
```

---

### parse

```js
const { parse } = require("clean-helpers");

parse.flagEnabled("sim");  // true
parse.flagEnabled("não");  // false

parse.parseWeekdays("seg, qua, 6"); // [1,3,6]

parse.parseBlackouts("2026-01-01..2026-01-03,2026-01-03");
// ranges mesclados (merge)
```

---

### id

```js
const { id } = require("clean-helpers");

id.normId({ $oid: "507f1f77bcf86cd799439011" }); // "507f..."
id.normId({ _id: " 123 " });                     // "123"
```

---

## 🧪 Testes

```bash
node --test
```

---

## Versionamento

- `npm version patch` (correções)
- `npm version minor` (features compatíveis)
- `npm version major` (quebras)

---

## Licença

MIT
