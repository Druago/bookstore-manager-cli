import { Author } from "../models/Author";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorService {

    private repository = new AuthorRepository();

    async create(author: Author): Promise<void> {
        await this.repository.create(author);
    }

    async list(): Promise<Author[]> {
        return await this.repository.list();
    }

    async findById(id: number): Promise<Author> {

        const author = await this.repository.findById(id);

        if (!author) {
            throw new Error("Autor não encontrado.");
        }

        return author;

    }

    async update(author: Author): Promise<void> {

        await this.findById(author.id!);

        await this.repository.update(author);

    }

    async delete(id: number): Promise<void> {

        await this.findById(id);

        await this.repository.delete(id);

    }

}