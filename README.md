# NetCentric Computing — Assignments 1 & 2

**Bridget Moses Chukwu**
Matric: AK22/PHS/CSC/016
Email: bridgetchukwu3@gmail.com

---

## What was asked, and where it is

| # | Requirement | Where |
|---|---|---|
| 1 | A website of 5 pages | `index`, `about`, `services`, `projects`, `contact` |
| 2 | A retail store site (HTML, CSS, some JS) | `store/index.html` — *Margin Notes* bookshop |
| 3 | Both hosted on a free domain | GitHub Pages |
| 4 | A button to navigate between them | The red button in the navigation bar of every page |
| 5 | Domain resembles name + reg number | e.g. `bridgetchukwu-016.github.io` |
| 6 | Comment box on the landing page | Bottom of `index.html`, sends to my email |

---

## The files

```
index.html       Home page. Has the comment box.
about.html
services.html
projects.html
contact.html
style.css        One stylesheet, shared by everything.

store/
  index.html     The bookshop. The six books are written into this file.
  store.css      Only the styles the bookshop needs.
  store.js       The shopping basket.
```

---

## Setting up the comment box — do this first

The form will not deliver anything until this is done.

1. Go to **formspree.io** and make a free account using **bridgetchukwu3@gmail.com**.
2. Create a new form. Formspree gives you an address that looks like
   `https://formspree.io/f/abcdwxyz`.
3. Open `index.html` in Notepad. Find `YOUR_FORM_ID` and replace the whole
   address with the one Formspree gave you. Save.
4. Do exactly the same in `contact.html`.
5. **Test it.** Open the page, send yourself a comment, and check the inbox.
   Formspree will ask you to confirm your email the first time.

If you skip this, the button will still look like it works. Nothing will arrive.

---

## Putting it online

1. Make a GitHub account. Choose a username close to your name and matric
   number — for example **`bridgetchukwu-016`**. This becomes your web address.
2. Create a new **public** repository named `bridgetchukwu-016.github.io`
   (it must match your username exactly, then `.github.io`).
3. Upload all the files. Drag the `store` folder in as a folder, so it stays
   a folder.
4. Go to **Settings → Pages**. Set the source to the `main` branch, root folder.
   Save.
5. After a minute the site is live at `https://bridgetchukwu-016.github.io`

---

## Notes for defending this work

**Why is there no framework?**
Because I could not explain code I did not write. Everything here is HTML, CSS
and JavaScript, typed in Notepad.

**How do the five pages share one design?**
Every page has one line in its `<head>` linking to `style.css`. Change a colour
in that one file and all five pages change together.

**Where does the shopping basket keep its information?**
In a single list in `store.js` called `cart`. That list is the only truth. The
page never reads numbers back off the screen — instead, every time the list
changes, the basket area is wiped and drawn again from the list.
So the screen is always just a picture of the list.

**Why is that better than reading the screen?**
Because the screen and the real total can drift apart and disagree. If there is
only one list, there is nothing to disagree with.

**How does the button switch between the two sites?**
It is an ordinary link. On the portfolio it points to `store/index.html`.
In the bookshop it points to `../index.html` — the `..` means "go up one folder".

**Why does the comment box need Formspree?**
A form on its own does not send anything anywhere. It needs an address to post
to. Formspree provides that address and forwards the message to my inbox.
The website is just static files, so it cannot send an email by itself.

**What are the colours?**
Ink navy `#1d2b3a` for text. Paper `#faf7f2` for the background. Deep red
`#a4243b` as the one accent colour. They are listed at the top of `style.css`.
