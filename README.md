# Worksy Sign Up Page

A production-ready Next.js application replicating the Worksy sign-up interface.

## Features

- Modern, responsive design
- Production-optimized build
- Docker containerization
- Health check endpoint
- ESLint configuration
- SEO-friendly

## Quick Start

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t worksy-signup .
docker run -p 3000:3000 worksy-signup
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── src/app/              # Next.js 13+ App Router
├── src/components/       # React components
├── styles/              # CSS modules
├── public/              # Static assets
├── Dockerfile           # Docker configuration
└── docker-compose.yml   # Docker Compose setup
```

## Environment

- Next.js 14
- React 18
- Node.js 18+
- Docker support

## Deployment

The application is optimized for production deployment with:
- Standalone output for Docker
- Optimized CSS and JavaScript
- Health check endpoint
- Security headers

## Next Documentation
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
