import { Loan } from "../models/Loan";
import { LoanService } from "../services/LoanService";

export class LoanController {

    private service = new LoanService();

    async create(loan: Loan): Promise<void> {
        await this.service.create(loan);
    }

    async list(): Promise<Loan[]> {
        return await this.service.list();
    }

    async findById(id: number): Promise<Loan> {
        return await this.service.findById(id);
    }

    async registerReturn(id: number): Promise<void> {
        await this.service.registerReturn(id);
    }

    async delete(id: number): Promise<void> {
        await this.service.delete(id);
    }

}