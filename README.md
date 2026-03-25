# kikyoyoyo.github.io

Personal website (GitHub Pages). Static HTML/CSS.

## Cache busting (CSS updates)

Browsers may cache `styles.css`. After you change the stylesheet, bump the `?v=` query on the `<link rel="stylesheet" href="styles.css?v=…">` line in `index.html` and `blog.html` so returning visitors fetch the new file without a hard refresh.

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages

Repository name `username.github.io` serves the site at `https://username.github.io/`. Push the `main` (or `master`) branch; in the repo **Settings → Pages**, set the source to the default branch and `/` (root).
