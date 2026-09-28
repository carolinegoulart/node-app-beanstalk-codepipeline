# CodePipeline test app

Minimal static site (green background, “Hello, World!”) for exercising AWS CodePipeline.

## Local preview

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## CodePipeline setup (typical)

1. **Source** — Connect this repo (CodeCommit, GitHub, etc.).
2. **Build** — AWS CodeBuild project using `buildspec.yml` in the repo root.
3. **Deploy** — Common options:
   - **S3** — Deploy action copies build artifacts to a bucket with static website hosting enabled.
   - **CodeDeploy** — Only if you add an appspec and host configuration (not included here).

### S3 deploy notes

- Enable static website hosting on the bucket (index document: `index.html`).
- Point the deploy action at the CodeBuild artifact; it should contain `index.html` at the artifact root.
- Optional: CloudFront in front of the bucket for HTTPS.

## Files

| File           | Purpose                          |
|----------------|----------------------------------|
| `index.html`   | The app                          |
| `buildspec.yml`| CodeBuild spec for the pipeline  |
