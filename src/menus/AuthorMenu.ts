import readlineSync from "readline-sync";
import { Author } from "../models/Author";
import { AuthorController } from "../controllers/AuthorController";

export class AuthorMenu {

    private controller = new AuthorController();

    async create() {
        console.log("\n=== Cadastro de Autor ===");

        const name = readlineSync.question("Nome: ");
        const nationality = readlineSync.question("Nacionalidade: ");

        const author = new Author(name, nationality);

        await this.controller.create(author);

        console.log("\nAutor cadastrado com sucesso!");
    }
}