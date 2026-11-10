# Your Portfolio — HTML, CSS, JavaScript

A complete responsive personal portfolio without React, npm, or any build command.

## 1. Make it yours

Open `data.js` in VS Code. Replace **all** placeholder examples with your real:
- Name, role, tagline, location, contact email
- About paragraphs
- Skills and tools
- Projects, descriptions, technologies, demo/source links
- Work history, education, certifications
- GitHub, LinkedIn and optional website URLs

Optional:
- Add `assets/profile.jpg` and set `profilePhoto: "assets/profile.jpg"`.
- Add `assets/resume.pdf` and set `resumeFile: "assets/resume.pdf"`.
- Leave `phone`, `resumeFile`, and social links blank to hide them.
- Remove the example `projects`, `experience`, or `education` entries instead of publishing fictional information.

**NOTE:** This project intentionally contains sample content and no real personal information. Do not publish it unchanged.

## 2. Preview

Double-click `index.html` or right-click it in VS Code and select **Open with Live Server** (if installed).

## 3A. Deploy with Vercel Drop (easiest)

Visit https://vercel.com/drop, upload the entire project folder or a ZIP containing `index.html` at the top level, choose your project name, and press Deploy.

Each Drop upload creates a new project. For ongoing updates to one URL, consider the GitHub method below.

## 3B. Deploy with GitHub + Vercel (best for regular edits)

1. Create a GitHub repository at https://github.com/new (e.g. `my-portfolio`).
2. Choose **Add file > Upload files** and upload `index.html`, `style.css`, `script.js`, `data.js`, and any `assets/` files at the top of the repository.
3. Open https://vercel.com/new and import the GitHub repository.
4. Framework preset: **Other**. Build Command: **leave blank**. Output Directory: repository root (`.`) or leave automatic default when it serves the root.
5. Click **Deploy**.
6. In the future, edit files on GitHub and commit to the production branch to trigger a new Vercel deployment.

## Notes

- This site is static. Contact links open the visitor's email application; there is no backend and no form service required.
- `data.js` is a public file. Do not add private information, passwords, or API keys.
- Only personal, non-commercial use is allowed on Vercel's Hobby plan under its fair-use policy. See https://vercel.com/docs/plans/hobby.
- You do not have to buy a custom domain; Vercel provides a `.vercel.app` address.
