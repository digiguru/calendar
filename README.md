# Resource Calendar

Resource Calendar is a small planning workspace for exploring how project load, team shape and decision criteria affect delivery.

The application now brings three related tools into one responsive interface:

- **Calendar** — view project delivery windows and current people/capacity allocation, and add lightweight project records.
- **Team Slider** — model team count, team size, efficiency and cost interactively.
- **Heatmap** — compare options across shared criteria using accessible numeric scores and semantic status styling.

## Stack

- Node.js 24
- React 19
- React Router 7
- Vite 8
- Base UI primitives for accessible interactive components
- Vitest
- ESLint 10

The interface is intentionally composed from low-level primitives rather than adopting the visual identity of a monolithic component framework. Design tokens and application-specific CSS provide the visual system while Base UI provides accessible behaviour for components such as dialogs and sliders.

## Development

```bash
npm ci
npm run dev
```

Vite will print the local development URL.

## Validation

Run the same quality checks expected by CI:

```bash
npm run check
```

Or run them individually:

```bash
npm run lint
npm test
npm run build
npm audit --omit=dev --audit-level=high
```

CI uses Node 24 and blocks high/critical production dependency advisories.

## Data

The current application remains deliberately local-first. Existing sample project and team data are used as defaults and project additions are stored in browser `localStorage`.

The calculation modules under `src/logic` remain covered by the existing test suite. The UI rebuild does not rewrite those domain calculations merely for stylistic reasons.

## Legacy UI

Legacy PR #23 explored a Material UI-based navigation, slider and heatmap concept. Its product ideas informed this rebuild, but its React 16 / Material UI v4 implementation is not used.

See issue #201 for the modernization brief.
