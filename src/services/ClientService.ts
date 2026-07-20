import { Client } from "../models/Client";
import { ClientRepository } from "../repositories/ClientRepository";

export class ClientService {

    private repository = new ClientRepository();

    async create(client: Client): Promise<void> {

        await this.repository.create(client);

    }

    async list(): Promise<Client[]> {

        return await this.repository.list();

    }

    async findById(id: number): Promise<Client> {

        const client = await this.repository.findById(id);

        if (!client) {
            throw new Error("Cliente não encontrado.");
        }

        return client;

    }

    async update(client: Client): Promise<void> {

        const updated = await this.repository.update(client);

        if (!updated) {
            throw new Error("Cliente não encontrado.");
        }

    }

    async delete(id: number): Promise<void> {

        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new Error("Cliente não encontrado.");
        }

    }

}