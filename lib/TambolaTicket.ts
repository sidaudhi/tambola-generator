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

import _ from "lodash";

/**
 * Representation of a tambola ticket
 */
class TambolaTicket {
  /**
   * A 2D array of rows and columns
   */
  _entries: number[][];

  constructor() {
    //Defines the 3rows 9columns format of the 2D array
    this._entries = new Array(3)
      .fill(0)
      .map(() => new Array(9).fill(0).map(() => 0));
  }

  /**
   * A quick count of slots filled
   */
  get numOfEntries(): number {
    return this._entries
      .map((r) => r.filter((c) => c).length)
      .reduce((a, b) => a + b, 0);
  }

  /** Helper: check if the ticket is complete */
  get isCompleted(): boolean {
    return this.numOfEntries === 15;
  }

  /** Helper: Row level completeness  */
  /**
   * Helper: Row level completeness
   * @param rowIndex index of the row
   * @returns
   */
  private isRowCompleted(rowIndex: number) {
    const rowValues = this.getRowValues(rowIndex);
    return rowValues.filter((r) => r).length == 5;
  }

  /**
   * Helper: Col level completeness
   * @param colIndex index of the col
   * @returns
   */
  private isColCompleted(colIndex: number) {
    const colValues = this.getColumnValues(colIndex);
    return colValues.filter((c) => c).length == 3;
  }

  /**
   * Helper: Set the value of ticket at specific index
   * @param rowIndex
   * @param colIndex
   * @param value
   */
  private updateEntry(rowIndex: number, colIndex: number, value: number) {
    this._entries[rowIndex][colIndex] = value;
  }

  /**
   * Helper: List all column values as an array
   * @param colIndex
   * @returns
   */
  private getColumnValues(colIndex: number) {
    return this._entries.map((row) => row[colIndex]);
  }

  /**
   * Helper: List all row values as an array
   * @param rowIndex
   * @returns
   */
  private getRowValues(rowIndex: number) {
    return this._entries[rowIndex];
  }

  /**
   * Generate values for a ticket
   */
  generate() {
    // Initialize a list of numbers from 1-90
    // but group them into arrays of 1-10, 11-20, 21-30 etc
    const numbers = new Array(9)
      .fill(0)
      .map((r, rI) => new Array(10).fill(0).map((c, cI) => rI * 10 + cI + 1));

    // Iterate through all columns
    this.getRowValues(0).forEach((c, cIndex) => {
      //Choose a number for the specific column in question
      const randomIndex = _.random(0, numbers[cIndex].length - 1);
      const selectedNumber = numbers[cIndex][randomIndex];

      //Choose a row at random, which is not yet completed (<5 elements in row)
      const randomRow =
        _.sample([0, 1, 2].filter((r) => !this.isRowCompleted(r))) || 0;

      //If the column is not completed
      // and the entry at the specificed location is 0
      if (
        !this.isColCompleted(cIndex) &&
        this._entries[randomRow][cIndex] === 0
      ) {
        //Update the chosen number into the location
        this.updateEntry(randomRow, cIndex, selectedNumber);

        //Remove the chosen number from the grouped number array
        numbers[cIndex].splice(randomIndex, 1);
      }
    });

    //Recursive function for multiple passes, till ticket is generated
    const fillRecursively = () => {
      //Loop through all rows
      this.getColumnValues(0).forEach((r, rIndex) => {
        // Loop through all columns
        this.getRowValues(0).forEach((c, cIndex) => {
          //Choose a number for the specific column in question
          const randomIndex = _.random(0, numbers[cIndex].length - 1);
          const selectedNumber = numbers[cIndex][randomIndex];

          //Random chance for generating variants of the ticket
          const setOrNot = Math.random() > 0.5;

          //If the random chance is set
          // and Tambola is not completed
          // and Row is not full (< 5)
          // and Col is not full
          // and the entry at the location is 0
          if (
            setOrNot &&
            !this.isCompleted &&
            !this.isRowCompleted(rIndex) &&
            !this.isColCompleted(cIndex) &&
            this._entries[rIndex][cIndex] === 0
          ) {
            //Update the chosen number into the location
            this.updateEntry(rIndex, cIndex, selectedNumber);

            //Remove the chosen number from the grouped number array
            numbers[cIndex].splice(randomIndex, 1);
          }
        });
      });

      //If the tambola is not completed
      if (!this.isCompleted) {
        fillRecursively();
      } else {
        //If the tambola is completed
        this.sort();
      }
    };

    //Trigger the recursive function
    fillRecursively();
  }

  /**
   * Sort the ticket
   */
  private sort() {
    let ticket = this._entries;
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
      else if (
        ticket[0][col] != 0 &&
        ticket[1][col] != 0 &&
        ticket[2][col] == 0
      ) {
        if (ticket[0][col] > ticket[1][col]) {
          var temp = ticket[0][col];
          ticket[0][col] = ticket[1][col];
          ticket[1][col] = temp;
        }
      }
      //If 1st and 3rd rows are populated
      else if (
        ticket[0][col] != 0 &&
        ticket[1][col] == 0 &&
        ticket[2][col] != 0
      ) {
        if (ticket[0][col] > ticket[2][col]) {
          var temp = ticket[0][col];
          ticket[0][col] = ticket[2][col];
          ticket[2][col] = temp;
        }
      }
      //If 2nd and 3rd rows are populated
      else if (
        ticket[0][col] == 0 &&
        ticket[1][col] != 0 &&
        ticket[2][col] != 0
      ) {
        if (ticket[1][col] > ticket[2][col]) {
          var temp = ticket[1][col];
          ticket[1][col] = ticket[2][col];
          ticket[2][col] = temp;
        }
      }
    }
  }

  /**
   * Output the ticket
   */
  print() {
    console.log("-------------------------------------------");
    this._entries.map((row) => {
      console.log(
        row
          .map((c) => (c == 0 ? "" : c).toString().padStart(2, " "))
          .join(" | ")
      );
      console.log("-------------------------------------------");
    });
  }
}

export default TambolaTicket;
