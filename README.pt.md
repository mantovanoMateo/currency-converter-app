**Idioma | Language | Idioma**: [Espanol](./README.es.md) | [English](./README.md) | Portugues

---

# Cambio de Moedas

> Converta entre moedas instantaneamente.

Um conversor de moedas moderno e responsivo, focado em moedas latino-americanas e internacionais. Construido com Next.js, TypeScript e Tailwind CSS.

## Moedas Suportadas

| Codigo | Moeda                | Bandeira |
|--------|----------------------|----------|
| ARS    | Peso Argentino       | 🇦🇷       |
| MXN    | Peso Mexicano        | 🇲🇽       |
| BRL    | Real Brasileiro      | 🇧🇷       |
| COP    | Peso Colombiano      | 🇨🇴       |
| CLP    | Peso Chileno         | 🇨🇱       |
| PEN    | Sol Peruano          | 🇵🇪       |
| UYU    | Peso Uruguaio        | 🇺🇾       |
| EUR    | Euro                 | 🇪🇺       |
| GBP    | Libra Esterlina      | 🇬🇧       |
| USD    | Dolar Americano      | 🇺🇸       |

## Funcionalidades

- **Conversao bidirecional** - Converta de moeda local para USD e vice-versa
- **Taxas em tempo real** - Obtem taxas de cambio ao vivo de exchangerate-api.com
- **Multilingue** - Suporte completo para espanhol, ingles e portugues
- **Tema escuro** - Interface escura moderna com tons de verde-azulado
- **Responsivo** - Otimizado para desktop e dispositivos moveis
- **Valores rapidos** - Botoes predefinidos (100, 500, 1000, 5000) para entrada rapida
- **Taxas de fallback** - Funciona offline com taxas aproximadas caso a API esteja indisponivel
- **Cache de taxas** - Cache de 10 minutos para minimizar chamadas a API

## Stack Tecnologico

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Linguagem**: TypeScript
- **Estilizacao**: Tailwind CSS
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/) + Radix UI
- **Icones**: Lucide React

## Primeiros Passos

### Pre-requisitos

- Node.js 18+
- pnpm (recomendado), npm ou yarn

### Instalacao

```bash
# Clonar o repositorio
git clone <repo-url>
cd currency-converter-app

# Instalar dependencias
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Producao

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Pagina principal (componente cliente)
│   ├── globals.css               # Estilos globais e variaveis de tema
│   └── api/
│       └── exchange-rate/
│           └── route.ts          # Endpoint da API de taxas de cambio
├── components/
│   ├── hero-header.tsx           # Cabecalho com titulo e seletor de idioma
│   ├── currency-selector.tsx     # Seletor de moeda com botoes
│   ├── swap-button.tsx           # Botao para inverter a conversao
│   ├── price-input.tsx           # Entrada de valor com valores rapidos
│   ├── conversion-result.tsx     # Resultado da conversao
│   ├── language-switcher.tsx     # Seletor de idioma (ES/EN/PT)
│   └── ui/                       # Componentes shadcn/ui
├── lib/
│   ├── i18n.ts                   # Strings de traducao
│   └── utils.ts                  # Funcoes utilitarias
└── hooks/
    ├── use-mobile.tsx            # Hook de deteccao de dispositivo movel
    └── use-toast.ts              # Hook de notificacoes toast
```

## Como Funciona

1. O usuario seleciona uma moeda e insere um valor
2. O app chama `/api/exchange-rate?currency=<CODIGO>` para obter a taxa atual
3. A API verifica um cache em memoria (valido por 10 minutos) antes de chamar o servico externo
4. Se a API externa falhar, taxas de fallback predefinidas sao utilizadas
5. A conversao e calculada e exibida em tempo real

## Licenca

Este projeto esta licenciado sob a [Licenca MIT](./LICENSE).
