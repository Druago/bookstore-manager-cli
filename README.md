# 📚 Bookstore Manager CLI

Sistema de gerenciamento de livraria desenvolvido em **Node.js**, **TypeScript** e **PostgreSQL**, executado via terminal (CLI). O projeto permite o gerenciamento de autores, livros, clientes e empréstimos, utilizando uma arquitetura em camadas para facilitar a manutenção e organização do código.

---

## 📖 Sobre o Projeto

O **Bookstore Manager CLI** foi desenvolvido como projeto acadêmico com o objetivo de aplicar conceitos de:

- Programação Orientada a Objetos (POO)
- Arquitetura em Camadas
- CRUD completo
- Banco de Dados Relacional
- PostgreSQL
- TypeScript
- Node.js
- Git e GitHub

O sistema realiza todas as operações através do terminal, oferecendo uma interface simples e intuitiva para gerenciamento de uma livraria.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg
- readline-sync
- ts-node-dev
- Git
- GitHub

---

## 📂 Estrutura do Projeto

```
src/
├── controllers/
├── database/
├── interfaces/
├── menus/
├── models/
├── repositories/
├── services/
└── main.ts
```

O projeto segue a arquitetura:

```
Menu
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

Cada camada possui uma responsabilidade específica, tornando o código organizado e de fácil manutenção.

---

## 🗄 Banco de Dados

O sistema utiliza PostgreSQL contendo quatro tabelas principais:

- Authors
- Books
- Clients
- Loans

Relacionamentos:

- Um autor pode possuir vários livros.
- Um cliente pode possuir vários empréstimos.
- Um livro pode participar de vários empréstimos.

---

## ⚙ Funcionalidades

### 👤 Autores

- Cadastrar autor
- Listar autores
- Buscar autor por ID
- Atualizar autor
- Remover autor

---

### 📚 Livros

- Cadastrar livro
- Listar livros
- Buscar livro por ID
- Atualizar livro
- Remover livro

---

### 👥 Clientes

- Cadastrar cliente
- Listar clientes
- Buscar cliente por ID
- Atualizar cliente
- Remover cliente

---

### 📖 Empréstimos

- Registrar empréstimo
- Listar empréstimos
- Buscar empréstimo por ID
- Registrar devolução
- Remover empréstimo

Durante o empréstimo o sistema:

- verifica se o cliente existe;
- verifica se o livro existe;
- impede empréstimos de livros sem estoque;
- reduz automaticamente a quantidade disponível.

Durante a devolução:

- registra a data de devolução;
- aumenta automaticamente a quantidade do livro;
- impede devoluções duplicadas.

---

## ▶ Como Executar

### Clone o projeto

```bash
git clone <url-do-repositorio>
```

Entre na pasta do projeto:

```bash
cd bookstore-manager-cli
```

---

### Instale as dependências

```bash
npm install
```

---

### Configure o banco de dados

Crie um banco PostgreSQL e execute o script SQL responsável pela criação das tabelas.

Depois configure os dados de conexão em:

```
src/database/connection.ts
```

---

### Execute o projeto

```bash
npm run dev
```

---

## 📋 Menu Principal

```
=================================
      BOOKSTORE MANAGER CLI
=================================

1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Sair
```

---

## 📌 Organização do Desenvolvimento

O desenvolvimento foi realizado utilizando Git Flow simplificado, com uma branch para cada funcionalidade.

Branches utilizadas:

```
main

feature/author
feature/book
feature/client
feature/loan
```

Padrão de commits:

```
feat(author): implementa CRUD completo de autores

feat(book): implementa CRUD completo de livros

feat(client): implementa CRUD completo de clientes

feat(loan): implementa gerenciamento de empréstimos
```

---

## 👨‍💻 Arquitetura

O sistema foi desenvolvido seguindo os princípios da Programação Orientada a Objetos, utilizando:

- Encapsulamento
- Separação de responsabilidades
- Classes
- Interfaces
- Camada de Serviço
- Camada de Persistência (Repository)

Essa organização facilita futuras manutenções e expansões do sistema.

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos.