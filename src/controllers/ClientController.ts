import { Client } from "../models/Client";
import { ClientService } from "../services/ClientService";

export class ClientController {

    private service = new ClientService();

    async create(client: Client): Promise<void> {

        await this.service.create(client);

    }

    async list(): Promise<Client[]> {

        return await this.service.list();

    }

    async findById(id: number): Promise<Client> {

        return await this.service.findById(id);

    }

    async update(client: Client): Promise<void> {

        await this.service.update(client);

    }

    async delete(id: number): Promise<void> {

        await this.service.delete(id);

    }

}