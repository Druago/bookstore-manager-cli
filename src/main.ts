import readlineSync from "readline-sync";

import { AuthorMenu } from "./menus/AuthorMenu";
import { BookMenu } from "./menus/BookMenu";

async function main() {

    let option: number;

    do {

        console.log("\n=================================");
        console.log("      BOOKSTORE MANAGER CLI");
        console.log("=================================");
        console.log("1 - Autores");
        console.log("2 - Livros");
        console.log("0 - Sair");

        option = readlineSync.questionInt("\nEscolha: ");

        switch (option) {

            case 1:

                await new AuthorMenu().showMenu();
                break;

            case 2:

                await new BookMenu().showMenu();
                break;

            case 0:

                console.log("\nEncerrando sistema...");
                break;

            default:

                console.log("\nOpção inválida.");

        }

    } while (option !== 0);

}

main();