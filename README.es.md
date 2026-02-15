**Idioma | Language | Idioma**: Espanol | [English](./README.md) | [Portugues](./README.pt.md)

---

# Cambio de Divisas

> Convierte al instante entre monedas.

Un conversor de divisas moderno y responsivo, enfocado en monedas latinoamericanas e internacionales. Construido con Next.js, TypeScript y Tailwind CSS.

## Monedas Soportadas

| Codigo | Moneda            | Bandera |
|--------|-------------------|---------|
| ARS    | Peso Argentino    | 🇦🇷      |
| MXN    | Peso Mexicano     | 🇲🇽      |
| BRL    | Real Brasileno    | 🇧🇷      |
| COP    | Peso Colombiano   | 🇨🇴      |
| CLP    | Peso Chileno      | 🇨🇱      |
| PEN    | Sol Peruano       | 🇵🇪      |
| UYU    | Peso Uruguayo     | 🇺🇾      |
| EUR    | Euro              | 🇪🇺      |
| GBP    | Libra Esterlina   | 🇬🇧      |
| USD    | Dolar Estadounidense | 🇺🇸   |

## Caracteristicas

- **Conversion bidireccional** - Convierte de moneda local a USD y viceversa
- **Tasas en tiempo real** - Obtiene tasas de cambio en vivo desde exchangerate-api.com
- **Multilingue** - Soporte completo para espanol, ingles y portugues
- **Tema oscuro** - Interfaz oscura moderna con acentos en verde azulado
- **Responsivo** - Optimizado para escritorio y dispositivos moviles
- **Montos rapidos** - Botones preestablecidos (100, 500, 1000, 5000) para entrada rapida
- **Tasas de respaldo** - Funciona sin conexion con tasas aproximadas si la API no esta disponible
- **Cache de tasas** - Cache de 10 minutos para minimizar llamadas a la API

## Stack Tecnologico

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/) + Radix UI
- **Iconos**: Lucide React

## Primeros Pasos

### Requisitos Previos

- Node.js 18+
- pnpm (recomendado), npm o yarn

### Instalacion

```bash
# Clonar el repositorio
git clone <repo-url>
cd currency-converter-app

# Instalar dependencias
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de Produccion

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Estructura del Proyecto

```
├── app/
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Pagina principal (componente cliente)
│   ├── globals.css               # Estilos globales y variables de tema
│   └── api/
│       └── exchange-rate/
│           └── route.ts          # Endpoint de la API de tasas de cambio
├── components/
│   ├── hero-header.tsx           # Encabezado con titulo y selector de idioma
│   ├── currency-selector.tsx     # Selector de moneda con botones
│   ├── swap-button.tsx           # Boton para invertir la conversion
│   ├── price-input.tsx           # Entrada de monto con montos rapidos
│   ├── conversion-result.tsx     # Resultado de la conversion
│   ├── language-switcher.tsx     # Selector de idioma (ES/EN/PT)
│   └── ui/                       # Componentes shadcn/ui
├── lib/
│   ├── i18n.ts                   # Cadenas de traduccion
│   └── utils.ts                  # Funciones utilitarias
└── hooks/
    ├── use-mobile.tsx            # Hook de deteccion de dispositivo movil
    └── use-toast.ts              # Hook de notificaciones toast
```

## Como Funciona

1. El usuario selecciona una moneda e ingresa un monto
2. La app llama a `/api/exchange-rate?currency=<CODIGO>` para obtener la tasa actual
3. La API verifica un cache en memoria (valido por 10 minutos) antes de llamar al servicio externo
4. Si la API externa falla, se usan tasas de respaldo predefinidas
5. La conversion se calcula y muestra en tiempo real

## Licencia

Este proyecto esta licenciado bajo la [Licencia MIT](./LICENSE).
