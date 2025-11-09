# Programs Export Documentation

This document describes the Jekyll-native export system that converts program page frontmatter to a single consolidated Markdown file (`PROGRAMS.md`).

## Overview

The export system provides a one-way conversion of all `program/*.md` files into a single `PROGRAMS.md` markdown file at the project root. This consolidated file represents all program content from the evergreen website in a portable markdown format.

**Key Features:**
- ✅ **Reuses Jekyll infrastructure**: Leverages existing data pipeline and templates
- ✅ **Auto-resolves grant references**: Automatically merges data from `_data/grants.csv` when features reference `grant-id`
- ✅ **Maintains data integrity**: Guaranteed to match website rendering since it uses the same Jekyll engine
- ✅ **Fast**: Typically completes in 5-10 seconds
- ✅ **One-way export**: Source of truth remains in `program/*.md` files

## Quick Start

### Option 1: Using the Export Script (Recommended)

From within the VS Code devcontainer or Docker environment:

```bash
./export-programs.sh
```

This will:
1. Build Jekyll with export configuration
2. Generate `_site/PROGRAMS.md`
3. Copy the result to `PROGRAMS.md` in project root
4. Display export statistics

### Option 2: Manual Jekyll Build

```bash
# From within devcontainer or Docker environment
bundle exec jekyll build --config "_config.yml,_config_export.yml"

# Copy output to project root
cp _site/PROGRAMS.md PROGRAMS.md
```

### Option 3: Using Docker (from host machine)

```bash
docker run --rm -it \
  -v "$(pwd):/srv/jekyll" \
  sproutfund-jekyll \
  bash -c "bundle exec jekyll build --config '_config.yml,_config_export.yml' && cp _site/PROGRAMS.md PROGRAMS.md"
```

## Architecture

### Files Involved

```
Project Root
├── program/                    # Source: Program frontmatter files
│   ├── 100-days.md
│   ├── community-connections.md
│   └── ...
├── _data/
│   └── grants.csv             # Project database (auto-linked via grant-id)
├── _layouts/
│   └── program_export.md      # Export template (outputs Markdown)
├── _config_export.yml         # Export-specific configuration
├── export.md                  # Export page (uses program_export layout)
├── export-programs.sh         # Convenience script
└── PROGRAMS.md                # Output: Generated consolidated file
```

### How It Works

1. **Jekyll Build**: Jekyll processes `export.md` using the `program_export` layout
2. **Program Iteration**: The layout loops through all `program/*.md` pages
3. **Data Resolution**: When features reference `grant-id`, the layout queries `site.data.grants` to merge CSV data
4. **Markdown Output**: Instead of HTML, the layout generates clean Markdown
5. **File Generation**: Jekyll writes the result to `_site/PROGRAMS.md`
6. **Copy to Root**: The script copies the file to project root for easy access

### Layout Logic (`_layouts/program_export.md`)

The export layout mimics the website's rendering logic:

```liquid
{%- for program_page in site.pages -%}
  {%- if program_page.path contains 'program/' and program_page.path contains '.md'
      and program_page.layout == 'program' and program_page.sitemap != false -%}
    # {{ program_page.title }}

    {%- for highlight in program_page.highlights -%}
      {%- for feature in highlight.features -%}
        {%- if feature.grant-id -%}
          {%- assign grant = site.data.grants | where: 'grant-id', feature.grant-id | first -%}
          {%- if grant -%}
            - **{{ feature.title | default: 'Feature' }}**: {{ grant.short-statement }} *{{ feature.grant-id }}* [image]({{ grant.photo }})
          {%- endif -%}
        {%- endif -%}
      {%- endfor -%}
    {%- endfor -%}
  {%- endif -%}
{%- endfor -%}
```

**Key Implementation Details:**

1. **Program Filtering**: Only exports pages with `layout: program` and `sitemap != false`, located in `program/` directory
2. **Video URL Conversion**: Transforms embed URLs to watch URLs for readability:
   - Input: `https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0`
   - Output: `https://www.youtube.com/watch?v=VIDEO_ID`
3. **Feature Format**: Uses compact single-line format instead of multi-line field structure
4. **Data Resolution**: Automatically queries `site.data.grants` when `grant-id` is present
5. **Pipe Replacement**: Converts pipe separators (`|`) to commas in acknowledgements items

This ensures the export matches exactly what the website displays.

## Output Format

The generated `PROGRAMS.md` includes:

### Header
- Generation timestamp
- Repository and live site URLs
- Program count

### Per Program
- **Metadata**: Title, subtitle, description, program name, superprogram, years, logo, keywords, URL
- **Cover Image**: Source, caption, subcaption, credit
- **Video**: URL (converted from embed to watch format), title, caption, duration, date (optional), thumbnail
- **Context**: Program heading and description paragraphs (from frontmatter)
- **By the Numbers**: Statistics with optional links
- **Highlights**: Nested sections and features
  - **Grant-based features**: Compact format with title, description, grant-id, and image link from `grants.csv`
  - **Manual features**: Compact format with title, description, image link, and external link
- **Acknowledgements**: Supporters, partners, staff (handles stacked/divided layouts with pipe-separated names)

### Example Output Structure

```markdown
# The Sprout Fund Programs

Generated: 2025-01-15 14:23:45

---

# Community Connections

**Subtitle:** Celebrating Pittsburgh's 250th anniversary...
**Program:** Community Connections
**Years:** 2007, 2008, 2009

## Cover Image
- **Source:** /photos/covers/community-connections.jpg
- **Caption:** Monumental sculpture "The Workers" nears completion

## Context

**About the Program**

[Program description paragraphs from context.details array]

## By the Numbers

- **Total Investment:** $982,000
- **Funded Projects:** 100

## Highlights

### Funded Project Highlights

[Description paragraphs if present]

#### Regional Projects

[Section description paragraphs if present]

- **Celebrate Pittsburgh: Music Commissioning Project**: Commission 12 new musical compositions... *PGH250-321* [image](/photos/programs/...)

[... more programs ...]
```

## Configuration

### Export Configuration (`_config_export.yml`)

Key settings:
- `baseurl: ""` - Clean URLs in output (no site prefix)
- Excludes documentation files but includes `export.md`
- Inherits all other settings from `_config.yml`

### Main Configuration (`_config.yml`)

Updated to exclude export-related files from normal builds:
- `export.md` - Export page
- `EXPORT.md` - This documentation
- `PROGRAMS.md` - Generated output
- `*.sh` - Shell scripts

## Customization

### Changing Output Format

Edit `_layouts/program_export.md` to customize the Markdown output:

```liquid
{%- comment -%}
Example: Add program slug to output
{%- endcomment -%}

**Slug:** {{ program_page.title | slugify }}
```

### Filtering Programs

To export only specific programs, add a filter condition:

```liquid
{%- for program_page in site.pages -%}
{%- if program_page.layout == 'program' and program_page.superprogram == 'Community' -%}
  {%- comment -%} Only Community programs {%- endcomment -%}
```

### Adding CSV Fields

To include additional fields from `grants.csv`:

```liquid
{%- if grant %}
**Amount:** {{ grant.amount }}
**Year:** {{ grant.year-display }}
{%- endif -%}
```

See `_data/grants.csv` for all available fields (~40 columns).

## Maintenance

### When to Re-Export

Run the export when:
- Program frontmatter is updated (`program/*.md`)
- Grant data is modified (`_data/grants.csv`)
- New programs are added
- You need a fresh snapshot for external use

### Keeping in Sync

The export is **one-way**:
- ✅ Source of truth: `program/*.md` + `_data/grants.csv`
- ✅ Export target: `PROGRAMS.md` (generated, can be regenerated anytime)
- ❌ Do NOT edit `PROGRAMS.md` directly - changes will be overwritten

### Version Control

**Recommended approach:**
- ✅ Commit `program/*.md`, `_data/grants.csv` (source files)
- ✅ Commit `_layouts/program_export.md`, `_config_export.yml` (export system)
- ⚠️ Consider adding `PROGRAMS.md` to `.gitignore` if regenerated frequently
- ✅ OR commit `PROGRAMS.md` as a snapshot for external consumers

## Troubleshooting

### Export file not generated

**Symptom:** `_site/PROGRAMS.md` doesn't exist after build

**Solutions:**
1. Check that `export.md` is not excluded in `_config_export.yml`
2. Verify `program/*.md` files have `layout: program`
3. Check Jekyll output for syntax errors in frontmatter
4. Run with verbose flag: `bundle exec jekyll build --config "_config.yml,_config_export.yml" --verbose`

### Grant data not appearing

**Symptom:** Features show only title, no project details

**Solutions:**
1. Verify `grant-id` in frontmatter exactly matches `grants.csv`
2. Check CSV encoding (should be UTF-8)
3. Rebuild Jekyll after CSV changes: `bundle exec jekyll clean && bundle exec jekyll build --config "_config.yml,_config_export.yml"`
4. Verify grant has `show-hide` == `"show"` in CSV (if using filtering)

### Markdown formatting issues

**Symptom:** Output has broken formatting or missing sections

**Solutions:**
1. Check for YAML syntax errors in `program/*.md` frontmatter
2. Validate YAML: `ruby -ryaml -e "puts YAML.load_file('program/program-name.md')"`
3. Look for special characters that need escaping in frontmatter strings
4. Review Liquid syntax in `_layouts/program_export.md`

### Bundler version error (host machine)

**Symptom:** `Could not find 'bundler' (2.6.5)`

**Solution:** Use Docker or devcontainer instead of host machine:
```bash
# Option 1: VS Code devcontainer (recommended)
# Open in VS Code → "Reopen in Container" → run export script

# Option 2: Docker command
docker run --rm -it -v "$(pwd):/srv/jekyll" sproutfund-jekyll \
  bash -c "./export-programs.sh"
```

### Performance optimization

**Symptom:** Export takes too long

**Solutions:**
1. Use `--incremental` flag (but note: may not reflect all changes)
2. Exclude unnecessary plugins in `_config_export.yml`
3. Filter to specific programs if you don't need all of them
4. Consider caching Docker image with dependencies pre-installed

## Technical Notes

### Why Jekyll-Native?

This approach was chosen over Node.js/Python scripts because:
1. **Data integrity**: Uses same data pipeline as website (100% consistency)
2. **Maintainability**: No duplication of CSV parsing/merging logic
3. **Zero dependencies**: Reuses existing Jekyll/Ruby environment
4. **Future-proof**: Automatically inherits any website rendering updates

### Limitations

- **One-way only**: Cannot import from `PROGRAMS.md` back to source files
- **Jekyll required**: Cannot run export without Jekyll environment
- **Full rebuild**: Must rebuild entire site (though filtered by config)

### Alternatives Considered

1. **Node.js script**: Fast but requires duplicating CSV lookup logic
2. **Python with pandas**: Excellent CSV handling but adds new dependency
3. **Parse rendered HTML**: Poor quality output, hard to extract clean content
4. **Ruby script**: Same language but still requires duplicating Jekyll logic

## Related Documentation

- **[CLAUDE.md](../CLAUDE.md)**: Full project development guide
- **[FRONTMATTER_GUIDE.md](FRONTMATTER_GUIDE.md)**: Complete frontmatter reference
- **[README.md](../README.md)**: Project overview and setup

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review Jekyll build output for errors
3. Validate YAML frontmatter syntax
4. Open issue at https://github.com/sproutfund/website_evergreen/issues
