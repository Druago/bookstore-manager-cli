import { pool } from "../database/connection";
import { Author } from "../models/Author";

export class AuthorRepository {

    async create(author: Author): Promise<void> {

        const sql = `
            INSERT INTO authors (name, nationality)
            VALUES ($1, $2)
        `;

        await pool.query(sql, [
            author.name,
            author.nationality
        ]);
    }

    async list(): Promise<Author[]> {

        const sql = `
            SELECT id, name, nationality
            FROM authors
            ORDER BY id;
        `;

        const result = await pool.query(sql);

        return result.rows.map(row =>
            new Author(
                row.name,
                row.nationality,
                row.id
            )
        );
    }

}