import { ILoan } from "../interfaces/ILoan";

export class Loan implements ILoan {

    constructor(
        public clientId: number,
        public bookId: number,
        public loanDate: Date,
        public returnDate: Date | null = null,
        public id?: number,

        public clientName?: string,
        public bookTitle?: string
    ) {}

}