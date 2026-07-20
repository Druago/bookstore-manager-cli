export interface ILoan {

    id?: number;
    clientId: number;
    bookId: number;
    loanDate: Date;
    returnDate?: Date | null;

}