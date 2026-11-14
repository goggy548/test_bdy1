# Happy Birthday, Kochu 💗

A mobile-first, static birthday surprise website made with HTML, CSS and vanilla JavaScript. It is ready for GitHub Pages.

## Included
- Animated loading screen and clickable gift-box opening
- Background MP3 that starts after the first click, with an on/off control
- Countdown to 3 January 2027 (visitor's local time)
- Birthday greeting and long romantic letter
- Thirty empty Polaroid-style photo placeholders
- A full-page blank section reserved for your love story
- Gift reveal, secret note, confetti and heart effects
- Birthday cake sequence: make a wish, blow candles, cut cake, final card
- Responsive mobile and desktop layouts
- Reduced-motion support

## Preview locally
Open `index.html` in a browser. For the most reliable local preview, run a simple static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload **all files and folders** in this project (keep `assets/birthday-music.mp3` in the `assets` folder).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site. Open the URL shown in the Pages settings.

No build step, framework, server, or package installation is required.

## Add your 30 photos later
The current gallery is intentionally empty. When you are ready, place your images in a folder such as `photos/`, then replace the generated empty `.photo-slot` elements in `index.html` with image elements, for example:

```html
<div class="photo-slot">
  <img src="photos/photo-01.jpg" alt="A favourite memory">
</div>
```

For best results, use reasonably compressed JPG or WebP images. Keep filenames simple and use relative paths.

## Add your love story later
The `#story` section in `index.html` is intentionally reserved as a full page. Replace the placeholder content inside `.story-inner` with your story, dates, paragraphs, or milestones.

## Replace the letter or secret messages
Edit the text inside `.letter-copy`, `#giftMessage`, `#secretMessage`, and `.final-message` in `index.html`.

## Replace the music
Your supplied track is copied to `assets/birthday-music.mp3`. To use a different MP3 later, replace that file while keeping the same filename, or update the `<source>` path in `index.html`.

**Publishing note:** Make sure you have the necessary rights or permission to make the chosen music publicly available on a public GitHub Pages website.

## Change the birthday date
The countdown date is set in `script.js`:

```js
const birthday = new Date(2027, 0, 3, 0, 0, 0);
```

JavaScript months are zero-based, so January is `0`.

## Notes
- The countdown uses the visitor's device local time.
- Browsers generally require a user interaction before audio can play; the gift-box click is the music-start interaction.
- The microphone is not used. Candle blowing is controlled by the requested button.
- The page uses Google Fonts when internet access is available and falls back to system fonts if not.
