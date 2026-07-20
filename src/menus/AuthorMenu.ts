import readlineSync from "readline-sync";
import { Author } from "../models/Author";
import { AuthorController } from "../controllers/AuthorController";

export class AuthorMenu {

    private controller = new AuthorController();

    async showMenu() {

        let option: number;

        do {

            console.log("\n===== AUTORES =====");
            console.log("1 - Cadastrar Autor");
            console.log("2 - Listar Autores");
            console.log("0 - Voltar");

            option = readlineSync.questionInt("Escolha: ");

            switch (option) {

                case 1:
                    await this.create();
                    break;

                case 2:
                    await this.list();
                    break;

                case 0:
                    console.log("Voltando...");
                    break;

                default:
                    console.log("Opção inválida.");

            }

        } while (option !== 0);

    }

    async create() {

        console.log("\n=== Cadastro de Autor ===");

        const name = readlineSync.question("Nome: ");
        const nationality = readlineSync.question("Nacionalidade: ");

        const author = new Author(name, nationality);

        await this.controller.create(author);

        console.log("\nAutor cadastrado com sucesso!");

    }

    async list() {
        const authors = await this.controller.list();

        console.log("\n===== AUTORES CADASTRADOS =====");

        if (authors.length === 0) {
            console.log("Nenhum autor cadastrado.");
            return;
        }

        authors.forEach((author, index) => {
            console.log(
                `${index + 1} - ${author.name} (${author.nationality})`
            );
        });
    }

}