# Tự sục văn đoàn — The Listening Journal

A more polished, editorial-style redesign of the original vinyl blog, preserving its familiar controls and post content. **Free GitHub Pages hosting**; no build tools, framework, database, subscription, or API key required.

### What is included?

- Two-column desktop layout with a dark, decorative vinyl player and warm editorial reading area.
- Responsive mobile layout, working post list, back button, "Thả con post" editor link, previous / play-pause / next buttons.
- **Each blog post has its own cover image and MP3 file.** The cover and music switch with the article. Audio autoplay is attempted on opening a post, but may be blocked by browsers (in which case press Play).
- Seeking/scrubbing, elapsed/total audio time, mute control, vinyl rotation while playing, light/dark switch, and keyboard-accessible controls.
- Your three articles from the provided PDF, alongside three replaceable, original artwork files and short original demo tracks.

## Put it on GitHub Pages

1. Extract the ZIP file (don't upload the ZIP itself).
2. Open https://github.com/new, create a **public** repository, e.g. `vinyl-blog`.
3. On your repository page choose **Add file → Upload files**. Upload **all extracted files and folders** so `index.html` is at the root, alongside `styles.css`, `app.js`, `data`, `assets`, `.nojekyll`, and this README. Click **Commit changes**.
4. Open **Settings → Pages**. Set **Source: Deploy from a branch**, **Branch: main**, and **Folder: /(root)**. Click Save.
5. GitHub will give you a link such as `https://YOUR-USERNAME.github.io/vinyl-blog/`.

If your repository already has the old version, **replace** `index.html`, `styles.css`, `app.js`, and `README.md` with this redesign. You can keep your original `data/posts.js`, album covers, and audio if you prefer. (The new template also includes all of those assets.)

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Publish a new blog post

Edit `data/posts.js` in GitHub by clicking the file, then the pencil button. Under `window.BLOG_POSTS = [` add a new object at the beginning:

```js
{
  slug: "new-blog",                       // unique URL name, no spaces
  title: "Một bài blog mới",
  date: "18/11/2026",
  time: "21:30",
  views: "0",                            // DISPLAY ONLY: not a live visitor counter
  subtitle: "Một chút tâm sự",
  cover: "assets/covers/new-cover.jpg",   // upload this image into assets/covers
  audio: "assets/music/new-song.mp3",     // upload this MP3 into assets/music
  body: [
    "Đoạn đầu tiên của bài viết.",
    "Đoạn thứ hai có thể viết **chữ đậm** hoặc *chữ nghiêng*.",
    "Đoạn kết thúc."
  ]
},
```

Upload the image into `assets/covers/` and the MP3 into `assets/music/`. Check exact spelling and capitalization; GitHub Pages is case-sensitive. Commit all changes, and GitHub Pages will redeploy. The post list and player will update automatically.

To customize the blog's heading and description, edit `window.BLOG_CONFIG` at the top of `data/posts.js`. If you use a custom domain, optionally add `editorUrl: "https://github.com/USERNAME/REPO/edit/main/data/posts.js"` to BLOG_CONFIG to make the "Thả con post" button open the right GitHub editor. For GitHub Pages on `github.io`, it is inferred automatically.

## Limitations & rights

- Modern browsers usually block audible autoplay on a first visit. This site attempts playback but does not bypass browser rules.
- The displayed view counts are manual values from `data/posts.js`, not actual page-visit analytics. GitHub Pages is static.
- Don't upload commercial music or copyrighted cover artwork unless you have permission to host and redistribute it. The included audio and abstract cover art are original demos.
- All website files, including music, are public if the GitHub Pages repository is public. Keep private details and passwords out of your repository.

## Test locally

Start a local web server in the extracted folder:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. Or double-click `index.html` for a simple preview.
