# AI-dentify

AI-dentify is a Next.js application that helps users create an AI identity based on their Twitter/X profile. The application analyzes your selected tweets and uses Deepseek AI to generate new tweets that match your style and personality.

## Features

- Twitter/X profile integration
- AI-powered tweet generation using Deepseek
- Automated tweet posting (Beta)
- Customizable bot settings

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
DEEPSEEK_API_KEY=your_deepseek_api_key
```

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

- `DEEPSEEK_API_KEY`: Your Deepseek API key for tweet generation

## How it Works

1. Users connect their Twitter/X account
2. Select their top 5 tweets
3. Configure their AI bot settings
4. The application uses Deepseek AI to analyze the selected tweets and generate new ones in a similar style
5. Users can enable automated posting with customizable frequency (Beta)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
