// -----------------
// DRAW ALGORITHM
// -----------------
// #1 - Maintain array of numbers between 1 and 90
// #2 - Generate random index between 0 and length of array and choose the value
// #3 - Remove the value from the array
// #4 - Repeat till 90 numbers populated

import _ from "lodash";

import TambolaTicket from "./TambolaTicket.js";

/**
 * Game handler
 */
class Tambola {
  /**
   * Ticket generation
   * @param count Number of tambola tickets
   * @returns Array of TambolaTicket
   */
  static generateTickets(count: number) {
    return new Array(count).fill(0).map(() => {
      const ticket = new TambolaTicket();
      ticket.generate();
      return ticket;
    });
  }
  /**
   * Draw generation
   * @returns sequence of Tambola numbers 1-90
   */
  static getDrawSequence() {
    const sequence = [];
    const allNumbers = new Array(90).fill(0).map((n, i) => i + 1);
    for (var i = 0; i < 90; i++) {
      const randomIndex = _.random(0, allNumbers.length - 1);
      sequence.push(allNumbers[randomIndex]);
      allNumbers.splice(randomIndex, 1);
    }
    return sequence;
  }
}

export default Tambola;
