# English by Talento Impulsa

English learning web app built with React + Vite.
Ready to deploy on Netlify.

---

## Getting started locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Netlify

1. Push this folder to a GitHub repository
2. In Netlify → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site" — done!

Every time you push changes, Netlify redeploys automatically.

---

## Adding vocabulary words

Each category has its own JSON file in `src/data/vocabulary/`.

To add words to an existing category, open the file (e.g. `health.json`) and add a new object following this structure:

```json
{
  "id": "health_026",
  "word": "clinic",
  "ipa": "/ˈklɪn.ɪk/",
  "translation": "clínica",
  "definition_en": "A small hospital or a place where people go for medical treatment",
  "example": "I have an appointment at the clinic tomorrow.",
  "level": "A2",
  "category": "health",
  "type": "noun"
}
```

**Rules:**
- `id` must be unique: use `categoryname_NNN` format
- `level` must be one of: `A1` `A2` `B1` `B2` `C1` `C2`
- `type` must be one of: `noun` `verb` `adjective` `adverb` `expression`
- `ipa` and `audio` are optional

## Adding a new vocabulary category

1. Create `src/data/vocabulary/my-category.json` with an array of words
2. Add the category metadata to `src/data/categories.js`:

```js
{ id: 'my-category', label: 'My Category', emoji: '🔥', desc: 'Short description' },
```

The app will find it automatically — no other code changes needed.

---

© 2025 Talento Impulsa Consulting · All rights reserved
