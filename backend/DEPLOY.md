# Deploying the Toollora Video Downloader API

This folder contains the **server API** that powers the Toollora social media
downloader tools (YouTube, Instagram, TikTok, X/Twitter, Facebook).

It is a separate service from the Toollora website (which runs on Vercel).
It must run on a host that supports long-running processes, PostgreSQL and
the `yt-dlp`/`ffmpeg` binaries — **Railway** is the easiest option.

---

## Option 1 — Railway (recommended)

1. Push this repo to GitHub (the whole `Toolora` repo, including `backend/`).
2. Go to https://railway.app and create a new project.
3. Click **Deploy from GitHub repo** → choose your `Toolora` repo.
4. Railway will detect `backend/railway.toml`. Set the service settings:
   - **Root Directory**: `backend`
5. Add a **PostgreSQL** plugin (Variables → New → Database → PostgreSQL).
   Railway exposes it as `DATABASE_PRIVATE_URL` / `DATABASE_URL`.
6. Add the environment variables (see below).
7. Deploy. The service is healthy when `GET https://your-app.up.railway.app/v2/health`
   returns `200` with `yt-dlp`/`ffmpeg` versions and `status: ok`.
8. Create your first API key (needed by the Toollora proxy):

   ```bash
   curl -X POST https://your-app.up.railway.app/v2/admin/keys \
     -H "X-Admin-Token: YOUR_ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name": "toollora-frontend", "rateLimitPerMinute": 120}'
   ```

   Copy the returned `key` (starts with `vz_…`). It is shown only once.

### Environment variables (Railway → Service → Variables)

| Variable | Example | Required | Notes |
|----------|---------|----------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/railway` | ✅ | Postgres plugin connection string |
| `NODE_ENV` | `production` | ✅ | Set by Dockerfile |
| `FRONTEND_SECRET` | `openssl rand -hex 32` | ✅ | Shared secret; Toollora sends it as `X-Frontend-Key` |
| `ADMIN_TOKEN` | `openssl rand -hex 32` | ✅ | Needed to create API keys |
| `ALLOWED_ORIGINS` | `https://www.toollora.online` | optional | Leave empty for public access |
| `STORAGE_DRIVER` | `local` | default | Use `r2` for Cloudflare R2 storage |
| `YTDLP_JS_RUNTIME` | `deno` | optional | Some YouTube ages need a JS runtime |

> **Tip:** For a private service without an API key sent to every browser,
> Toollora's own server-side proxy forwards requests using
> `X-Frontend-Key: <FRONTEND_SECRET>` — you do **not** expose `FRONTEND_SECRET`
> in the browser.

---

## Option 2 — Docker (any VPS / Render / Fly.io)

```bash
cd backend
docker build -t toollora-downloader .
docker run -d -p 3001:3001 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/downloader \
  -e FRONTEND_SECRET=$(openssl rand -hex 32) \
  -e ADMIN_TOKEN=$(openssl rand -hex 32) \
  toollora-downloader
```

On Render (manual service): create a **Docker** web service, set **Root
Directory** to `backend`, and add the same env vars.

---

## Connecting Toollora to the API

Add these environment variables to your **Vercel** project for the Toollora
website:

| Variable | Example | Notes |
|----------|---------|-------|
| `DOWNLOADER_API_URL` | `https://your-app.up.railway.app` | Public URL of the API (no trailing slash) |
| `DOWNLOADER_FRONTEND_SECRET` | the same secret as above | Sent as `X-Frontend-Key` to the API |
| `DOWNLOADER_API_KEY` | `vz_…` | Optional; sent as `X-API-Key` instead of the frontend secret |

The Toollora website calls its own `/api/downloader/*` routes, which proxy to
the API server-side — the frontend secret / API key never reaches the browser.

After deploying, the downloader tools at
`/en/tools/social/…` will start working. Until `DOWNLOADER_API_URL` is set,
the tools show a friendly "service not configured" notice.