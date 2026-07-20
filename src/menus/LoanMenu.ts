import readlineSync from "readline-sync";
import { LoanController } from "../controllers/LoanController";
import { Loan } from "../models/Loan";

export class LoanMenu {

    private controller = new LoanController();

    async showMenu() {

        let option: number;

        do {

            console.log("\n===== EMPRÉSTIMOS =====");
            console.log("1 - Registrar Empréstimo");
            console.log("2 - Listar Empréstimos");
            console.log("3 - Buscar Empréstimo por ID");
            console.log("4 - Registrar Devolução");
            console.log("5 - Remover Empréstimo");
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
                    await this.registerReturn();
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

            console.log("\n===== NOVO EMPRÉSTIMO =====");

            const clientId = readlineSync.questionInt("ID do Cliente: ");
            const bookId = readlineSync.questionInt("ID do Livro: ");

            const loan = new Loan(
                clientId,
                bookId,
                new Date()
            );

            await this.controller.create(loan);

            console.log("\nEmpréstimo registrado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async list() {

        const loans = await this.controller.list();

        console.log("\n===== EMPRÉSTIMOS =====");

        if (loans.length === 0) {

            console.log("Nenhum empréstimo encontrado.");
            return;

        }

        loans.forEach(loan => {

            console.log(`ID: ${loan.id}`);
            console.log(`Cliente: ${loan.clientName}`);
            console.log(`Livro: ${loan.bookTitle}`);
            console.log(`Data Empréstimo: ${new Date(loan.loanDate).toLocaleDateString("pt-BR")}`);

            if (loan.returnDate) {

                console.log(`Data Devolução: ${new Date(loan.returnDate).toLocaleDateString("pt-BR")}`);
                console.log("Status: Devolvido");

            } else {

                console.log("Status: Em Aberto");

            }

            console.log("--------------------------------");

        });

    }

    async findById() {

        try {

            const id = readlineSync.questionInt("ID do empréstimo: ");

            const loan = await this.controller.findById(id);

            console.log(`\nID: ${loan.id}`);
            console.log(`Cliente: ${loan.clientName}`);
            console.log(`Livro: ${loan.bookTitle}`);
            console.log(`Empréstimo: ${new Date(loan.loanDate).toLocaleDateString("pt-BR")}`);

            if (loan.returnDate) {

                console.log(`Devolução: ${new Date(loan.returnDate).toLocaleDateString("pt-BR")}`);

            } else {

                console.log("Devolução: Pendente");

            }

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async registerReturn() {

        try {

            const id = readlineSync.questionInt("ID do empréstimo: ");

            await this.controller.registerReturn(id);

            console.log("\nDevolução registrada com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async delete() {

        try {

            const id = readlineSync.questionInt("ID do empréstimo: ");

            await this.controller.delete(id);

            console.log("\nEmpréstimo removido com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

}