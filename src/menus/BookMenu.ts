import readlineSync from "readline-sync";
import { BookController } from "../controllers/BookController";
import { Book } from "../models/Book";

export class BookMenu {

    private controller = new BookController();

    async showMenu() {

        let option: number;

        do {

            console.log("\n===== LIVROS =====");
            console.log("1 - Cadastrar Livro");
            console.log("2 - Listar Livros");
            console.log("3 - Buscar Livro por ID");
            console.log("4 - Atualizar Livro");
            console.log("5 - Remover Livro");
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

            console.log("\n===== CADASTRAR LIVRO =====");

            const title = readlineSync.question("Título: ");
            const publicationYear = readlineSync.questionInt("Ano de publicação: ");
            const quantity = readlineSync.questionInt("Quantidade: ");
            const authorId = readlineSync.questionInt("ID do Autor: ");

            const book = new Book(
                title,
                publicationYear,
                quantity,
                authorId
            );

            await this.controller.create(book);

            console.log("\nLivro cadastrado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async list() {

        const books = await this.controller.list();

        console.log("\n===== LIVROS CADASTRADOS =====");

        if (books.length === 0) {

            console.log("Nenhum livro cadastrado.");
            return;

        }

        books.forEach(book => {

            console.log(`ID: ${book.id}`);
            console.log(`Título: ${book.title}`);
            console.log(`Ano: ${book.publicationYear}`);
            console.log(`Quantidade: ${book.quantity}`);
            console.log(`Autor: ${book.authorName}`);
            console.log("-----------------------------");

        });

    }

    async findById() {

        try {

            console.log("\n===== BUSCAR LIVRO =====");

            const id = readlineSync.questionInt("Informe o ID do livro: ");

            const book = await this.controller.findById(id);

            console.log(`\nID: ${book.id}`);
            console.log(`Título: ${book.title}`);
            console.log(`Ano: ${book.publicationYear}`);
            console.log(`Quantidade: ${book.quantity}`);
            console.log(`Autor: ${book.authorName}`);

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async update() {

        try {

            console.log("\n===== ATUALIZAR LIVRO =====");

            const id = readlineSync.questionInt("Informe o ID do livro: ");

            const title = readlineSync.question("Novo título: ");
            const publicationYear = readlineSync.questionInt("Novo ano de publicação: ");
            const quantity = readlineSync.questionInt("Nova quantidade: ");
            const authorId = readlineSync.questionInt("Novo ID do autor: ");

            const book = new Book(
                title,
                publicationYear,
                quantity,
                authorId,
                id
            );

            await this.controller.update(book);

            console.log("\nLivro atualizado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async delete() {

        try {

            console.log("\n===== REMOVER LIVRO =====");

            const id = readlineSync.questionInt("Informe o ID do livro: ");

            await this.controller.delete(id);

            console.log("\nLivro removido com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

}