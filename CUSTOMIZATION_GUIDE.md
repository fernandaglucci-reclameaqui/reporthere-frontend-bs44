# ReportHere Customization Guide

This guide will help you manage content, images, and styling for your ReportHere platform.

---

## 1. Managing Images

### Replacing Banners & Hero Images
All images are stored in `client/public/images/`. To replace an image:
1.  **Name your new file** exactly the same as the old one (e.g., `hero-v4-fixed.png`).
2.  **Upload it** to the `client/public/images/` folder, overwriting the existing file.
3.  **Deploy** your changes.

**Current Key Images:**
*   **Hero Banner:** `client/public/images/hero-v4-fixed.png`
*   **Transparency Section:** `client/public/images/transparency-v4-fixed.png`

### Resizing Images
*   **Hero Banner:** Recommended size is **1920x1080px** or **1600x900px**.
*   **Logos:** Recommended size is **200x200px** (square).
*   **Tools:** You can use free tools like [Canva](https://www.canva.com) or [Squoosh](https://squoosh.app) to resize and compress images before uploading.

---

## 2. Editing Content & Text

### Homepage Text
To change the headlines ("Check first. Speak up..."), subtext, or button labels:
*   **File:** `client/src/pages/Home.tsx`
*   **How:** Open the file and look for the text inside the HTML tags (e.g., `<h1>Check first...</h1>`). Edit the text directly.

### Company Data (Most Searched)
To add or update companies in the "Most Searched" list:
*   **File:** `client/src/data/companies.json`
*   **Format:**
    ```json
    {
      "id": "new-company",
      "name": "New Company Name",
      "category": "Retail",
      "score": 4.5,
      "logo": "/images/logos/new-logo.png"
    }
    ```

### Adding Blog Posts
Currently, the blog is a placeholder. To add real posts, you would typically:
1.  Create a new file `client/src/data/posts.json`.
2.  Add your articles there (Title, Date, Content).
3.  Update `client/src/pages/Blog.tsx` to read from that file (similar to how we did for Companies).

---

## 3. Styling & Colors

### Changing the Color Theme
The site uses a central color configuration.
*   **File:** `client/src/index.css`
*   **Key Variables:** Look for the `:root` section.
    *   `--primary`: The main green color (buttons, links).
    *   `--background`: The page background color (currently `stone-50`).
    *   `--foreground`: The main text color.

### Adjusting Spacing
We use **Tailwind CSS** for spacing.
*   **Margins:** `m-4` (1rem), `mt-8` (margin-top 2rem), `mb-2` (margin-bottom 0.5rem).
*   **Padding:** `p-4` (1rem), `px-6` (horizontal padding), `py-3` (vertical padding).
*   **How to edit:** Find the element in the `.tsx` file (e.g., `Home.tsx`) and change the class names.
    *   *Example:* Change `<div className="mb-8">` to `<div className="mb-12">` for more space.

---

## 4. Deployment

### How to Publish Changes
Whenever you make edits to files:
1.  **Save** your changes.
2.  **Click "Publish"** in the Manus UI (top right).
3.  Wait 1-2 minutes for Vercel to update the live site.

---

**Need help?** Just ask Manus! I can make any of these changes for you if you describe what you want.
