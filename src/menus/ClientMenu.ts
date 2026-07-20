import readlineSync from "readline-sync";
import { ClientController } from "../controllers/ClientController";
import { Client } from "../models/Client";

export class ClientMenu {

    private controller = new ClientController();

    async showMenu() {

        let option: number;

        do {

            console.log("\n===== CLIENTES =====");
            console.log("1 - Cadastrar Cliente");
            console.log("2 - Listar Clientes");
            console.log("3 - Buscar Cliente por ID");
            console.log("4 - Atualizar Cliente");
            console.log("5 - Remover Cliente");
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

            console.log("\n===== CADASTRAR CLIENTE =====");

            const name = readlineSync.question("Nome: ");
            const email = readlineSync.question("E-mail: ");
            const phone = readlineSync.question("Telefone: ");

            const client = new Client(
                name,
                email,
                phone
            );

            await this.controller.create(client);

            console.log("\nCliente cadastrado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async list() {

        const clients = await this.controller.list();

        console.log("\n===== CLIENTES CADASTRADOS =====");

        if (clients.length === 0) {

            console.log("Nenhum cliente cadastrado.");
            return;

        }

        clients.forEach(client => {

            console.log(`ID: ${client.id}`);
            console.log(`Nome: ${client.name}`);
            console.log(`E-mail: ${client.email}`);
            console.log(`Telefone: ${client.phone}`);
            console.log("-----------------------------");

        });

    }

    async findById() {

        try {

            console.log("\n===== BUSCAR CLIENTE =====");

            const id = readlineSync.questionInt("Informe o ID do cliente: ");

            const client = await this.controller.findById(id);

            console.log(`\nID: ${client.id}`);
            console.log(`Nome: ${client.name}`);
            console.log(`E-mail: ${client.email}`);
            console.log(`Telefone: ${client.phone}`);

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async update() {

        try {

            console.log("\n===== ATUALIZAR CLIENTE =====");

            const id = readlineSync.questionInt("Informe o ID do cliente: ");

            const name = readlineSync.question("Novo nome: ");
            const email = readlineSync.question("Novo e-mail: ");
            const phone = readlineSync.question("Novo telefone: ");

            const client = new Client(
                name,
                email,
                phone,
                id
            );

            await this.controller.update(client);

            console.log("\nCliente atualizado com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

    async delete() {

        try {

            console.log("\n===== REMOVER CLIENTE =====");

            const id = readlineSync.questionInt("Informe o ID do cliente: ");

            await this.controller.delete(id);

            console.log("\nCliente removido com sucesso!");

        } catch (error) {

            console.log(error instanceof Error ? error.message : "Erro inesperado.");

        }

    }

}