import { Author } from "../models/Author";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorService {

    private repository = new AuthorRepository();

    async create(author: Author) {
        await this.repository.create(author);
    }

    async list(): Promise<Author[]> {
        return await this.repository.list();
    }

}