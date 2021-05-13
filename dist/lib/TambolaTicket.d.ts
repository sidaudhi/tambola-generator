/**
 * Representation of a tambola ticket
 */
declare class TambolaTicket {
    /**
     * A 2D array of rows and columns
     */
    _entries: number[][];
    constructor();
    /**
     * A quick count of slots filled
     */
    get numOfEntries(): number;
    /** Helper: check if the ticket is complete */
    get isCompleted(): boolean;
    /** Helper: Row level completeness  */
    /**
     * Helper: Row level completeness
     * @param rowIndex index of the row
     * @returns
     */
    private isRowCompleted;
    /**
     * Helper: Col level completeness
     * @param colIndex index of the col
     * @returns
     */
    private isColCompleted;
    /**
     * Helper: Set the value of ticket at specific index
     * @param rowIndex
     * @param colIndex
     * @param value
     */
    private updateEntry;
    /**
     * Helper: List all column values as an array
     * @param colIndex
     * @returns
     */
    private getColumnValues;
    /**
     * Helper: List all row values as an array
     * @param rowIndex
     * @returns
     */
    private getRowValues;
    /**
     * Generate values for a ticket
     */
    generate(): void;
    /**
     * Sort the ticket
     */
    private sort;
    /**
     * Output the ticket
     */
    print(): void;
}
export default TambolaTicket;
