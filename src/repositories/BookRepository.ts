import { pool } from "../database/connection";
import { Book } from "../models/Book";

export class BookRepository {

    async create(book: Book): Promise<void> {

        const sql = `
            INSERT INTO books (
                title,
                publication_year,
                quantity,
                author_id
            )
            VALUES ($1, $2, $3, $4);
        `;

        await pool.query(sql, [
            book.title,
            book.publicationYear,
            book.quantity,
            book.authorId
        ]);

    }

    async list(): Promise<Book[]> {

        const sql = `
            SELECT
                b.id,
                b.title,
                b.publication_year,
                b.quantity,
                b.author_id,
                a.name AS author_name
            FROM books b
            INNER JOIN authors a
                ON a.id = b.author_id
            ORDER BY b.id;
        `;

        const result = await pool.query(sql);

        return result.rows.map(row =>
            new Book(
                row.title,
                row.publication_year,
                row.quantity,
                row.author_id,
                row.id,
                row.author_name
            )
        );

    }

    async findById(id: number): Promise<Book | null> {

        const sql = `
            SELECT
                b.id,
                b.title,
                b.publication_year,
                b.quantity,
                b.author_id,
                a.name AS author_name
            FROM books b
            INNER JOIN authors a
                ON a.id = b.author_id
            WHERE b.id = $1;
        `;

        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Book(
            row.title,
            row.publication_year,
            row.quantity,
            row.author_id,
            row.id,
            row.author_name
        );

    }

    async update(book: Book): Promise<boolean> {

        const sql = `
            UPDATE books
            SET
                title = $1,
                publication_year = $2,
                quantity = $3,
                author_id = $4
            WHERE id = $5;
        `;

        const result = await pool.query(sql, [
            book.title,
            book.publicationYear,
            book.quantity,
            book.authorId,
            book.id
        ]);

        return result.rowCount! > 0;

    }

    async delete(id: number): Promise<boolean> {

        const sql = `
            DELETE FROM books
            WHERE id = $1;
        `;

        const result = await pool.query(sql, [id]);

        return result.rowCount! > 0;

    }

}