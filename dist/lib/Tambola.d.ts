import TambolaTicket from "./TambolaTicket.js";
/**
 * Game handler
 */
declare class Tambola {
    /**
     * Ticket generation
     * @param count Number of tambola tickets
     * @returns Array of TambolaTicket
     */
    static generateTickets(count: number): TambolaTicket[];
    /**
     * Draw generation
     * @returns sequence of Tambola numbers 1-90
     */
    static getDrawSequence(): number[];
}
export default Tambola;
