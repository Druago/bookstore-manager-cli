import { Author } from "../models/Author";
import { AuthorService } from "../services/AuthorServices";

export class AuthorController {

    private service = new AuthorService();

    async create(author: Author) {
        await this.service.create(author);
    }

}