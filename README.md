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

## Running unit tests

Run `npm test -- --watch=false` to run the unit tests once with Vitest.

## Deploying to GitHub Pages

The [deployment workflow](.github/workflows/deploy.yml) runs on every push to `main`. It builds the app, copies `index.html` to `404.html` as a fallback, and pushes the entire `dist/how-much-per/` directory to `gh-pages`.

Configure the repository once.

1. In **Settings → Pages**, select **Deploy from a branch**, then choose **gh-pages** and **/(root)**.
2. Add the public half of a dedicated SSH key pair in **Settings → Deploy keys** and enable **Allow write access**.
3. Save the private half as an Actions secret named `ACTIONS_DEPLOY_KEY` in **Settings → Secrets and variables → Actions**.

After pushing to `main`, check the **Deploy to GitHub Pages** run in the repository's **Actions** tab.
