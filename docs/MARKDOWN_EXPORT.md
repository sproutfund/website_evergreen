# Programs Export Documentation

This document describes the Jekyll-native export system that converts program page frontmatter to filtered Markdown files.

## Overview

The export system provides a one-way conversion of all `program/*.md` files into multiple filtered Markdown files in the `exports/` directory. Each export can be filtered by superprogram category and sorted by earliest year of operation.

**Key Features:**
- ✅ **Multiple filtered exports**: Generate exports for all programs or filtered by superprogram (Community, Learning, Public Art, Showcase)
- ✅ **Automatic sorting**: Filtered exports are sorted by earliest year of operation
- ✅ **Reuses Jekyll infrastructure**: Leverages existing data pipeline and templates
- ✅ **Auto-resolves grant references**: Automatically merges data from `_data/grants.csv` when features reference `grant-id`
- ✅ **Maintains data integrity**: Guaranteed to match website rendering since it uses the same Jekyll engine
- ✅ **Fast**: Typically completes in 5-10 seconds
- ✅ **One-way export**: Source of truth remains in `program/*.md` files

**Available Exports:**
- `PROGRAMS_all.md`: All programs (unsorted)
- `PROGRAMS_community.md`: Community superprogram (sorted by earliest year)
- `PROGRAMS_learning.md`: Learning superprogram (sorted by earliest year)
- `PROGRAMS_public-art.md`: Public Art superprogram (sorted by earliest year)
- `PROGRAMS_showcase.md`: Showcase superprogram (sorted by earliest year)

## Quick Start

### Option 1: Using VS Code Task (Recommended)

From within VS Code (devcontainer or local):

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Tasks: Run Task"
3. Select "Export Programs to Markdown"

Or use the keyboard shortcut after configuring it in your VS Code settings.

This will:
1. Build Jekyll with export configuration
2. Generate 5 markdown files in `_site/`
3. Create `exports/` directory
4. Copy all 5 exports to `exports/PROGRAMS_*.md`

### Option 2: Manual Command

From within the devcontainer or Docker environment:

```bash
bundle exec jekyll build --config "_config.yml,_config_export.yml" && \
mkdir -p exports && \
cp _site/PROGRAMS_all.md _site/PROGRAMS_community.md _site/PROGRAMS_learning.md _site/PROGRAMS_public-art.md _site/PROGRAMS_showcase.md exports/
```

### Option 3: Using Docker (from host machine)

```bash
docker run --rm -it \
  -v "$(pwd):/srv/jekyll" \
  sproutfund-jekyll \
  bash -c "bundle exec jekyll build --config '_config.yml,_config_export.yml' && mkdir -p exports && cp _site/PROGRAMS_*.md exports/"
```

## Architecture

### Files Involved

```
Project Root
├── program/                      # Source: Program frontmatter files
│   ├── 100-days.md
│   ├── community-connections.md
│   └── ...
├── _data/
│   └── grants.csv               # Project database (auto-linked via grant-id)
├── _layouts/
│   └── program_export_filtered.md  # Parameterized export template
├── _config_export.yml           # Export-specific configuration
├── export_all.md                # Export page for all programs
├── export_community.md          # Export page for Community superprogram
├── export_learning.md           # Export page for Learning superprogram
├── export_public-art.md         # Export page for Public Art superprogram
├── export_showcase.md           # Export page for Showcase superprogram
├── .vscode/
│   └── tasks.json               # VS Code task configuration
└── exports/                     # Output: Generated markdown files
    ├── PROGRAMS_all.md
    ├── PROGRAMS_community.md
    ├── PROGRAMS_learning.md
    ├── PROGRAMS_public-art.md
    └── PROGRAMS_showcase.md
```

### How It Works

1. **Jekyll Build**: Jekyll processes all `export_*.md` pages using the `program_export_filtered` layout
2. **Filtering**: Each export page specifies `filter_superprogram` (e.g., "Community") or null for all programs
3. **Sorting**: If `sort_by_earliest_year: true`, programs are sorted by their earliest year in the `years` array
4. **Program Iteration**: The layout loops through filtered/sorted `program/*.md` pages
5. **Data Resolution**: When features reference `grant-id`, the layout queries `site.data.grants` to merge CSV data
6. **Markdown Output**: Instead of HTML, the layout generates clean Markdown
7. **File Generation**: Jekyll writes results to `_site/PROGRAMS_*.md`
8. **Copy to Exports**: The VS Code task copies all files to `exports/` directory

### Layout Logic (`_layouts/program_export_filtered.md`)

The export layout is parameterized to support filtering and sorting:

```liquid
{%- comment -%} Step 1: Collect all program pages {%- endcomment -%}
{%- assign all_programs = "" | split: "" -%}
{%- for program_page in site.pages -%}
  {%- if program_page.path contains 'program/' and program_page.layout == 'program' -%}
    {%- assign all_programs = all_programs | push: program_page -%}
  {%- endif -%}
{%- endfor -%}

{%- comment -%} Step 2: Filter by superprogram if specified {%- endcomment -%}
{%- if page.filter_superprogram -%}
  {%- assign programs = all_programs | where: "superprogram", page.filter_superprogram -%}
{%- else -%}
  {%- assign programs = all_programs -%}
{%- endif -%}

{%- comment -%} Step 3: Sort by earliest year if requested {%- endcomment -%}
{%- if page.sort_by_earliest_year -%}
  {%- assign programs = programs | sort: "years" -%}
{%- endif -%}

{%- comment -%} Step 4: Render each program {%- endcomment -%}
{%- for program_page in programs -%}
  # {{ program_page.title }}
  [... full program content rendering ...]
{%- endfor -%}
```

**Key Implementation Details:**

1. **Parameterized Filtering**: Reads `page.filter_superprogram` from export page frontmatter
2. **Parameterized Sorting**: Reads `page.sort_by_earliest_year` to enable chronological sorting
3. **Simple Sort**: Uses Liquid's built-in `sort: "earliest_year"` filter on the frontmatter field
4. **Program Filtering**: Only exports pages with `layout: program` and `sitemap != false`, located in `program/` directory
5. **Year Sorting**: Each program has an `earliest_year` field in frontmatter (e.g., `earliest_year: 2007`)
6. **Video URL Conversion**: Transforms embed URLs to watch URLs for readability
7. **Feature Format**: Uses compact single-line format instead of multi-line field structure
8. **Data Resolution**: Automatically queries `site.data.grants` when `grant-id` is present
9. **Pipe Replacement**: Converts pipe separators (`|`) to commas in acknowledgements items

This ensures the export matches exactly what the website displays.

### Earliest Year Field

All program files include an `earliest_year` field in their frontmatter:

```yaml
# Example: program/hothouse.md
years:
  - 2003
  - 2004
  - 2005
earliest_year: 2003  # Enables simple sorting
```

This approach is simpler and more reliable than using custom Liquid filters to extract the first element from year arrays.

## Output Format

Each generated `PROGRAMS_*.md` file includes:

### Header
- Export title (e.g., "The Sprout Fund Programs - Community")
- Generation timestamp
- Repository and live site URLs
- Filter and sort information (for filtered exports)
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

**Example: PROGRAMS_community.md**

```markdown
# The Sprout Fund Programs - Community

Generated: 2025-01-15 14:23:45

Source Repository: https://github.com/sproutfund/website_evergreen

Live Site: https://www.sproutfund.org

Filter: Superprogram = Community

Sort Order: Earliest year (ascending)

---

This export includes 8 Community programs.

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
- `export*.md` - All export page files
- `exports/` - Generated output directory
- `*.sh` - Shell scripts (deprecated)

## Customization

### Adding a New Filtered Export

To create a new filtered export (e.g., by year or keyword):

1. Create a new export page: `export_FILTERNAME.md`
2. Set frontmatter parameters:
   ```yaml
   ---
   layout: program_export_filtered
   permalink: /PROGRAMS_FILTERNAME.md
   filter_superprogram: null  # or specific value
   sort_by_earliest_year: true/false
   ---
   ```
3. Add custom filtering logic to `_layouts/program_export_filtered.md` if needed
4. Update `.vscode/tasks.json` to copy the new export file
5. Update `_config.yml` exclude list

### Changing Output Format

Edit `_layouts/program_export_filtered.md` to customize the Markdown output:

```liquid
{%- comment -%}
Example: Add program slug to output
{%- endcomment -%}

**Slug:** {{ program_page.title | slugify }}
```

### Modifying Sort Order

The current implementation sorts by the `years` field. To sort by a different field:

```liquid
{%- if page.sort_by_earliest_year -%}
  {%- assign programs = programs | sort: "title" -%}  {%- comment -%} Sort alphabetically {%- endcomment -%}
{%- endif -%}
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
- ✅ Export targets: `exports/PROGRAMS_*.md` (generated, can be regenerated anytime)
- ❌ Do NOT edit `exports/PROGRAMS_*.md` directly - changes will be overwritten

### Version Control

**Recommended approach:**
- ✅ Commit `program/*.md` (source files with `earliest_year` field), `_data/grants.csv`
- ✅ Commit `export_*.md`, `_layouts/program_export_filtered.md`, `_config_export.yml` (export system)
- ✅ Commit `.vscode/tasks.json` (export automation)
- ⚠️ Consider adding `exports/` to `.gitignore` if regenerated frequently
- ✅ OR commit `exports/PROGRAMS_*.md` as snapshots for external consumers

## Troubleshooting

### Export files not generated

**Symptom:** `_site/PROGRAMS_*.md` files don't exist after build

**Solutions:**
1. Check that `export_*.md` files are not excluded in `_config_export.yml`
2. Verify `program/*.md` files have `layout: program`
3. Check that frontmatter parameters in `export_*.md` are valid
4. Check Jekyll output for syntax errors in frontmatter
5. Run with verbose flag: `bundle exec jekyll build --config "_config.yml,_config_export.yml" --verbose`

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

### Sorting issues

**Symptom:** Programs not sorted by year

**Solutions:**
1. Verify that `earliest_year` field exists in program frontmatter
2. Check that `earliest_year` values are numeric (e.g., `earliest_year: 2007`)
3. Ensure `sort_by_earliest_year: true` is set in export page frontmatter (e.g., `export_community.md`)
4. Check Jekyll output for Liquid syntax errors

### Bundler version error (host machine)

**Symptom:** `Could not find 'bundler' (2.6.5)`

**Solution:** Use Docker or devcontainer instead of host machine:
```bash
# Option 1: VS Code devcontainer (recommended)
# Open in VS Code → "Reopen in Container" → run VS Code task

# Option 2: Docker command
docker run --rm -it -v "$(pwd):/srv/jekyll" sproutfund-jekyll \
  bash -c "bundle exec jekyll build --config '_config.yml,_config_export.yml' && mkdir -p exports && cp _site/PROGRAMS_*.md exports/"
```

### Performance optimization

**Symptom:** Export takes too long

**Solutions:**
1. Use `--incremental` flag (but note: may not reflect all changes)
2. Exclude unnecessary plugins in `_config_export.yml`
3. Run only specific exports instead of all 5 by commenting out unwanted `cp` commands in `.vscode/tasks.json`
4. Consider caching Docker image with dependencies pre-installed

## Technical Notes

### Why Jekyll-Native?

This approach was chosen over Node.js/Python scripts because:
1. **Data integrity**: Uses same data pipeline as website (100% consistency)
2. **Maintainability**: No duplication of CSV parsing/merging logic
3. **Zero dependencies**: Reuses existing Jekyll/Ruby environment
4. **Future-proof**: Automatically inherits any website rendering updates

### Limitations

- **One-way only**: Cannot import from `PROGRAMS_*.md` back to source files
- **Jekyll required**: Cannot run export without Jekyll environment
- **Full rebuild**: Must rebuild entire site for all exports (though Jekyll caching helps)
- **Frontmatter requirement**: Programs must have `earliest_year` field for chronological sorting

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
