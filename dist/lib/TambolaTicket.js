"use strict";
// -----------------
// TICKET ALGORITHM
// -----------------
// #1 - Maintain a grouped array of numbers between 1 and 90
//      Initialize ticket as 3x9 array of 0s
// #2 - Generate random index between 0 and length of array and choose the value
// #3 - Compute index to drop the value into based on RULE #1, RULE #2
// #4 - Remove values used in the ticket from the base array (RULE #1, RULE #2)
// #5 - Repeat till 15 numbers are populated into ticket
// #6 - Sort numbers in every column of the ticket based on RULE #3
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
/**
 * Representation of a tambola ticket
 */
var TambolaTicket = /** @class */ (function () {
    function TambolaTicket() {
        //Defines the 3rows 9columns format of the 2D array
        this._entries = new Array(3)
            .fill(0)
            .map(function () { return new Array(9).fill(0).map(function () { return 0; }); });
    }
    Object.defineProperty(TambolaTicket.prototype, "numOfEntries", {
        /**
         * A quick count of slots filled
         */
        get: function () {
            return this._entries
                .map(function (r) { return r.filter(function (c) { return c; }).length; })
                .reduce(function (a, b) { return a + b; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TambolaTicket.prototype, "isCompleted", {
        /** Helper: check if the ticket is complete */
        get: function () {
            return this.numOfEntries === 15;
        },
        enumerable: false,
        configurable: true
    });
    /** Helper: Row level completeness  */
    /**
     * Helper: Row level completeness
     * @param rowIndex index of the row
     * @returns
     */
    TambolaTicket.prototype.isRowCompleted = function (rowIndex) {
        var rowValues = this.getRowValues(rowIndex);
        return rowValues.filter(function (r) { return r; }).length == 5;
    };
    /**
     * Helper: Col level completeness
     * @param colIndex index of the col
     * @returns
     */
    TambolaTicket.prototype.isColCompleted = function (colIndex) {
        var colValues = this.getColumnValues(colIndex);
        return colValues.filter(function (c) { return c; }).length == 3;
    };
    /**
     * Helper: Set the value of ticket at specific index
     * @param rowIndex
     * @param colIndex
     * @param value
     */
    TambolaTicket.prototype.updateEntry = function (rowIndex, colIndex, value) {
        this._entries[rowIndex][colIndex] = value;
    };
    /**
     * Helper: List all column values as an array
     * @param colIndex
     * @returns
     */
    TambolaTicket.prototype.getColumnValues = function (colIndex) {
        return this._entries.map(function (row) { return row[colIndex]; });
    };
    /**
     * Helper: List all row values as an array
     * @param rowIndex
     * @returns
     */
    TambolaTicket.prototype.getRowValues = function (rowIndex) {
        return this._entries[rowIndex];
    };
    /**
     * Generate values for a ticket
     */
    TambolaTicket.prototype.generate = function () {
        var _this = this;
        // Initialize a list of numbers from 1-90
        // but group them into arrays of 1-10, 11-20, 21-30 etc
        var numbers = new Array(9)
            .fill(0)
            .map(function (r, rI) { return new Array(10).fill(0).map(function (c, cI) { return rI * 10 + cI + 1; }); });
        // Iterate through all columns
        this.getRowValues(0).forEach(function (c, cIndex) {
            //Choose a number for the specific column in question
            var randomIndex = lodash_1.default.random(0, numbers[cIndex].length - 1);
            var selectedNumber = numbers[cIndex][randomIndex];
            //Choose a row at random, which is not yet completed (<5 elements in row)
            var randomRow = lodash_1.default.sample([0, 1, 2].filter(function (r) { return !_this.isRowCompleted(r); })) || 0;
            //If the column is not completed
            // and the entry at the specificed location is 0
            if (!_this.isColCompleted(cIndex) &&
                _this._entries[randomRow][cIndex] === 0) {
                //Update the chosen number into the location
                _this.updateEntry(randomRow, cIndex, selectedNumber);
                //Remove the chosen number from the grouped number array
                numbers[cIndex].splice(randomIndex, 1);
            }
        });
        //Recursive function for multiple passes, till ticket is generated
        var fillRecursively = function () {
            //Loop through all rows
            _this.getColumnValues(0).forEach(function (r, rIndex) {
                // Loop through all columns
                _this.getRowValues(0).forEach(function (c, cIndex) {
                    //Choose a number for the specific column in question
                    var randomIndex = lodash_1.default.random(0, numbers[cIndex].length - 1);
                    var selectedNumber = numbers[cIndex][randomIndex];
                    //Random chance for generating variants of the ticket
                    var setOrNot = Math.random() > 0.5;
                    //If the random chance is set
                    // and Tambola is not completed
                    // and Row is not full (< 5)
                    // and Col is not full
                    // and the entry at the location is 0
                    if (setOrNot &&
                        !_this.isCompleted &&
                        !_this.isRowCompleted(rIndex) &&
                        !_this.isColCompleted(cIndex) &&
                        _this._entries[rIndex][cIndex] === 0) {
                        //Update the chosen number into the location
                        _this.updateEntry(rIndex, cIndex, selectedNumber);
                        //Remove the chosen number from the grouped number array
                        numbers[cIndex].splice(randomIndex, 1);
                    }
                });
            });
            //If the tambola is not completed
            if (!_this.isCompleted) {
                fillRecursively();
            }
            else {
                //If the tambola is completed
                _this.sort();
            }
        };
        //Trigger the recursive function
        fillRecursively();
    };
    /**
     * Sort the ticket
     */
    TambolaTicket.prototype.sort = function () {
        var ticket = this._entries;
        //For each column in the ticket
        for (var col = 0; col < 9; col++) {
            //If all three rows are populated
            if (ticket[0][col] != 0 && ticket[1][col] != 0 && ticket[2][col] != 0) {
                for (var i = 0; i < 2; i++) {
                    for (var j = i + 1; j < 3; j++) {
                        if (ticket[i][col] > ticket[j][col]) {
                            var temp = ticket[i][col];
                            ticket[i][col] = ticket[j][col];
                            ticket[j][col] = temp;
                        }
                    }
                }
            }
            //If 1st and 2nd rows are populated
            else if (ticket[0][col] != 0 &&
                ticket[1][col] != 0 &&
                ticket[2][col] == 0) {
                if (ticket[0][col] > ticket[1][col]) {
                    var temp = ticket[0][col];
                    ticket[0][col] = ticket[1][col];
                    ticket[1][col] = temp;
                }
            }
            //If 1st and 3rd rows are populated
            else if (ticket[0][col] != 0 &&
                ticket[1][col] == 0 &&
                ticket[2][col] != 0) {
                if (ticket[0][col] > ticket[2][col]) {
                    var temp = ticket[0][col];
                    ticket[0][col] = ticket[2][col];
                    ticket[2][col] = temp;
                }
            }
            //If 2nd and 3rd rows are populated
            else if (ticket[0][col] == 0 &&
                ticket[1][col] != 0 &&
                ticket[2][col] != 0) {
                if (ticket[1][col] > ticket[2][col]) {
                    var temp = ticket[1][col];
                    ticket[1][col] = ticket[2][col];
                    ticket[2][col] = temp;
                }
            }
        }
    };
    /**
     * Output the ticket
     */
    TambolaTicket.prototype.print = function () {
        console.log("-------------------------------------------");
        this._entries.map(function (row) {
            console.log(row
                .map(function (c) { return (c == 0 ? "" : c).toString().padStart(2, " "); })
                .join(" | "));
            console.log("-------------------------------------------");
        });
    };
    return TambolaTicket;
}());
exports.default = TambolaTicket;
