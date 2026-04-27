# ItaloStudy - AI-Powered Study Platform

## About ItaloStudy

**ItaloStudy** is the #1 platform for entrance exam preparation, offering free CEnT-S, IMAT, SAT, and IELTS preparation with unlimited practice mocks and direct university admission support.

**Website**: [https://italostudy.com](https://italostudy.com)

## Features

- 🎓 Free CEnT-S, IMAT, SAT, and IELTS preparation
- 📝 Unlimited practice tests and mock exams
- 🎯 AI-powered learning analytics
- 🌍 Direct university admission support
- 📱 Mobile app (Android APK)
- 💬 Community features
- 🏆 Progress tracking and leaderboards

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd study-buddy-ai-main

# Step 3: Install dependencies
npm install

# Step 4: Copy environment variables
cp .env.example .env.local

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

```sh
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Technologies Used

This project is built with modern web technologies:

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **Mobile**: Capacitor (Android)
- **3D Graphics**: Three.js with React Three Fiber
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Math Rendering**: KaTeX
- **Push Notifications**: OneSignal
- **Analytics**: Vercel Analytics

## Project Structure

```
study-buddy-ai-main/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── mobile/          # Mobile-specific components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── context/         # React context providers
│   ├── integrations/    # Third-party integrations
│   └── index.css        # Global styles
├── public/              # Static assets
├── android/             # Android Capacitor project
└── supabase/           # Database migrations and functions
```

## Mobile App

The project includes an Android mobile app built with Capacitor.

### Build Android APK

```sh
# 1. Build the web app
npm run build

# 2. Sync with Capacitor
npx cap sync android

# 3. Open Android Studio
npx cap open android

# 4. Build APK from Android Studio
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

This is a private project. For questions or support, please contact the development team.

## Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Deploy to Vercel

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

## License

All rights reserved © 2024-2026 ItaloStudy

---

**ItaloStudy** - Empowering students to achieve their dreams of studying abroad.