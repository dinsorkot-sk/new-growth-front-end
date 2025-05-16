This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js v18 or higher  
- npm, Yarn or pnpm  

### Installation

```bash
# Clone this repo
git clone https://github.com/dinsorkot-sk/new-growth-front-end.git
cd new-growth-front-end

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Scripts

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Serve the production build
npm run start

# Run ESLint
npm run lint
```

## Environment Variables

Rename `.env` to `.env.local` (it's ignored by Git) and fill in your values.  
Example:

```ini
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
# Add other NEXT_PUBLIC_* variables here
```

> Remember to restart the dev server after editing `.env.local`.

## Deployment

This project is fully compatible with Vercel. To deploy:

1. Push your code to GitHub.
2. Import the repo in Vercel.
3. Vercel will auto-detect Next.js and handle the build.

Alternatively, you can self-host:

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m "Add YourFeature"`  
4. Push to your fork: `git push origin feature/YourFeature`  
5. Open a Pull Request  

Please follow the existing code style and add tests when appropriate.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
