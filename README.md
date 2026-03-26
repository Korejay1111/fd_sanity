# GMJ Podcast — Sanity CMS Integration

## What Was Done
- `podcast.html` now fetches episodes **live from Sanity** (no more localStorage)
- `admin.html` is now a **CMS hub** that links to Sanity Studio
- `sanity-studio/` folder contains the Sanity Studio app with a custom **episode schema**

---

## Quick Setup (5 steps)

### 1. Create a Sanity project
Go to https://sanity.io → sign up free → New Project → Blank template → name it "GMJ Podcast".
Copy your **Project ID** from the dashboard.

### 2. Install Node.js
Download from https://nodejs.org (LTS version).

### 3. Install the Studio
```bash
cd sanity-studio
npm install
```

### 4. Update your Project ID in TWO places

**sanity-studio/sanity.config.js** — line 14:
```js
projectId: 'YOUR_PROJECT_ID',   // ← replace with your real ID
```

**podcast.html** — find this line near the top of the `<script>` block:
```js
const SANITY_PROJECT_ID = 'YOUR_PROJECT_ID';   // ← replace with your real ID
```

### 5. Enable CORS
Go to https://sanity.io/manage → your project → API → CORS Origins.
Add:
- Your live website URL (e.g. `https://gmjpodcast.com`)
- `http://localhost` (for local testing)

### 6. Deploy the Studio
```bash
cd sanity-studio
npx sanity deploy
```
Choose a name like `gmj-podcast`. Your Studio will be live at `gmj-podcast.sanity.studio`.

---

## Adding Episodes (Admin Workflow)

1. Open your Studio URL (e.g. `gmj-podcast.sanity.studio`)
2. Click **"🎙️ All Episodes"** → **"+ Create"**
3. Fill in:
   - **Title** — episode name
   - **Episode Number** — e.g. 27
   - **Series** — e.g. "Faith Series"
   - **Category** — Teaching / Worship / Testimony / Counselling / Prayer
   - **Description** — short summary (max 300 chars)
   - **Audio File** — upload your MP3 directly
   - **Duration** — e.g. "42 min"
   - **Published Date** — controls sort order
   - **Feature this episode** ✓ — makes it the hero card on the podcast page
4. Click **Publish** → episode is **instantly live** on `podcast.html`

---

## File Structure

```
fd/
├── index.html          — Home page (unchanged)
├── about.html          — About page (unchanged)
├── podcast.html        — ✅ Updated: fetches from Sanity
├── admin.html          — ✅ Updated: CMS hub + setup guide
├── Gmj_logo.jpg        — Logo
└── sanity-studio/      — ✅ NEW: Sanity Studio app
    ├── sanity.config.js    — Studio config (add your Project ID here)
    ├── package.json        — Dependencies
    └── schemas/
        ├── index.js        — Schema registry
        └── episode.js      — Episode document type
```

---

## How It Works Technically

`podcast.html` uses a **GROQ query** to the Sanity CDN API:

```
https://YOUR_PROJECT_ID.apicdn.sanity.io/v2024-01-01/data/query/production
```

Query:
```groq
*[_type == "episode"] | order(publishedAt desc) {
  _id, title, "num": episodeNumber, series,
  "cat": category, "desc": description, duration,
  publishedAt, featured,
  "src": audioFile.asset->url
}
```

- No API key needed (public read access)
- Audio files are hosted by Sanity's CDN
- Episodes update in real time — no rebuild required
