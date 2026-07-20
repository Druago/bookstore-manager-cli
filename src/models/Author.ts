import { IAuthor } from "../interfaces/IAuthor";

export class Author implements IAuthor {
  id?: number;
  name: string;
  nationality: string;

  constructor(
    name: string,
    nationality: string,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.nationality = nationality;
  }
}