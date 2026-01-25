// src/index.js
"use strict";

const money = require("./money");
const string = require("./string");
const number = require("./number");
const date = require("./date");
const asyncNs = require("./async");
const validation = require("./validation");

const regex = require("./regex");
const search = require("./search");
const http = require("./http");
const geo = require("./geo");
const stats = require("./stats");
const cache = require("./cache");
const parse = require("./parse");
const id = require("./id");

module.exports = {
  // namespaces
  money,
  string,
  number,
  date,
  async: asyncNs,
  validation,
  regex,
  search,
  http,
  geo,
  stats,
  cache,
  parse,
  id,

  // flat exports
  ...money,
  ...string,
  ...number,
  ...date,
  ...asyncNs,
  ...validation,
  ...regex,  
  ...search,
  ...http,
  ...geo,
  ...stats,
  ...cache,
  ...parse,
  ...id,
};
