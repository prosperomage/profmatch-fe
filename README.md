# ProfMatch Frontend

An intelligent matching system that connects prospective postgraduate students with university professors based on research alignment.

## Features

- **University Search**: Enter any university name or URL
- **Research Interest Matching**: Describe your research interests to find aligned professors
- **CV Analysis**: Upload your CV for comprehensive profile matching
- **Professor Profiles**: View detailed professor information including publications and citation metrics
- **Export Results**: Download matches as CSV or JSON

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: TailwindCSS v4 with custom academic theme
- **Fonts**: Inter (sans), JetBrains Mono (monospace)
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure the variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_USE_MOCK` | Enable demo mode with mock data | `true` |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Build

```bash
npm run build
npm start
```

## Docker

Build and run with Docker:

```bash
docker build -t profmatch-fe .
docker run -p 3000:3000 profmatch-fe
```

With build arguments:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_USE_MOCK=false \
  -t profmatch-fe .
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home (input form)
│   ├── processing/        # Processing status page
│   ├── results/           # Match results page
│   ├── about/             # About page
│   └── not-found.tsx      # 404 page
├── components/
│   ├── layout/            # Header, Footer, Container, PageLayout
│   ├── professor/         # ProfessorCard, ProfessorDetail
│   └── ui/                # Input, Button, FileUpload, etc.
├── hooks/                 # useSession, useFileUpload, useMatch
├── lib/                   # API client, utilities, export functions
├── types/                 # TypeScript type definitions
└── __tests__/             # Jest tests
```

## Design System

### Colors (Academic Theme)

| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Navy | `#1a365d` |
| Secondary | Slate Blue | `#475569` |
| Accent | Academic Gold | `#b8860b` |
| Background | Off-White | `#fafaf8` |
| Text Primary | Charcoal | `#1e293b` |

### Design Principles

- Minimal, flat UI with no shadows
- Generous whitespace for readability
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance

## API Integration

The frontend expects a backend API with these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/session` | Create matching session |
| POST | `/api/upload` | Upload CV/documents |
| POST | `/api/match` | Start matching process |
| GET | `/api/match/{id}/status` | Get match progress |
| GET | `/api/match/{id}/results` | Get match results |

Set `NEXT_PUBLIC_USE_MOCK=true` to run without a backend using mock data.
