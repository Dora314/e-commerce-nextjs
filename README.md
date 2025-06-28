# E-commerce Next.js Project

This is a full-stack e-commerce application built with Next.js, Prisma, and PostgreSQL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later)
- npm / yarn / pnpm
- PostgreSQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/e-commerce-nextjs.git
   ```
2. Install NPM packages
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Set up your environment variables. Copy the `.env.example` file to a new file named `.env` and fill in the required values.
   ```sh
   cp .env.example .env
   ```
4. Set up the database
   ```sh
   npx prisma migrate dev
   npx prisma db seed
   ```

### Running the development server

```sh
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

The project uses PostgreSQL as the database. Prisma is used as the ORM to interact with the database.

To seed the database with some initial data, you can run the following command:

```sh
npx prisma db seed
```

This will execute the `prisma/seed.ts` file.

## Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Playwright](https://playwright.dev/) - End-to-end testing

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

To run the tests, use the following command:

```sh
npx playwright test
```
