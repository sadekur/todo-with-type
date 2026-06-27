# todo-with-type

## Commands

```bash
npm start       # dev server at localhost:3000
npm test        # Jest watch mode (via react-scripts)
npm run build   # production build to build/
```

- `npm test` launches Jest in interactive watch mode by default. Press `a` to run all tests, `q` to quit.
- There is no separate `lint` or `typecheck` script. `react-scripts` bundles ESLint (react-app config) and TypeScript checking into its dev server and build pipeline.

## Stack

- **React 19** + **TypeScript 4.9.5** bootstrapped via **Create React App** (`react-scripts 5.0.1`)
- **Testing**: Jest + `@testing-library/react` (pre-configured via CRA). `src/setupTests.ts` imports `@testing-library/jest-dom`.
- **No Redux yet** — the repo name anticipates it, but no store or reducers exist.

## Structure

- Entrypoint: `src/index.tsx` → renders `<App />` from `src/App.tsx`
- `tsconfig.json`: `strict: true`, `jsx: "react-jsx"`, target `es5`, `noEmit: true` (TypeScript is for type-checking only, Babel compiles)
- ESLint config is inline in `package.json` (extends `react-app` + `react-app/jest`)
- Build output (gitignored): `/build`
- Coverage output (gitignored): `/coverage`

## Gotchas

- Do not add a separate TypeScript compilation step. CRA uses Babel for transpilation; `tsc` is type-check only (`noEmit: true`).
- `react-scripts test` overrides Jest config. Do not add a separate `jest.config.js` without ejecting or using `react-app-rewired`.
- `.env.local` files are gitignored by default.
- React 19 is installed — check compatibility before adding libraries that pinned to React 18.
