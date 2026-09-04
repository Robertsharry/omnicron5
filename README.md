# Bureau of Improbable Incidents

A React + TypeScript interactive fiction game for emergency boredom containment.

Run the game:

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:5173](http://127.0.0.1:5173).

Accept a case and make five professionally questionable decisions. Number keys `1`–`3` work, and there may be one button you have specifically been told not to press.

## Project structure

- `src/app` — application composition and top-level state coordination
- `src/features` — game features, UI, typed data, and domain logic
- `src/components` — reusable application chrome
- `src/hooks` — browser behavior such as sound and the clock
- `src/shared` — ambient and overlay UI
- `src/utils` — focused browser utilities

## Commands

- `npm run dev` — start the Vite development server
- `npm run build` — typecheck and create a production build
- `npm test` — run the game engine tests
- `npm run preview` — preview the production build
