# Kanban App

Aplicativo de Kanban com NestJS (backend) e React (frontend).

## Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), [PostgreSQL](https://www.postgresql.org/)
- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [Typescript](https://www.typescriptlang.org/), [React Bootstrap](https://react-bootstrap.github.io/), [React DnD](https://react-dnd.github.io/), [Material UI](https://mui.com/material-ui/getting-started/)

---

## Instalação e Inicialização

### Backend

1. Acesse a pasta do backend:

   ```sh
   cd backend
   ```

2. Instale as dependências:

   ```sh
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Crie o banco de dados PostgreSQL no ambiente linux:

   3.1 Atualize os pacotes do Wsl ou seu Linux:
   ```sh
   sudo apt update
   ```
   3.2 Instale o PostgreSQL caso não tenha instalado:
   ```sh
   sudo apt install postgresql postgresql-contrib
   ```
   3.3 Inicialize o Serviço:
   ```sh
   sudo service postgresql start
   ```
   3.4 Entre no ambiente do postgreSQL via terminal:
   ```sh
   sudo -u postgres psql
   ```
   3.5 Crie o banco e o usuário:
   ```sh
    CREATE DATABASE kanban;
    CREATE USER yourUser WITH ENCRYPTED PASSWORD 'yourPassword';
    GRANT ALL PRIVILEGES ON DATABASE kanban TO yourUser;
    \q
   ```
   3.6 Por último, atualize o App.module.ts com as credenciais criadas acima por você
    

4. Inicie o backend em modo desenvolvimento:

   ```sh
   npm run start:dev
   # ou
   yarn run start:dev
   # ou
   pnpm start:dev
   ```

---

### Frontend

1. Acesse a pasta do frontend:

   ```sh
   cd frontend
   ```

2. Instale as dependências:

   ```sh
   npm install
   # ou
   yarn install
   ```

3. Inicie o frontend:

   ```sh
   npm run dev
   # ou
   yarn dev
   ```
---

Pronto! Acesse o frontend em `http://localhost:5173` (ou porta configurada pelo Vite) e o backend em `http://localhost:3000`.
