import { pool } from "../database/connection";
import { Loan } from "../models/Loan";

export class LoanRepository {

    async create(loan: Loan): Promise<void> {

        const sql = `
            INSERT INTO loans (
                client_id,
                book_id,
                loan_date,
                return_date
            )
            VALUES ($1, $2, $3, $4);
        `;

        await pool.query(sql, [
            loan.clientId,
            loan.bookId,
            loan.loanDate,
            loan.returnDate
        ]);

    }

    async list(): Promise<Loan[]> {

        const sql = `
            SELECT
                l.id,
                l.client_id,
                l.book_id,
                l.loan_date,
                l.return_date,
                c.name AS client_name,
                b.title AS book_title
            FROM loans l
            INNER JOIN clients c
                ON c.id = l.client_id
            INNER JOIN books b
                ON b.id = l.book_id
            ORDER BY l.id;
        `;

        const result = await pool.query(sql);

        return result.rows.map(row =>
            new Loan(
                row.client_id,
                row.book_id,
                row.loan_date,
                row.return_date,
                row.id,
                row.client_name,
                row.book_title
            )
        );

    }

    async findById(id: number): Promise<Loan | null> {

        const sql = `
            SELECT
                l.id,
                l.client_id,
                l.book_id,
                l.loan_date,
                l.return_date,
                c.name AS client_name,
                b.title AS book_title
            FROM loans l
            INNER JOIN clients c
                ON c.id = l.client_id
            INNER JOIN books b
                ON b.id = l.book_id
            WHERE l.id = $1;
        `;

        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Loan(
            row.client_id,
            row.book_id,
            row.loan_date,
            row.return_date,
            row.id,
            row.client_name,
            row.book_title
        );

    }

    async registerReturn(id: number): Promise<boolean> {

        const sql = `
            UPDATE loans
            SET return_date = CURRENT_DATE
            WHERE id = $1
            AND return_date IS NULL;
        `;

        const result = await pool.query(sql, [id]);

        return result.rowCount! > 0;

    }

    async delete(id: number): Promise<boolean> {

        const sql = `
            DELETE FROM loans
            WHERE id = $1;
        `;

        const result = await pool.query(sql, [id]);

        return result.rowCount! > 0;

    }

}