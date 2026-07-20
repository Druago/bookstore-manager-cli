import { AuthorMenu } from "./menus/AuthorMenu";

async function main() {
    const menu = new AuthorMenu();

    await menu.create();
}

main();