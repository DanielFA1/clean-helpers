"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const str = require("../src/string");

describe("string.cleanDigits", () => {
    it("remove tudo que não é dígito", () => {
        assert.equal(str.cleanDigits("12.345-678"), "12345678");
        assert.equal(str.cleanDigits("(11) 9 9999-0000"), "11999990000");
        assert.equal(str.cleanDigits(null), "");
    });
});

describe("string.normalizePTBR", () => {
    it("remove acentos e normaliza espaços", () => {
        assert.equal(str.normalizePTBR("  Pão "), "PAO");
        assert.equal(str.normalizePTBR("Guaraná Antarctica"), "GUARANA ANTARCTICA");
    });

    it("remove pontuação por padrão", () => {
        assert.equal(str.normalizePTBR("Coca-Cola 2L"), "COCA COLA 2L");
    });

    it("keepPunctuation=true mantém pontuação", () => {
        assert.equal(str.normalizePTBR("Coca-Cola 2L", { keepPunctuation: true }), "COCA-COLA 2L");
    });

    it("case=lower", () => {
        assert.equal(str.normalizePTBR("Água Mineral", { case: "lower" }), "agua mineral");
    });
});

describe("string.slugify", () => {
    it("gera slug básico", () => {
        assert.equal(str.slugify("Coca-Cola 2L"), "coca-cola-2l");
        assert.equal(str.slugify("  Pão de Trigo Kg  "), "pao-de-trigo-kg");
    });

    it("remove separadores duplicados", () => {
        assert.equal(str.slugify("A  B   C"), "a-b-c");
    });
});

describe("string.casefold", () => {
    it("normaliza para comparação", () => {
        assert.equal(str.casefold("  Pão De Trigo "), "pao de trigo");
        assert.equal(str.casefold("Coca-Cola 2L"), "coca cola 2l");
    });
});

describe("string.safeRegex", () => {
    it("escapa caracteres especiais", () => {
        const rx = str.safeRegex("a+b(c)");
        assert.ok(rx.test("a+b(c)"));
        assert.ok(!rx.test("abcc"));
    });

    it("trunca maxLen", () => {
        const rx = str.safeRegex("x".repeat(500), "i", { maxLen: 10 });
        assert.ok(rx.source.length <= 10 + 10); // escape pode aumentar, só garante que não explode
    });
});

describe("string.includesLoose", () => {
    it("ignora acentos/case/pontuação", () => {
        assert.equal(str.includesLoose("Refrigerante Coca-Cola 2L", "coca cola"), true);
        assert.equal(str.includesLoose("Pão De Trigo Kg", "pao trigo"), true);
        assert.equal(str.includesLoose("Banana Branca", "maçã"), false);
    });

    it("needle vazio retorna true", () => {
        assert.equal(str.includesLoose("abc", ""), true);
        assert.equal(str.includesLoose("", ""), true);
    });
});

describe("string.titleCasePTBR", () => {
    it("capitaliza e mantém palavras comuns minúsculas no meio", () => {
        assert.equal(str.titleCasePTBR("pao de trigo kg"), "Pao de Trigo Kg");
        assert.equal(str.titleCasePTBR("refrigerante de guarana antartica"), "Refrigerante de Guarana Antartica");
    });

    it("preserva hífen e capitaliza partes", () => {
        assert.equal(str.titleCasePTBR("coca-cola 2l"), "Coca-Cola 2L");
    });

    it("preserva tokens com número/letra como uppercase", () => {
        assert.equal(str.titleCasePTBR("cerveja 350ml"), "Cerveja 350ML");
    });

    it("não destrói siglas", () => {
        assert.equal(str.titleCasePTBR("ean sku nf"), "Ean Sku Nf"); // heurística: não é tudo maiúsculo no input
        assert.equal(str.titleCasePTBR("EAN SKU NF"), "EAN SKU NF"); // aqui mantém
    });
});

describe("string.splitNameBrandSize", () => {
    it("extrai size no final", () => {
        const r = str.splitNameBrandSize("Cerveja Amstel 350ml");
        assert.equal(r.size, "350ML");
        assert.equal(r.name, "Cerveja Amstel");
    });

    it("extrai size com vírgula decimal", () => {
        const r = str.splitNameBrandSize("Refrigerante Coca-Cola 1,5L");
        assert.equal(r.size, "1.5L");
        assert.equal(r.name, "Refrigerante Coca-Cola");
    });

    it("extrai size com multiplicador", () => {
        const r = str.splitNameBrandSize("Iogurte 12x200ml");
        assert.equal(r.size, "12X200ML");
        assert.equal(r.name, "Iogurte");
    });

    it("extrai brand por separador no fim", () => {
        const r = str.splitNameBrandSize("Café Torrado - Pilão 500g");
        assert.equal(r.size, "500G");
        assert.equal(r.brand, "Pilão");
        assert.equal(r.name, "Café Torrado");
    });

    it("extrai brand por parênteses no fim", () => {
        const r = str.splitNameBrandSize("Sabão em pó (Omo) 1kg");
        assert.equal(r.size, "1KG");
        assert.equal(r.brand, "Omo");
        assert.equal(r.name, "Sabão em pó");
    });

    it("texto vazio retorna tudo vazio", () => {
        const r = str.splitNameBrandSize("");
        assert.deepEqual(r, { name: "", brand: "", size: "", raw: "" });
    });
});
