# HowMuchPer

HowMuchPer is built with Angular 22. [GitHub Pages site](https://proudwax.github.io/hmp/)

## Getting started

Use Node.js 24.15.0 or a newer 24.x release to match the GitHub Actions workflow. Install dependencies from the lockfile.

```sh
npm ci
```

## Development server

Run `npm start` and open [http://localhost:4200/hmp/](http://localhost:4200/hmp/). The app reloads when source files change.

## Code scaffolding

Run `npm run ng -- generate component component-name` to generate a new component. Use `npm run ng -- help` for other Angular CLI commands.

## Build

Run `npm run build` to create a production build in `dist/how-much-per/`. The build uses `/hmp/` as its base path.

## Deploying to GitHub Pages

The [deployment workflow](.github/workflows/deploy.yml) runs on every push to `main`. It builds the app, copies `index.html` to `404.html` as a fallback, and pushes the entire `dist/how-much-per/` directory to `gh-pages`.
