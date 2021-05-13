"use strict";
// -----------------
// DRAW ALGORITHM
// -----------------
// #1 - Maintain array of numbers between 1 and 90
// #2 - Generate random index between 0 and length of array and choose the value
// #3 - Remove the value from the array
// #4 - Repeat till 90 numbers populated
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var TambolaTicket_js_1 = __importDefault(require("./TambolaTicket.js"));
/**
 * Game handler
 */
var Tambola = /** @class */ (function () {
    function Tambola() {
    }
    /**
     * Ticket generation
     * @param count Number of tambola tickets
     * @returns Array of TambolaTicket
     */
    Tambola.generateTickets = function (count) {
        return new Array(count).fill(0).map(function () {
            var ticket = new TambolaTicket_js_1.default();
            ticket.generate();
            return ticket;
        });
    };
    /**
     * Draw generation
     * @returns sequence of Tambola numbers 1-90
     */
    Tambola.getDrawSequence = function () {
        var sequence = [];
        var allNumbers = new Array(90).fill(0).map(function (n, i) { return i + 1; });
        for (var i = 0; i < 90; i++) {
            var randomIndex = lodash_1.default.random(0, allNumbers.length - 1);
            sequence.push(allNumbers[randomIndex]);
            allNumbers.splice(randomIndex, 1);
        }
        return sequence;
    };
    return Tambola;
}());
exports.default = Tambola;
