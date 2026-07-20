import { Loan } from "../models/Loan";
import { LoanRepository } from "../repositories/LoanRepository";
import { ClientRepository } from "../repositories/ClientRepository";
import { BookRepository } from "../repositories/BookRepository";

export class LoanService {

    private repository = new LoanRepository();
    private clientRepository = new ClientRepository();
    private bookRepository = new BookRepository();

    async create(loan: Loan): Promise<void> {

        const client = await this.clientRepository.findById(loan.clientId);

        if (!client) {
            throw new Error("Cliente não encontrado.");
        }

        const book = await this.bookRepository.findById(loan.bookId);

        if (!book) {
            throw new Error("Livro não encontrado.");
        }

        if (book.quantity <= 0) {
            throw new Error("Livro indisponível.");
        }

        await this.repository.create(loan);

        await this.bookRepository.decreaseQuantity(loan.bookId);

    }

    async list(): Promise<Loan[]> {
        return await this.repository.list();
    }

    async findById(id: number): Promise<Loan> {

        const loan = await this.repository.findById(id);

        if (!loan) {
            throw new Error("Empréstimo não encontrado.");
        }

        return loan;

    }

    async registerReturn(id: number): Promise<void> {

        const loan = await this.repository.findById(id);

        if (!loan) {
            throw new Error("Empréstimo não encontrado.");
        }

        if (loan.returnDate) {
            throw new Error("Este empréstimo já foi devolvido.");
        }

        await this.repository.registerReturn(id);

        await this.bookRepository.increaseQuantity(loan.bookId);

    }

    async delete(id: number): Promise<void> {

        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new Error("Empréstimo não encontrado.");
        }

    }

}