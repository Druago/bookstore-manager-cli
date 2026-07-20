import { Author } from "../models/Author";
import { AuthorService } from "../services/AuthorService";

export class AuthorController {

    private service = new AuthorService();

    async create(author: Author): Promise<void> {
        await this.service.create(author);
    }

    async list(): Promise<Author[]> {
        return await this.service.list();
    }

    async findById(id: number): Promise<Author | null> {
        return await this.service.findById(id);
    }

    async update(author: Author): Promise<void> {
        await this.service.update(author);
    }

    async delete(id: number): Promise<void> {
        await this.service.delete(id);
    }

}