# Vite React Tailwind Starter

This is a [Vite](https://vitejs.dev/), [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

- 💡 Instant Server Start
- ⚡️ Lightning Fast HMR
- 🛠️ Rich Features
- 📦 Optimized Build
- 🔩 Universal Plugin Interface
- 🔑 Fully Typed APIs

## Installation

### Clone the template

To clone this template you can use one of the three ways:

### Running The Application

First, install all the dependencies,

```bash
npm i
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![Finished Build](https://i.imgur.com/c9P343j.png)

You can start editing the page by modifying `pages/Home.jsx`. The page auto-updates as you edit the file.

## What's Inside

### Absolute import

You can absolute import by using `@/`

For example

```jsx
import UnstyledLink from '@/components/UnstyledLink';
```

You can also use auto import and it should work automatically.

When you add a new folder in src, add it on the `jsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/pages/*": ["./pages/*"],
      "@/routes/*": ["./routes/*"]
      // add new folder here
    }
  }
}
```

### Inter Fonts

Inter fonts is self hosted. The default weights are `400, 600, 700`. To add more, use fontsquirrel.

### UnstyledLink Component

Used as a component for Next.js Link. Will render out Next/Link if the href started with `/` or `#`, else will render an `a` tag with `target='_blank'`.

### CustomLink Component

An extension of UnstyledLink Component, you can add your default styling for a button/link.

```jsx
<UnstyledLink
  className={`${props.className} inline-flex items-center font-bold hover:text-primary-400`}
  {...props}
/>
```

### Default Favicon Declaration

Use [Favicon Generator](https://www.favicon-generator.org/) and then overwrite the files in `/public/favicon`

### Just-In-Time Tailwindcss

Defaulted to true, you can uncomment the `mode='jit'` in `/tailwind.config.js`

### Default Styles

There are default styles for responsive heading sizes, and `.layout` to support a max-width for larger screen size.
