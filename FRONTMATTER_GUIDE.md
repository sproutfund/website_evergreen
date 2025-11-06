# Front Matter Guide for The Sprout Fund Website

This guide explains how the website uses YAML front matter in markdown files to control page rendering through Liquid templates. The architecture separates content (front matter) from presentation (Liquid templates), enabling consistent, maintainable page structures.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Program Page Front Matter Reference](#program-page-front-matter-reference)
- [Front Matter to Template Mapping](#front-matter-to-template-mapping)
- [Data Integration](#data-integration)
- [Examples](#examples)
- [Creating a New Program Page](#creating-a-new-program-page)

---

## Overview

The Sprout Fund website uses a **data-driven templating system** where:

1. **Content** lives in YAML front matter within markdown files (`program/*.md`)
2. **Structure** is defined by Liquid templates (`_layouts/*.html`, `_includes/**/*.html`)
3. **Project data** is pulled from `_data/grants.csv` and linked via `grant-id` references

This separation allows:
- Content updates without touching templates
- Consistent styling across all program pages
- Dynamic content loading from CSV data
- Flexible page structures through front matter configuration

---

## Architecture

### File Structure

```
program/
├── community-connections.md    # Content (front matter only)
├── 100-days.md                 # Content (front matter only)
└── ...

_layouts/
└── program.html                # Page structure

_includes/
└── page_parts/
    ├── cover.html              # Hero section
    ├── introduction.html       # Context + sidebar
    ├── context.html            # Program description
    ├── by-the-numbers.html     # Statistics sidebar
    ├── video.html              # Video section
    ├── highlights.html         # Main content sections
    ├── highlight_feature.html  # Individual project cards
    └── acknowledgements.html   # Supporters/staff

_data/
└── grants.csv                  # Project database
```

### Program Layout Template

The `program` layout (`_layouts/program.html`) includes these sections in order:

```liquid
{% include page_parts/cover.html %}
{% include page_parts/introduction.html %}
{% include page_parts/video.html %}
{% include page_parts/highlights.html %}
{% include page_parts/acknowledgements.html %}
```

Each include reads specific front matter fields and renders them accordingly.

---

## Program Page Front Matter Reference

### Required Fields

```yaml
layout: program                # Must be "program" for program pages
title: "Program Name"          # Page title (used in <h1>, <title>, etc.)
subtitle: "Brief description"  # Subtitle displayed on cover
description: "Full desc"       # Meta description (SEO, social sharing)
```

### Optional Core Fields

```yaml
logo: "/logos/program-name.png"           # Program logo (shown in sidebar)
superprogram: "Community" | "Learning"    # Category grouping
program: "Short Name"                     # Program identifier
keywords: "keyword1, keyword2"            # SEO keywords (comma-separated)
years: 2017                               # Single year
years:                                    # Or multiple years
  - 2007
  - 2008
  - 2009
redirect_from:                            # Legacy URL redirects (jekyll-redirect-from)
  - /old-url
  - /another-old-url
```

### Cover Image Section

Displays full-screen hero image with overlay text.

**Front Matter:**
```yaml
cover-image:
  source: "/photos/covers/program.jpg"    # Required: image path
  caption: "Main caption text"            # Required: photo caption
  subcaption: "Additional context"        # Optional: secondary caption
  credit: "photo: Photographer Name"      # Optional: photo credit
```

**Template:** `_includes/page_parts/cover.html`

**Maps to:**
```liquid
page.cover-image.source      → Background image
page.title                   → Main <h1> heading
page.subtitle                → <h3> subtitle
page.cover-image.caption     → <h5> in bottom overlay
page.cover-image.subcaption  → <span> next to caption
page.cover-image.credit      → Fine print after subcaption
```

### Video Section

Full-width video player with modal popup.

**Front Matter:**
```yaml
video:
  url: "https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&controls=1&showinfo=0&autoplay=1"
  thumbnail: "/photos/video_thumbnails/program.jpg"
  title: "Video Title"                    # Can include <em> tags
  caption: "Description of video content"
  duration: "5 minutes"
```

**Template:** `_includes/page_parts/video.html`

**Renders:** Full-screen section with thumbnail background, modal video player, watch button, and duration indicator.

### Context Section

Program description and history, displayed in the left column of the introduction section.

**Front Matter:**
```yaml
context:
  heading: "Section Heading"
  details:
    - "First paragraph of program description."
    - "Second paragraph with more details."
    - "Each array item becomes a separate <p> tag."
    - "Can include <em>HTML</em> formatting within strings."
```

**Template:** `_includes/page_parts/context.html`

**Maps to:**
```liquid
page.context.heading  → <h2>
page.context.details  → Array of <p class="lead"> paragraphs
```

### By-the-Numbers Section

Statistics sidebar displayed in the right column of the introduction section.

**Front Matter:**
```yaml
by-the-numbers:
  - heading: "Years Active"
    data: "2007–2009"
  - heading: "Total Investment"
    data: "$982,000"
  - heading: "Funded Projects"
    data: "100"
  - heading: "Geography"
    data: "14 counties of Southwestern PA"
  - heading: "Linked Stat"              # Optional: with link
    data: "View Report"
    link: "local://downloads/report.pdf"  # or external URL
```

**Template:** `_includes/page_parts/by-the-numbers.html`

**Link Handling:**
- Links starting with `local://` → converted to `{{ site.baseurl }}/path`
- Links with `local://downloads/` → open in new tab with download icon
- External URLs → open in new tab with launch icon
- Internal links → open in same tab

### Highlights Section

The main content area displaying project features, programmatic activities, or other structured content.

**Structure:**
```yaml
highlights:
  - title: "Section Title"              # <h1> heading
    description:                        # Optional lead paragraphs
      - "Description paragraph 1"
      - "Description paragraph 2"
    sections:                           # Optional subsections
      - title: "Subsection Title"       # <h2> heading
        description:
          - "Subsection description"
        features:                       # Project cards or content blocks
          - [feature definition]
    features:                           # Or features directly in highlight
      - [feature definition]
```

#### Feature Types

##### 1. Grant-based Feature (auto-populated from grants.csv)

```yaml
features:
  - title: "Project Name"               # Optional: override project name
    grant-id: "PGH250-321"              # Required: matches grants.csv
```

**Auto-populated from CSV:**
- `feature_image` ← `photo` column
- `feature_title` ← `project-name` column
- `feature_description` ← `short-statement` column
- `feature_moretext` ← `full-description` column + `website` link
- `feature_slug` ← `project-slug` column

**Template:** `_includes/page_parts/highlight_feature.html` (lines 19-43)

##### 2. Manual Feature (with image, title, description)

```yaml
features:
  - title: "Feature Title"
    image: "/photos/programs/program-name/photo.jpg"
    description: "Brief description shown on card."
    link: "local://downloads/document.pdf"  # Optional
```

##### 3. Feature with Modal Details

```yaml
features:
  - title: "Feature Title"
    image: "/photos/programs/program-name/photo.jpg"
    description: "Brief description shown on card."
    moretext: "Full detailed text shown in modal popup when card is clicked."
```

**Behavior:** Creates clickable card that opens modal with expanded content.

#### Highlight Styles

```yaml
highlights:
  - title: "Projects"
    style: "big-features"               # Large layout: image + text side-by-side
    features: [...]

  - title: "Activities"
    # style: (default)                  # 3-column card grid
    features: [...]

  - title: "Quote Section"
    style: "big-text"                   # Centered large text, no features
    description:
      - "Large centered quote or statement"
```

### Acknowledgements Section

Displays supporters, partners, and staff in a dark footer section.

**Basic Structure:**
```yaml
acknowledgements:
  - title: "Supporters"
    items:
      - "Organization Name"
      - "Another Supporter"
      - "Person Name|Title/Org"         # Pipe separator for name|affiliation

  - title: "Partners"
    items:
      - "Partner Organization"

  - title: "Staff"
    items:
      - "<strong>Lead Name</strong>"    # HTML allowed
      - "Staff Member"
      - "Contractor Name|role"
```

**Template:** `_includes/page_parts/acknowledgements.html`

#### Advanced Layouts

**Stacked Columns:**
```yaml
acknowledgements:
  - stacked:                            # Multiple sections in one column
      - title: "Partners"
        items: [...]
      - title: "Committee Co-Chairs"
        items: [...]
```

**Divided Columns:**
```yaml
acknowledgements:
  - title: "Major Supporters"
    divided:                            # Split items into sub-columns
      - items: ["Org A", "Org B"]
      - items: ["Org C", "Org D"]
```

**Custom Width:**
```yaml
acknowledgements:
  - title: "Supporters"
    width: "col-12 col-md-6"            # Bootstrap column classes
    items: [...]
```

**Item Rendering:**
- Plain text → Rendered as-is
- With pipe `|` → Split into `name|affiliation` format (name in regular text, affiliation in light text)
- HTML allowed → Use `<strong>`, `<em>`, etc.

---

## Front Matter to Template Mapping

### Complete Data Flow

```
program/community-connections.md
    ↓ (front matter parsed by Jekyll)
_layouts/program.html
    ↓ (includes page_parts)
_includes/page_parts/cover.html
    ↓ (accesses page.cover-image.*)
    ↓ (accesses page.title, page.subtitle)
Rendered HTML
```

### Variable Access Patterns

**In Templates:**
```liquid
{{ page.title }}                        # Direct field access
{{ page.cover-image.source }}           # Nested object access
{{ page.by-the-numbers[0].heading }}    # Array item access

{% for item in page.acknowledgements %} # Array iteration
  {{ item.title }}
{% endfor %}

{% if page.video.url %}                 # Conditional rendering
  <!-- render video section -->
{% endif %}
```

### Filter Usage

Common Liquid filters used in templates:

```liquid
{{ page.title | smartify }}             # Smart quotes, em dashes (Jekyll filter)
{{ feature.link | replace_first: "local:/",site.baseurl }}  # URL transformation
{{ feature_title | slugify }}           # Create URL-safe slug
{{ grant.full-description | newline_to_br }}  # Convert newlines to <br>
```

---

## Data Integration

### Linking Front Matter to CSV Data

The `highlight_feature.html` include automatically pulls data from `_data/grants.csv`:

**Front Matter:**
```yaml
highlights:
  - title: "Featured Projects"
    features:
      - title: "Optional Override Title"
        grant-id: "PGH250-321"          # Key reference to CSV
```

**Liquid Processing:**
```liquid
{% assign grant = site.data.grants | where: 'grant-id',feature.grant-id | first %}
```

**CSV Columns Used:**
- `grant-id` → Unique identifier (required for matching)
- `project-name` → Feature title (unless overridden in front matter)
- `project-slug` → URL slug for linking
- `photo` → Feature image path
- `short-statement` → Card description
- `full-description` → Modal content
- `website` → External project link (appended to full-description)

**Template Location:** `_includes/page_parts/highlight_feature.html:19-43`

### Data Fallback Chain

For grant-based features, the template uses this precedence:

1. **Front matter override** (if specified)
2. **CSV data** (from grants.csv)
3. **Default/empty** (if neither available)

Example:
```yaml
features:
  - grant-id: "PGH250-321"
    title: "Custom Title"               # Overrides CSV project-name
    # image: not specified              # Will use CSV photo column
    # description: not specified        # Will use CSV short-statement column
```

---

## Examples

### Example 1: Community Connections (Multi-Section Program)

**File:** `program/community-connections.md`

**Key Features:**
- Multiple years (2007–2009)
- Nested sections: "Regional Projects" and "Grassroots Projects" as subsections of "Funded Project Highlights"
- Grant-based features referencing CSV data
- Programmatic activities with manual features (images + descriptions)
- Stacked acknowledgements layout

**Front Matter Structure:**
```yaml
highlights:
  - title: "Funded Project Highlights"
    description: ["Overview paragraph"]
    sections:
      - title: "Regional Projects"          # Subsection
        description: ["$50k projects"]
        features:
          - title: "..."
            grant-id: "PGH250-321"          # Auto-populated from CSV

      - title: "Grassroots Projects"        # Subsection
        description: ["$5k projects"]
        features:
          - title: "..."
            grant-id: "PGH250-335"

  - title: "Programmatic Activities"
    description: ["Events overview"]
    features:
      - title: "Ideation Sessions"          # Manual feature
        image: "/photos/programs/community-connections/ideation.jpg"
        description: "Event description"
```

**Template Logic:**
- `highlights.html` loops through top-level highlights
- Checks for `highlight.sections` array
- If found, renders subsections with `<h2>` headings and their own features
- If not found, renders features directly under the highlight

### Example 2: 100 Days (Single-Section Program)

**File:** `program/100-days.md`

**Key Features:**
- Single year (2017)
- Flat structure: features directly under highlights (no subsections)
- Single `by-the-numbers` entry with complex data: `"$14,846 from 250 donors"`
- Simple acknowledgements (no stacked/divided layouts)

**Front Matter Structure:**
```yaml
years: 2017                                 # Single value (vs. array)

by-the-numbers:
  - heading: "Crowdfunding Raised"
    data: "$14,846 from 250 donors"         # Multi-part data in one string

highlights:
  - title: "Funded Project Highlights"
    description: ["Projects represented 12 issue areas..."]
    features:                               # Features directly in highlight
      - title: "#PGHYouthVision"
        grant-id: "3119-100DAYS"

  - title: "Community Events"
    description: []                         # Empty description
    features:
      - title: "Applicant Support"
        image: "/photos/programs/100-days/applicant-support.jpg"
        description: "Support description"
```

### Example 3: Feature Rendering Variations

**3-Column Card Grid (Default):**
```yaml
highlights:
  - title: "Projects"
    features:
      - grant-id: "ABC-123"     # Clickable card with modal
      - grant-id: "ABC-124"     # 3 cards per row
      - grant-id: "ABC-125"
      - grant-id: "ABC-126"     # Next row
```

**Renders:** Cards in `col-md-4` Bootstrap columns (3 per row)

**Big Features Layout:**
```yaml
highlights:
  - title: "Major Initiatives"
    style: "big-features"
    features:
      - grant-id: "ABC-123"     # Full-width: image left, text right
      - grant-id: "ABC-124"     # Full-width: image right, text left (alternates)
```

**Renders:** Full-width sections with image and text side-by-side, alternating left/right

**Text-Only Section:**
```yaml
highlights:
  - title: "Our Vision"
    style: "big-text"
    description:
      - "Large centered statement about the program's impact."
      - "Second paragraph of the vision statement."
```

**Renders:** Centered text section with no feature cards

---

## Creating a New Program Page

### Step-by-Step Guide

1. **Create markdown file:** `program/new-program.md`

2. **Add minimal front matter:**

```yaml
---
layout: program
title: "New Program Name"
subtitle: "Brief description of the program"
description: "Full description for SEO and social sharing"
logo: "/logos/new-program.png"
superprogram: "Community"
program: "New Program"

cover-image:
  source: "/photos/covers/new-program.jpg"
  caption: "Photo caption"
  subcaption: "Photo context"
  credit: "photo: Photographer"

years: 2020

by-the-numbers:
  - heading: "Total Investment"
    data: "$100,000"
  - heading: "Funded Projects"
    data: "25"

context:
  heading: "Program Overview"
  details:
    - "First paragraph describing the program."
    - "Second paragraph with more background."

highlights:
  - title: "Funded Projects"
    description:
      - "Overview of the projects we supported."
    features:
      - grant-id: "PROG-001"
      - grant-id: "PROG-002"

acknowledgements:
  - title: "Supporters"
    items:
      - "Supporter Name"
  - title: "Staff"
    items:
      - "Staff Member"
---
```

3. **Build and preview:**
```bash
bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --livereload
```

4. **View at:** `http://localhost:4000/website_evergreen/program/new-program/`

### Tips

- **All front matter sections are optional** except `layout`, `title`, `subtitle`, and `description`
- **Order matters:** Sections render in the order defined by `_layouts/program.html`
- **HTML in strings:** You can use `<em>`, `<strong>`, etc. in most text fields
- **Asset paths:** Always use absolute paths from site root (`/photos/...`, `/logos/...`)
- **Testing:** Use `jekyll.environment == "development"` checks to show debug info (see `highlight_feature.html:120`)
- **URL slugs:** Are auto-generated from `title | slugify` unless `slug:` is specified
- **Validation:** Front matter must be valid YAML (check indentation, colons, hyphens)

### Common Patterns

**No video:** Simply omit the `video:` section entirely

**No by-the-numbers:** Omit `by-the-numbers:` section (logo will display instead if present)

**External links in features:**
```yaml
features:
  - title: "External Resource"
    image: "/photos/resource.jpg"
    description: "Description"
    link: "https://external-site.com/page"    # Opens in new tab with icon
```

**Download links in features:**
```yaml
features:
  - title: "Program Report"
    image: "/photos/report-cover.jpg"
    description: "Download our final report"
    link: "local://downloads/program-report.pdf"  # Download icon, new tab
```

**Multi-level nesting:**
```yaml
highlights:
  - title: "Main Section"                   # <h1>
    sections:
      - title: "Subsection A"               # <h2>
        features: [...]
      - title: "Subsection B"               # <h2>
        features: [...]
  - title: "Another Section"                # <h1>
    features: [...]
```

---

## Advanced Topics

### Custom Includes

You can reference custom include files within highlights:

```yaml
highlights:
  - include_file: "custom/special-section.html"
```

**Template check:** `_includes/page_parts/highlights.html:2-5`

### Modal Content

Features with `moretext` automatically become clickable modals:

```yaml
features:
  - title: "Project Name"
    image: "/photos/project.jpg"
    description: "Brief description on card"
    moretext: "Full detailed text in modal popup"
```

**Template:** `_includes/page_parts/highlight_feature.html:92-130`

### Video in Highlights

Individual highlights or sections can have embedded videos:

```yaml
highlights:
  - title: "Project Showcase"
    video: "https://www.youtube-nocookie.com/embed/VIDEO_ID"
    description: ["Video description"]
```

**Renders:** Section title becomes clickable to open video modal

**Template:** `_includes/page_parts/highlights.html:35-43, 85-93`

### Background Color Alternation

Highlights sections automatically alternate background colors using Liquid's `cycle` tag:

```liquid
<section class="{% cycle 'bg--white', 'bg--secondary' %}">
```

This creates visual separation between sections without configuration needed.

---

## Troubleshooting

### Common Issues

**Front matter not rendering:**
- Ensure front matter is between `---` markers at the top of the file
- Check YAML syntax (indentation must be consistent, use spaces not tabs)
- Validate YAML syntax with an online validator

**Images not showing:**
- Verify path starts with `/` (e.g., `/photos/...` not `photos/...`)
- Check that file exists in the _site directory (see `keep_files` in `_config.yml`)
- Use browser DevTools to check the final rendered path

**Grant features not loading:**
- Verify `grant-id` exactly matches the `grant-id` column in `_data/grants.csv`
- Check that the grant has `show-hide` == `"show"` in CSV
- Rebuild Jekyll (`bundle exec jekyll build`) after CSV changes

**Modal not opening:**
- Ensure feature has `moretext` field populated
- Check browser console for JavaScript errors
- Verify scripts.html is included in layout

**Acknowledgements formatting wrong:**
- Check that `items:` array is properly indented
- Verify column layout using `width:` if needed
- Use `stacked:` or `divided:` for complex layouts

### Debugging Tips

1. **Enable development mode:**
   ```bash
   JEKYLL_ENV=development bundle exec jekyll serve --config "_config.yml,_config_dev.yml"
   ```

2. **View feature slugs:** In development mode, feature slugs appear at bottom of modals

3. **Check generated HTML:**
   ```bash
   open _site/program/program-name/index.html
   ```

4. **Validate front matter:**
   ```bash
   ruby -ryaml -e "puts YAML.load_file('program/program-name.md')"
   ```

5. **Test specific includes:** Temporarily comment out includes in `_layouts/program.html` to isolate issues

---

## Additional Resources

- **Jekyll Documentation:** https://jekyllrb.com/docs/front-matter/
- **Liquid Template Language:** https://shopify.github.io/liquid/
- **Bootstrap 4 Grid:** https://getbootstrap.com/docs/4.0/layout/grid/
- **YAML Syntax:** https://yaml.org/spec/1.2/spec.html

---

## Summary

The Sprout Fund website's front matter system provides:

- **Content/presentation separation:** Writers edit YAML, developers edit templates
- **Data integration:** Automatic CSV data loading via `grant-id` references
- **Flexible layouts:** Different section styles and feature presentations
- **Consistency:** All program pages share the same structure and styling
- **Maintainability:** Changes to one template affect all program pages

By understanding the mapping between front matter fields and Liquid template variables, you can create rich, consistent program pages without writing HTML.
