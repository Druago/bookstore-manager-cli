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

    async findById(id: number): Promise<Author | null> {

        const sql = `
            SELECT id, name, nationality
            FROM authors
            WHERE id = $1;
        `;

        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Author(
            row.name,
            row.nationality,
            row.id
        );
    }

    async update(author: Author): Promise<void> {

        const sql = `
            UPDATE authors
            SET
                name = $1,
                nationality = $2
            WHERE id = $3;
        `;

        await pool.query(sql, [
            author.name,
            author.nationality,
            author.id
        ]);

    }

    async delete(id: number): Promise<void> {

        const sql = `
            DELETE FROM authors
            WHERE id = $1;
        `;

        await pool.query(sql, [id]);

    }

}