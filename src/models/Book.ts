import { IBook } from "../interfaces/IBook";

export class Book implements IBook {

    id?: number;
    title: string;
    publicationYear: number;
    quantity: number;
    authorId: number;
    authorName?: string;

    constructor(
        title: string,
        publicationYear: number,
        quantity: number,
        authorId: number,
        id?: number,
        authorName?: string
    ) {
        this.id = id;
        this.title = title;
        this.publicationYear = publicationYear;
        this.quantity = quantity;
        this.authorId = authorId;
        this.authorName = authorName;
    }

}