# JauJau Day — Listening Journal (public website)

This is the **PUBLIC** website for https://giautpham.github.io/JauJau-Day/.

## Features

- Blog archive with individual article pages, **Quay đầu** back control, and next-post navigation.
- Vinyl record player with play/pause, previous/next, progress/seek bar, volume/mute, and moving vinyl.
- **Each post has its own cover image and its own MP3**; both change with the chosen post.
- Attempt to autoplay the selected post's music; browsers may require a click on Play first.
- Responsive desktop/mobile layout and dark mode.
- Three initial articles adapted from the supplied PDF; original sample cover designs and original demo audio.
- **No public publishing button or author editor.** Everyone can read, but only the GitHub repository owner can commit changes.

## Installation on your existing GitHub Pages site

1. Extract `JauJau-Day-public-site.zip`.
2. Open https://github.com/giautpham/JauJau-Day.
3. Click **Add file → Upload files** while at the top level of the repository.
4. Upload the **contents** of this ZIP (not the ZIP itself): `index.html`, `app.js`, `styles.css`, `data/`, `assets/`, `.nojekyll` and `README.md`.
5. Make sure `index.html` is in the repository's root, **not** inside `JauJauDay/`.
6. Commit changes and go to **Settings → Pages → Deploy from a branch → main → /(root)**.
7. Reload https://giautpham.github.io/JauJau-Day/ once the deployment finishes.

The old `JauJauDay/` folder can remain in the repo temporarily, but your homepage must be the new `index.html` at the root (the earlier index was only a redirect).

## Publish new posts or change covers/music (author only)

Use the **separate** `JauJau-Day-owner-editor.zip` bundle. Extract it on your own computer and open `owner-editor.html` locally. It lets you:

1. Choose an existing post (or create a new one).
2. Pick a local cover image and a local MP3 file.
3. Edit the title/text if needed.
4. Download a small update ZIP with an updated `data/posts.js`, and any new `assets/covers/` and `assets/music/` files.
5. Extract the update ZIP, upload its `data/` and `assets/` folders at the **top level** of the repository, and commit.

The owner's editor is deliberately **not hosted online** and is not present in this public website ZIP. Do not upload it to a public GitHub repository. An unprotected "secret" HTML admin link would not be real security on GitHub Pages.

After any update, your `data/posts.js` in GitHub is the authoritative/latest version. For later changes, download that file and use **Import your latest posts.js** in the local editor before preparing another update.

### Direct editing alternative

You can edit `data/posts.js` using GitHub's pencil button. For each post edit the `cover: "assets/covers/filename.jpg"` and/or `audio: "assets/music/filename.mp3"` fields and upload the matching image and MP3 into those two folders. Names must match exactly.

## Limitations

- GitHub Pages cannot reliably autoplay unmuted audio without a user gesture due to browser policies.
- The view numbers in this starter are presentation-only, not live analytics.
- GitHub browser uploads have a 25 MiB limit per file; use MP3s smaller than that or a different storage workflow.
- Only upload cover images and music you own or have permission to distribute. On a public GitHub Pages site, media URLs are accessible by anyone.
