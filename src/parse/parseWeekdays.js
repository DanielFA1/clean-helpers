"use strict";

/**
 * parseWeekdays(input)
 * Retorna array de dias da semana (0..6), 0=Dom, 1=Seg, ... 6=Sáb
 * Aceita:
 * - "seg,ter,qua" / "1,2,3" / "seg qua sex"
 * - array ["seg","sex"] / [1,5]
 *
 * @param {any} input
 * @returns {number[]}
 */
function parseWeekdays(input) {
  const map = {
    dom: 0, domingo: 0,
    seg: 1, segunda: 1, "segunda-feira": 1,
    ter: 2, terça: 2, terca: 2, "terça-feira": 2, "terca-feira": 2,
    qua: 3, quarta: 3, "quarta-feira": 3,
    qui: 4, quinta: 4, "quinta-feira": 4,
    sex: 5, sexta: 5, "sexta-feira": 5,
    sab: 6, sábado: 6, sabado: 6, "sábado-feira": 6,
  };

  const arr = Array.isArray(input)
    ? input
    : String(input ?? "")
        .trim()
        .split(/[,\s;|/]+/g)
        .filter(Boolean);

  const out = new Set();

  for (const it of arr) {
    if (typeof it === "number" && Number.isFinite(it)) {
      const n = Math.floor(it);
      if (n >= 0 && n <= 6) out.add(n);
      continue;
    }

    const s = String(it ?? "").trim().toLowerCase();
    if (!s) continue;

    if (/^\d$/.test(s)) {
      const n = Number(s);
      if (n >= 0 && n <= 6) out.add(n);
      continue;
    }

    if (s in map) {
      out.add(map[s]);
      continue;
    }
  }

  return Array.from(out).sort((a, b) => a - b);
}

module.exports = parseWeekdays;
