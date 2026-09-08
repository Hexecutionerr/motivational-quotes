# 🌸 CaptionCraft AI

CaptionCraft AI is an AI-Powered Social Content Generation SaaS. It provides a platform where users can discover, scroll, and generate high-quality quotes, captions, and content for social media platforms like Instagram, Facebook, Pinterest, and more.

## 🚀 Features

- **Infinite Scroll Feed:** Explore curated quotes and captions with an addictive card-based UI.
- **AI Content Generator:** Generate captions, quotes, and post ideas based on your mood, context, and preferred platform.
- **Chatbot Assistant:** Conversational AI to generate ideas in English or Hindi (e.g. "Give me a breakup caption").
- **Save & Copy:** Keep track of your favorite quotes and 1-click copy to clipboard.
- **Categorization:** Separate pages and tags for Love, Sad, Motivation, Study, Gym, and Attitude.

## 💻 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI Integration:** Google Gemini API 
- **Authentication:** JWT & bcrypt
- **Caching & Rate Limiting:** node-cache, express-rate-limit

## 🛠 Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB 

### Environment Variables
Inside the `server/` directory, update the `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/captioncraft
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### Installation

1. Install root dependencies (concurrently):
   ```bash
   npm install
   ```

2. Install backend and frontend dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. Seed Initial Data (Categories & Quotes):
   ```bash
   cd server
   npm run seed
   ```

### Running Locally

Run both the frontend and backend simultaneously from the root directory:
```bash
npm run dev
```

## 🌐 Deployment (Agent 5)

### Database
- We recommend MongoDB Atlas for production data scaling.

### Backend (Render / Railway)
- Push the code to GitHub.
- Link the `server/` directory on Render/Railway.
- Provide all Production Environment Variables.

### Frontend (Vercel)
- Push code to GitHub.
- Import project to Vercel and set the Root Directory to `client/`.
- Ensure Vercel build command is `npm run build`.

## 🤝 Project Structure
- **/client**: React code with Vite architecture
- **/server**: Express API, models, controllers, services
- **/artifacts**: Includes deep architecture layout created by Agent 1 