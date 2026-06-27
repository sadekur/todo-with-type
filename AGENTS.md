# todo-with-type

## Commands

```bash
npm start                       # dev server at localhost:3000
npm test                        # Jest watch mode (press `a` for all, `q` to quit)
npm run build                   # production build to build/
npx tsc --noEmit                # standalone type-checking (not in npm scripts)
```

## Stack

- **React 19** + **TypeScript 4.9.5** bootstrapped via **Create React App** (`react-scripts 5.0.1`)
- **Testing**: Jest + `@testing-library/react` (13 tests across 5 suites). `src/setupTests.ts` imports `@testing-library/jest-dom` and mocks `window.matchMedia`.
- **Tailwind CSS v3** via PostCSS plugin (content paths in `tailwind.config.js`, dark mode uses `class` strategy)
- **State management**: React Context + `useReducer` (`src/context/TodoContext.tsx`), no Redux
- **No separate ESLint/typecheck npm scripts** — CRA bundles both in dev server and build pipeline

## Structure

```
src/
  __tests__/App.test.tsx
  context/TodoContext.tsx        ← Provider + reducer (ADD, DELETE, TOGGLE, EDIT, REORDER, etc.)
  hooks/
    useDarkMode.ts               ← localStorage-persisted dark mode toggle
    useKeyboardShortcuts.ts      ← global hotkeys (N, /, ?, Esc)
    useLocalStorage.ts           ← persist todos to localStorage
  types.ts                       ← TodoType, Filter, SortBy, TodoAction, TodoState
  components/
    AddTodo.tsx                  ← form with priority, due date, category fields
    BulkActions.tsx              ← bulk select/deselect, mark done, delete
    Dashboard.tsx                ← progress bar + priority breakdown
    DarkModeToggle.tsx           ← sun/moon toggle
    ExportImport.tsx             ← JSON export/import via file download/upload
    FilterBar.tsx                ← All / Active / Completed
    HelpModal.tsx                ← keyboard shortcuts reference
    SearchBar.tsx                ← text search
    ShortcutHint.tsx             ← inline hotkey hints
    SortSelector.tsx             ← sort by date / title / priority
    Stats.tsx                    ← total/active/completed counts + clear completed button
    Toast.tsx                    ← undo delete notification (5s timeout)
    Todo.tsx                     ← single item: toggle, inline edit, priority color, delete, drag handle
    Todos.tsx                    ← filtered/sorted list with HTML5 drag-and-drop reorder
  __tests__/                     ← per-component tests
```

## Key Facts

- `index.css` (with `@tailwind` directives) must be imported in `src/index.tsx` — otherwise Tailwind won't generate classes
- `tsconfig.json`: `strict: true`, `jsx: "react-jsx"`, `noEmit: true` (Babel transpiles, tsc only checks)
- `forceConsistentCasingInFileNames: true` — import paths must match filename casing exactly
- Shared types live in `src/types.ts` — always import from there instead of redefining
- Dark mode toggles the `dark` class on `<html>` — Tailwind's `dark:` variants work via `darkMode: 'class'`
- Drag-and-drop reorder only activates when sort is set to "Newest" (createdAt)
- `useLocalStorage` must be called inside `TodoProvider` (it uses `useTodo` internally)

## Testing

- Test files go in `src/**/__tests__/*.test.{ts,tsx}` or `src/**/*.{spec,test}.{ts,tsx}`
- Run focused test: `npm test -- --watchAll=false --testPathPattern="ComponentName"`
- `window.matchMedia` mock is in `src/setupTests.ts` — required for any test rendering `DarkModeToggle`
- `beforeEach(() => localStorage.clear())` is needed in every test suite to avoid cross-test pollution
