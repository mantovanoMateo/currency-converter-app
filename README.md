**Idioma | Language | Idioma**: [Espanol](./README.es.md) | English | [Portugues](./README.pt.md)

---

# Currency Exchange

> Convert between currencies instantly.

A modern, responsive currency converter focused on Latin American and international currencies. Built with Next.js, TypeScript, and Tailwind CSS.

## Supported Currencies

| Code | Currency          | Flag |
|------|-------------------|------|
| ARS  | Argentine Peso    | 🇦🇷   |
| MXN  | Mexican Peso      | 🇲🇽   |
| BRL  | Brazilian Real    | 🇧🇷   |
| COP  | Colombian Peso    | 🇨🇴   |
| CLP  | Chilean Peso      | 🇨🇱   |
| PEN  | Peruvian Sol      | 🇵🇪   |
| UYU  | Uruguayan Peso    | 🇺🇾   |
| EUR  | Euro              | 🇪🇺   |
| GBP  | British Pound     | 🇬🇧   |
| USD  | US Dollar         | 🇺🇸   |

## Features

- **Bidirectional conversion** - Convert from local currency to USD and vice versa
- **Real-time rates** - Fetches live exchange rates from exchangerate-api.com
- **Multilingual** - Full support for Spanish, English, and Portuguese
- **Dark theme** - Modern dark UI with teal/cyan accents
- **Responsive** - Optimized for both desktop and mobile
- **Quick amounts** - Preset buttons (100, 500, 1000, 5000) for fast input
- **Fallback rates** - Works offline with approximate rates if the API is unavailable
- **Rate caching** - 10-minute cache to minimize API calls

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Radix UI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd currency-converter-app

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page (client component)
│   ├── globals.css               # Global styles & theme variables
│   └── api/
│       └── exchange-rate/
│           └── route.ts          # Exchange rate API endpoint
├── components/
│   ├── hero-header.tsx           # Header with title & language switcher
│   ├── currency-selector.tsx     # Currency button selector
│   ├── swap-button.tsx           # Toggle conversion direction
│   ├── price-input.tsx           # Amount input with quick amounts
│   ├── conversion-result.tsx     # Conversion result display
│   ├── language-switcher.tsx     # Language toggle (ES/EN/PT)
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── i18n.ts                   # Translation strings
│   └── utils.ts                  # Utility functions
└── hooks/
    ├── use-mobile.tsx            # Mobile detection hook
    └── use-toast.ts              # Toast notification hook
```

## How It Works

1. The user selects a currency and enters an amount
2. The app calls `/api/exchange-rate?currency=<CODE>` to fetch the current rate
3. The API checks an in-memory cache (valid for 10 minutes) before calling the external service
4. If the external API fails, hardcoded fallback rates are used
5. The conversion is calculated and displayed in real time

## License

This project is licensed under the [MIT License](./LICENSE).
