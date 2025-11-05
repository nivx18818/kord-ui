---
applyTo: "**"
---

# Styling Guide

This guide outlines comprehensive styling practices for the Kord frontend, ensuring a consistent, accessible, and performant UI inspired by Discord. It leverages Tailwind CSS 4 for utility-first styling, shadcn/ui components, and best practices for responsive design, dark mode, and semantic structure.

## Tailwind CSS with Consistent Color Palette

- **Utility-First Approach**: Use Tailwind's utility classes for rapid prototyping and consistent styling. Avoid custom CSS unless necessary; prefer Tailwind's built-in utilities for spacing, typography, colors, and layout.
- **Color Palette**: Adopt a Discord-inspired palette for cohesion. Define custom colors in `tailwind.config.js` (e.g., via `theme.extend.colors`):
  - Primary: `slate-900` (dark mode: `slate-100`) for backgrounds and text.
  - Accent: `blue-500` (dark mode: `blue-400`) for buttons, links, and highlights.
  - Success: `green-500` for confirmations.
  - Error: `red-500` for alerts.
  - Warning: `yellow-500` for notices.
  - Neutral: `gray-500` for secondary text and borders.
  - Use opacity modifiers (e.g., `bg-blue-500/80`) for subtle variations.
- **Consistency**: Always reference the palette in components. For example, use `text-slate-900 dark:text-slate-100` for primary text. Avoid hardcoded colors; extend the config for theme-specific overrides.
- **Theming**: Integrate with CSS custom properties for dynamic theming (e.g., `--color-primary: theme(colors.slate.900)`).

## Responsive Design Patterns

- **Mobile-First**: Start with mobile layouts using `sm:`, `md:`, `lg:`, `xl:` breakpoints. Common breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`.
- **Grid and Flexbox**: Use `grid` or `flex` for layouts. For example, server sidebar: `flex flex-col w-64` on desktop, `hidden md:flex` on mobile.
- **Responsive Utilities**: Apply conditional classes like `block md:hidden` for mobile-specific elements. Use `aspect-ratio` for media (e.g., `aspect-video` for embeds).
- **Patterns**:
  - Sidebar Navigation: Collapsible on mobile with `transition-transform`.
  - Message Lists: Stack vertically on mobile, horizontal on desktop.
  - Forms: Full-width inputs on mobile, constrained on larger screens.
- **Testing**: Preview with Tailwind's responsive utilities in dev tools; ensure touch-friendly targets (min 44px).

## Dark Mode Support

- **Implementation**: Use Tailwind's `dark:` prefix for automatic dark mode. Enable via `class` strategy in `tailwind.config.js` (e.g., `darkMode: 'class'`), toggled via Zustand store.
- **Color Scheme**: Pair light/dark variants (e.g., `bg-white dark:bg-slate-900`). Use `prefers-color-scheme` for system default.
- **Components**: Ensure all shadcn/ui components support dark mode (e.g., Button with `variant="outline"` adapts). For custom elements, apply `dark:` classes.
- **Best Practices**: Test contrast ratios (WCAG AA: 4.5:1 for text). Use `dark:hover:` for interactive states. Avoid pure black/white; opt for `slate-50` to `slate-950`.
- **Persistence**: Store mode in Zustand and sync with localStorage.

## Container Queries Best Practices

- **Usage**: Leverage `@container` for component-based responsiveness (Tailwind CSS 4 supports via plugins like `tailwindcss-container-queries`). Define containers with `container-type: inline-size`.
- **Patterns**:
  - Message Bubbles: Resize based on parent width (e.g., `@container (min-width: 400px) { .message { flex-direction: row; } }`).
  - Sidebars: Adjust padding/margins within containers.
- **Integration**: Use with Tailwind utilities like `@container/min-w-400:flex-row`. Avoid over-relying on viewport queries; prefer containers for modular design.
- **Fallbacks**: Ensure graceful degradation on unsupported browsers.

## Semantic HTML Structure

- **Accessibility First**: Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) for screen readers and SEO.
- **Structure**:
  - Root: `<div className="min-h-screen bg-slate-50 dark:bg-slate-900">` wrapping the app.
  - Navigation: `<nav>` for server/channel lists.
  - Content: `<main>` for message areas, with `<section>` for threads.
  - Forms: `<form>` with `<fieldset>` for groups, `<label>` for inputs.
- **Tailwind Integration**: Apply classes directly to semantic elements (e.g., `<main className="flex-1 p-4">`).
- **Avoid Div Soup**: Limit non-semantic `<div>`s; use ARIA roles if needed (e.g., `role="banner"` for headers).

## Additional Best Practices

- **Typography**: Use Tailwind's text utilities (`text-sm`, `font-semibold`). For rich content, integrate `tailwindcss-typography` plugin. Ensure line heights (`leading-tight`) for readability.
- **Spacing and Layout**: Follow a scale (e.g., `p-2`, `p-4`, `p-6`). Use `gap-4` in flex/grid for consistency.
- **Animations and Transitions**: Use Framer Motion for complex animations (e.g., modal slides). For simple, use Tailwind's `transition-*` (e.g., `transition-colors duration-200`).
- **Performance**: Purge unused CSS with Tailwind's JIT. Optimize images with Next.js `<Image>`. Avoid heavy custom CSS.
- **Accessibility**: Ensure focus states (`focus:ring-2`), alt text for images, and keyboard navigation. Use `sr-only` for screen readers.
- **Component Styling**: Extend shadcn/ui with custom variants. For example, add `variant="discord"` to Button for branded styles.
- **Tools**: Use Tailwind's IntelliSense in VS Code. Reference `/websites/tailwindcss` for latest docs via `upstash/context7`.
- **Overrides**: For project-specific needs, add to `globals.css` (e.g., `@layer utilities { .custom-shadow { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); } }`).
