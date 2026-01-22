"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const v = require("../src/validation");

describe("validation.isEmpty", () => {
    it("detecta vazio", () => {
        assert.equal(v.isEmpty(null), true);
        assert.equal(v.isEmpty(undefined), true);
        assert.equal(v.isEmpty("   "), true);
        assert.equal(v.isEmpty([]), true);
        assert.equal(v.isEmpty({}), true);
    });

    it("detecta não vazio", () => {
        assert.equal(v.isEmpty("a"), false);
        assert.equal(v.isEmpty([1]), false);
        assert.equal(v.isEmpty({ a: 1 }), false);
        assert.equal(v.isEmpty(0), false);
    });
});

describe("validation.isEmail", () => {
    it("valida emails comuns", () => {
        assert.equal(v.isEmail("a@b.com"), true);
        assert.equal(v.isEmail("nome.sobrenome@dominio.com.br"), true);
    });

    it("rejeita inválidos", () => {
        assert.equal(v.isEmail(""), false);
        assert.equal(v.isEmail("a@b"), false);
        assert.equal(v.isEmail("a b@c.com"), false);
    });
});

describe("validation.isCPF", () => {
    it("valida CPF conhecido", () => {
        // CPF de exemplo comum em docs (válido)
        assert.equal(v.isCPF("529.982.247-25"), true);
    });

    it("rejeita sequências e inválidos", () => {
        assert.equal(v.isCPF("000.000.000-00"), false);
        assert.equal(v.isCPF("123.456.789-00"), false);
    });
});

describe("validation.isCNPJ", () => {
    it("valida CNPJ conhecido", () => {
        // Exemplo conhecido válido
        assert.equal(v.isCNPJ("04.252.011/0001-10"), true);
    });

    it("rejeita inválidos", () => {
        assert.equal(v.isCNPJ("00.000.000/0000-00"), false);
        assert.equal(v.isCNPJ("12.345.678/9012-34"), false);
    });
});

describe("validation.isEAN13", () => {
    it("valida EAN-13", () => {
        // Exemplo conhecido válido
        assert.equal(v.isEAN13("4006381333931"), true);
    });

    it("rejeita inválidos", () => {
        assert.equal(v.isEAN13("4006381333932"), false);
        assert.equal(v.isEAN13("123"), false);
    });
});

describe("validation.isPhoneBR", () => {
    it("aceita 10/11 dígitos", () => {
        assert.equal(v.isPhoneBR("(11) 99999-0000"), true);
        assert.equal(v.isPhoneBR("11 3333-2222"), true);
    });

    it("aceita com DDI 55", () => {
        assert.equal(v.isPhoneBR("+55 (11) 99999-0000"), true);
    });

    it("rejeita tamanhos estranhos", () => {
        assert.equal(v.isPhoneBR("123"), false);
        assert.equal(v.isPhoneBR("+1 202 555 0101"), false);
    });
});

describe("validation.isCEP", () => {
    it("valida CEP", () => {
        assert.equal(v.isCEP("01001-000"), true);
        assert.equal(v.isCEP("01001000"), true);
    });

    it("rejeita inválido", () => {
        assert.equal(v.isCEP("0100"), false);
    });
});

describe("validation.assert", () => {
    it("não lança quando condition=true", () => {
        v.assert(true, "ok");
    });

    it("lança ValidationError quando condition=false", () => {
        assert.throws(
            () => v.assert(false, "falhou", { field: "x" }),
            (e) => e && e.name === "ValidationError" && e.code === "VALIDATION_ERROR",
        );
    });
    describe("validation.pickValid", () => {
        it("retorna o primeiro válido pela ordem padrão", () => {
            const r = v.pickValid({
                email: "teste@dominio.com",
                cpf: "529.982.247-25",
            });

            // padrão prioriza cpf antes de email
            assert.deepEqual(r, { type: "cpf", key: "cpf", value: "52998224725" });
        });

        it("permite ordem custom", () => {
            const r = v.pickValid({ email: "Teste@Dominio.com", cpf: "529.982.247-25" }, { order: ["email", "cpf"] });

            assert.deepEqual(r, { type: "email", key: "email", value: "teste@dominio.com" });
        });

        it("retorna null quando nada é válido", () => {
            const r = v.pickValid({ email: "x@", cpf: "000.000.000-00" });
            assert.equal(r, null);
        });
    });

    describe("validation.isNCM", () => {
        it("valida NCM 8 dígitos", () => {
            assert.equal(v.isNCM("12345678"), true);
            assert.equal(v.isNCM("12.34.56.78"), true);
        });

        it("rejeita inválidos", () => {
            assert.equal(v.isNCM("123"), false);
            assert.equal(v.isNCM("00000000"), false);
            assert.equal(v.isNCM("abcdefgh"), false);
        });
    });

    describe("validation.isCEST", () => {
        it("valida CEST 7 dígitos", () => {
            assert.equal(v.isCEST("1234567"), true);
            assert.equal(v.isCEST("12.345.67"), true);
        });

        it("rejeita inválidos", () => {
            assert.equal(v.isCEST("123"), false);
            assert.equal(v.isCEST("0000000"), false);
            assert.equal(v.isCEST("abcdefg"), false);
        });
    });
});
