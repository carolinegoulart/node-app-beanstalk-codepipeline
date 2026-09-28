# CodePipeline test app

Small Node.js app for exercising AWS CodePipeline: green “Hello, World!” page, `/health`, and unit tests in the build.

## Suggested design

| Piece | Role |
|-------|------|
| `src/greeting.js` | Pure logic for greetings (easy to unit test) |
| `src/health.js` | Pure logic for the `/health` JSON body |
| `src/app.js` | Express routes (thin wrappers) |
| `test/*.test.js` | Three unit tests via Node’s built-in `node:test` |

Extra route `GET /api/greeting?name=You` returns JSON `{ "message": "Hello, You!" }` so the greeting logic is used at runtime, not only in tests.

## Local run

```bash
cp .env.example .env   # optional; repo includes defaults in .env.example
npm ci
npm test
npm start
```

Variables are loaded from `.env` at startup (`dotenv`). Example:

```env
environment=development
PORT=3000
```

`.env` is gitignored; copy from `.env.example` or create your own. In AWS, set the same keys on the runtime (Beanstalk, ECS, etc.) — do not rely on committing `.env`.

- http://localhost:3000 — home page (shows `environment` env var, default `development`)  
- http://localhost:3000/health — health check  
- http://localhost:3000/api/greeting?name=Pipeline  

## CodePipeline

1. **Source** — This repo.  
2. **Build** — CodeBuild runs `npm ci` and `npm test` (`buildspec.yml`).  
3. **Deploy** — **Elastic Beanstalk**, **ECS**, **CodeDeploy/EC2**, etc. Static S3 hosting is not enough for a Node server.

## Files

| File | Purpose |
|------|---------|
| `buildspec.yml` | Install deps, run tests, publish deploy artifact |
| `src/server.js` | HTTP entrypoint |
| `public/index.html` | Front page |
