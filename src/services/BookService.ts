import { Book } from "../models/Book";
import { AuthorRepository } from "../repositories/AuthorRepository";
import { BookRepository } from "../repositories/BookRepository";

export class BookService {

    private repository = new BookRepository();
    private authorRepository = new AuthorRepository();

    async create(book: Book): Promise<void> {

        const author = await this.authorRepository.findById(book.authorId);

        if (!author) {
            throw new Error("Autor não encontrado.");
        }

        await this.repository.create(book);

    }

    async list(): Promise<Book[]> {
        return await this.repository.list();
    }

    async findById(id: number): Promise<Book> {

        const book = await this.repository.findById(id);

        if (!book) {
            throw new Error("Livro não encontrado.");
        }

        return book;

    }

    async update(book: Book): Promise<void> {

        const author = await this.authorRepository.findById(book.authorId);

        if (!author) {
            throw new Error("Autor não encontrado.");
        }

        const updated = await this.repository.update(book);

        if (!updated) {
            throw new Error("Livro não encontrado.");
        }

    }

    async delete(id: number): Promise<void> {

        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new Error("Livro não encontrado.");
        }

    }

}