import { IClient } from "../interfaces/IClient";

export class Client implements IClient {

    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public id?: number
    ) { }

}