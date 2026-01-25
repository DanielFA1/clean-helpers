"use strict";

const cleanDigits = require("./cleanDigits");
const normalizePTBR = require("./normalizePTBR");
const slugify = require("./slugify");
const casefold = require("./casefold");
const includesLoose = require("./includesLoose");

const titleCasePTBR = require("./titleCasePTBR");
const splitNameBrandSize = require("./splitNameBrandSize");

module.exports = {
  cleanDigits,
  normalizePTBR,
  slugify,
  casefold,
  includesLoose,
  titleCasePTBR,
  splitNameBrandSize,
};
