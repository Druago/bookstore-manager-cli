import { Author } from "../models/Author";
import { AuthorService } from "../services/AuthorService";

export class AuthorController {

    private service = new AuthorService();

    async create(author: Author) {
        await this.service.create(author);
    }

    async list(): Promise<Author[]> {
        return await this.service.list();
    }

}