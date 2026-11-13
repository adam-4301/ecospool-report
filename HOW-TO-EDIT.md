# How to edit the EcoSpool full-report website

You don't need to install anything. Every change can be made on github.com in your browser.
After you save a change, the live site updates in about 1–2 minutes.

## Adding the report PDF (do this first)

The "Report PDF" button in the menu and the "Download the report (PDF)" button on the home page open `assets/report.pdf`.
Until that file exists, those buttons show a "404" page.

1. In Google Docs, click **File → Download → PDF Document (.pdf)**.
2. Rename the downloaded file to exactly `report.pdf` (all lowercase).
3. On GitHub, open the `assets` folder, click **Add file → Upload files**, drag `report.pdf` in, and click **Commit changes**.

To update it later, upload a new file with the same name. GitHub replaces the old one.

Prefer Google Drive? Share the PDF as "Anyone with the link can view", then in `_config.yml` replace
`report_pdf: "assets/report.pdf"` with `report_pdf: "https://drive.google.com/..."` (your link).

## Editing a page

1. Open the repository on GitHub and click the file you want, e.g. `problem-1.md`.
2. Click the **pencil icon** (top right of the file).
3. Make your changes.
4. Click **Commit changes…**, write a short note such as "Update 3.4 results", then **Commit changes** again.

## Which file is which

| What you see on the site | File to edit |
|---|---|
| Home page question, picture and the "Inside the report" list | `index.md` (the part between the `---` lines) |
| Team names, roles, photos, supervisors | `_data/team.yml` |
| The menu and its dropdowns | `_data/navigation.yml` |
| Title, module, project code, PDF link | `_config.yml` |
| Role designation, AI declaration, acknowledgements | `about.md` |
| 1. Introduction | `introduction.md` |
| 2. Existing Prototype | `prototype.md` |
| 3. Problem 1 | `problem-1.md` |
| 4. Problem 2 | `problem-2.md` |
| 5. Project Implementation Plan | `plan.md` |
| 6. References | `references.md` |
| 7. Appendix | `appendix.md` |
| Colours and fonts | `assets/css/style.css` (the `:root` block at the top) |

## How the pages are built

Each `##` heading starts a new white card on the page. The number at the start becomes the blue badge.

```
## 3.5 New Section Title {#s3-5}

Your text here.

### 3.5.1 A smaller heading {#s3-5-1}
```

- The `{#s3-5}` part is the heading's id. Keep it, and make it unique.
- If you add a new `##` section, also add it to `_data/navigation.yml` so it appears in the dropdown:

```
    - title: "3.5 New Section Title"
      url: "problem-1.html#s3-5"
```

## Citations

Type citations exactly as in the report, e.g. `[8]` or `[26, 27]`.
The website turns them into small numbers that link to that entry on the References page.
References are numbered in the order they appear in `references.md`, so add new ones at the end.

## Figures and tables

### Adding a figure

1. Open `assets/images` on GitHub, click **Add file → Upload files**, and drag your image in.
   Use a short name with no spaces, e.g. `fig-3-04-bath-photo.png`.
2. In the page, write:

```
![Short description of the image](assets/images/fig-3-04-bath-photo.png)

*Figure 3.04: The caption shown under the image*
{: .caption}
```

### Adding a table

```
*Table 3.06: The table caption*
{: .caption}

| Column 1 | Column 2 |
|---|---|
| value | value |
```

## Equations

Equations use LaTeX between double dollar signs, on a line of their own:

```
$$t_{\text{diff}} \approx \frac{L^2}{\alpha}$$
```

The page needs `math: true` between its top `---` lines (already set on the Appendix page).

## Adding team photos

1. Upload a square photo to `assets/images/team/`, e.g. `adam.jpg`.
2. In `_data/team.yml`, change `photo: ""` to `photo: "assets/images/team/adam.jpg"`.

## If the site looks broken

- **No styling at all, just plain text:** `baseurl` in `_config.yml` doesn't match the repository name.
  It must be `/` followed by the exact repo name, e.g. `"/ecospool-report"`.
- **A page disappeared or shows an error:** check the **Actions** tab on GitHub. A red ✗ means the last change broke something,
  usually a missing `---` line or a missing quote `"` in a `.yml` file.
- **A dropdown link doesn't jump to the right card:** the part after `#` in `_data/navigation.yml` must match the `{#...}` id on that heading.
