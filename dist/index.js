"use strict";
// ---------------------------------
// TAMBOLA TICKET AND DRAW GENERATOR
// ---------------------------------
// A ticket consists of a random distribution of 15 numbers between 1-90 in a
// 3x9 grid
//
// RULE #1 - Each row cannot have more than 5 numbers
// RULE #2 - Each column is assigned a range of numbers only:
//           1-10 can appear only in column 1
//           11-20 can appear only in column 2
//           81-90 can appear only in column 9
// RULE #3 - In a specific column, numbers must be arranged in ascending order
//           from top to bottom
// RULE #4 - Each column must have at least 1 number
Object.defineProperty(exports, "__esModule", { value: true });
exports.TambolaTicket = void 0;
var lib_1 = require("./lib");
Object.defineProperty(exports, "TambolaTicket", { enumerable: true, get: function () { return lib_1.TambolaTicket; } });
exports.default = lib_1.Tambola;
