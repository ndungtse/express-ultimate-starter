# Express Ts Ultimate Starter

This is a starter project for
 Express.js with TypeScript. It includes the following features:

- TypeScript
- Express.js
- Docker
- Prisma + PostgreSQL
- JWT Authentication
<!-- - [] Jest
- [] ESLint -->

## Getting Started

### Prerequisites

- Node.js
- Docker (optional)
- Docker Compose (optional)

### Installation

1. Clone the repository
```bash
git clone <this-repo-url>
```
2. Install dependencies
```bash
npm install -g pnpm
pnpm install
```
3. Create a `.env` file
```bash
cp .env.example .env
```

### Development

1. Start the development server
```bash
pnpm dev
```
2. Open the browser and navigate to `http://localhost:3000`

### Production

1. Build the project
```bash
pnpm build
```
2. Start the production server
```bash
pnpm start
```

### Docker

1. Build the Docker image
```bash
docker build -t express-ts-ultimate-starter .
```
2. Run the Docker container
```bash
docker run -p 3000:3000 express-ts-ultimate-starter
```