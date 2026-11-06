# Various Degrees: Remnants of a Future!

The one-page site for *Remnants of a Future*, the debut publication from Various Degrees: an art publication exploring lost futures, new dreams, and the traces they leave in between.

## Structure

One section per screen (CSS scroll snapping) over a fixed background photo:

1. **Hero** with the VHS glitch effect (runs only while the hero is in view)
2. **Launch**: event details (venue links to Google Maps) and RSVP via Luma
3. **About**
4. **Contributors**: each name opens an accessible bio panel (data in `client/src/data/contributors.ts`)
5. **Order**
6. **Footer**

Design tokens (colours, type scale) live in `tailwind.config.ts`; shared links in `client/src/lib/links.ts`.

## Contact

For inquiries: v.degrees@proton.me

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to GitHub Pages

This project includes automatic deployment to GitHub Pages via GitHub Actions.

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express.js (for local development)

---

© 2024 Various Degrees. All rights reserved.
