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
            console.log("3 - Buscar Autor por ID");
            console.log("4 - Atualizar Autor");
            console.log("5 - Remover Autor");
            console.log("0 - Voltar");

            option = readlineSync.questionInt("Escolha: ");

            switch (option) {

                case 1:
                    await this.create();
                    break;

                case 2:
                    await this.list();
                    break;

                case 3:
                    await this.findById();
                    break;

                case 4:
                    await this.update();
                    break;

                case 5:
                    await this.delete();
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

        try {

            console.log("\n=== Cadastro de Autor ===");

            const name = readlineSync.question("Nome: ");
            const nationality = readlineSync.question("Nacionalidade: ");

            const author = new Author(name, nationality);

            await this.controller.create(author);

            console.log("\nAutor cadastrado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async list() {

        try {

            const authors = await this.controller.list();

            console.log("\n===== AUTORES CADASTRADOS =====");

            if (authors.length === 0) {
                console.log("Nenhum autor cadastrado.");
                return;
            }

            authors.forEach(author => {

                console.log(`ID: ${author.id}`);
                console.log(`Nome: ${author.name}`);
                console.log(`Nacionalidade: ${author.nationality}`);
                console.log("-----------------------------");

            });

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async findById() {

    try {

        console.log("\n===== BUSCAR AUTOR =====");

        const id = readlineSync.questionInt("Informe o ID do autor: ");

        const author = await this.controller.findById(id);

        if (!author) {
            console.log("\nAutor não encontrado.");
            return;
        }

        console.log(`\nID: ${author.id}`);
        console.log(`Nome: ${author.name}`);
        console.log(`Nacionalidade: ${author.nationality}`);

    } catch (error) {

        console.log(
            error instanceof Error
                ? error.message
                : "Erro ao buscar autor."
        );

    }

}

    async update() {

        try {

            console.log("\n===== ATUALIZAR AUTOR =====");

            const id = readlineSync.questionInt("Informe o ID do autor: ");

            await this.controller.findById(id);

            const name = readlineSync.question("Novo nome: ");
            const nationality = readlineSync.question("Nova nacionalidade: ");

            const author = new Author(name, nationality, id);

            await this.controller.update(author);

            console.log("\nAutor atualizado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async delete() {

        try {

            console.log("\n===== REMOVER AUTOR =====");

            const id = readlineSync.questionInt("Informe o ID do autor: ");

            await this.controller.delete(id);

            console.log("\nAutor removido com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

}