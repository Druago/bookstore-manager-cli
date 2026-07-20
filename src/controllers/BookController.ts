import { Book } from "../models/Book";
import { BookService } from "../services/BookService";

export class BookController {

    private service = new BookService();

    async create(book: Book): Promise<void> {
        await this.service.create(book);
    }

    async list(): Promise<Book[]> {
        return await this.service.list();
    }

    async findById(id: number): Promise<Book> {
        return await this.service.findById(id);
    }

    async update(book: Book): Promise<void> {
        await this.service.update(book);
    }

    async delete(id: number): Promise<void> {
        await this.service.delete(id);
    }

}