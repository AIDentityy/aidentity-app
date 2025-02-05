# 🤖 AI-dentify

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

AI-dentify is a Next.js application that creates personalized AI identities using Twitter/X profiles. Leveraging Deepseek AI, it analyzes your tweets and generates new content that matches your unique style and personality.

![Demo](https://via.placeholder.com/800x400.png?text=AI-dentify+Demo+Preview) <!-- Replace with actual demo image -->

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Twitter/X developer account
- Deepseek API key

### Installation
```bash
git clone https://github.com/AIDentityy/aidentity-app.git
cd aidentity-app
npm install
```

### Configuration
Create `.env.local` in root directory:
```env
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### Running the App
```bash
npm run dev
```
Access at: http://localhost:3000/

## ✨ Features

- **Twitter/X Integration**  
  Connect your account and analyze your tweet history

- **AI-Powered Generation**  
  Create new tweets matching your style using Deepseek AI

- **Smart Automation**  
  Schedule automated posting (Beta) with custom frequency

- **Personality Customization**  
  Fine-tune AI behavior through detailed settings

## 🛠 How It Works

1. **Authentication**  
   Securely connect your Twitter/X account via OAuth

2. **Tweet Analysis**  
   Select key tweets for AI pattern recognition

3. **AI Training**  
   Deepseek processes your linguistic patterns and style

4. **Content Generation**  
   Create new tweets that maintain your authentic voice

5. **Automation** (Optional)  
   Schedule AI-generated posts directly to your profile

## 🌐 Deployment

Deploy using Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAIDentityy%2Faidentity-app)

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guidelines](CONTRIBUTING.md) for details.

## 📄 License

MIT © AI-dentify - See [LICENSE](LICENSE) for details

---

> **Note**  
> The Twitter/X integration requires valid developer credentials. Automated posting features are in beta - use with caution.

[Next.js Documentation](https://nextjs.org/docs) | 
[Deepseek API Docs](https://platform.deepseek.com/api) | 
[Twitter Developer Portal](https://developer.twitter.com/)
