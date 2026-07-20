import { pool } from "../database/connection";
import { Client } from "../models/Client";

export class ClientRepository {

    async create(client: Client): Promise<void> {

        const sql = `
            INSERT INTO clients (
                name,
                email,
                phone
            )
            VALUES ($1, $2, $3);
        `;

        await pool.query(sql, [
            client.name,
            client.email,
            client.phone
        ]);

    }

    async list(): Promise<Client[]> {

        const sql = `
            SELECT
                id,
                name,
                email,
                phone
            FROM clients
            ORDER BY id;
        `;

        const result = await pool.query(sql);

        return result.rows.map(row =>
            new Client(
                row.name,
                row.email,
                row.phone,
                row.id
            )
        );

    }

    async findById(id: number): Promise<Client | null> {

        const sql = `
            SELECT
                id,
                name,
                email,
                phone
            FROM clients
            WHERE id = $1;
        `;

        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Client(
            row.name,
            row.email,
            row.phone,
            row.id
        );

    }

    async update(client: Client): Promise<boolean> {

        const sql = `
            UPDATE clients
            SET
                name = $1,
                email = $2,
                phone = $3
            WHERE id = $4;
        `;

        const result = await pool.query(sql, [
            client.name,
            client.email,
            client.phone,
            client.id
        ]);

        return result.rowCount! > 0;

    }

    async delete(id: number): Promise<boolean> {

        const sql = `
            DELETE FROM clients
            WHERE id = $1;
        `;

        const result = await pool.query(sql, [id]);

        return result.rowCount! > 0;

    }

}