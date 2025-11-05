# AGENTS.md / CLAUDE.md

This file provides guidance to coding assistants and agents (such as Claude Code) when working with files in this repository.

## Project Overview

This is The Sprout Fund's evergreen website, built with Jekyll and GitHub Pages. The site archives programs, projects, and grants from The Sprout Fund, a Pittsburgh-based nonprofit that supported community initiatives.

**Live URL:** https://www.sproutfund.org
**Repository:** https://github.com/sproutfund/website_evergreen

## Development Commands

### Preferred: VS Code Devcontainer

The recommended development approach uses VS Code with devcontainers, which provides a consistent Docker-based environment. This allows you to run Jekyll in a container while using command-line `claude` from the host machine.

**Setup:**
1. Open folder in VS Code
2. Click "Reopen in Container" (or F1 → "Dev Containers: Reopen in Container")
3. Press `Cmd+Shift+B` / `Ctrl+Shift+B` to start Jekyll server
4. Access site at `http://localhost:4000/website_evergreen/`

**Configuration files:**
- `.devcontainer/devcontainer.json`: Devcontainer configuration with auto port forwarding (4000, 35729)
- `.vscode/tasks.json`: VS Code tasks for starting Jekyll with keyboard shortcuts

**Workflow benefits:**
- Both VS Code (in container) and command-line `claude` (on host) see the same files
- Jekyll livereload works seamlessly across both
- No need to install Ruby, Jekyll, or Node.js on host machine

### Docker Development

The project includes a comprehensive Dockerfile:
- **Base**: Ubuntu 24.04 LTS
- **Ruby**: 3.3.4 (matches GitHub Pages exactly)
- **Node.js/npm**: Required for Lunr.js search functionality
- **Jekyll**: 3.10.0
- **GitHub Pages gem**: 232

**Build image:**
```bash
docker build -t sproutfund-jekyll .
```

**Run development server:**
```bash
docker run --rm -it \
  -v "$(pwd):/srv/jekyll" \
  -p 4000:4000 \
  sproutfund-jekyll \
  bundle exec jekyll serve --config "_config.yml,_config_dev.yml" \
  --host 0.0.0.0 --livereload
```

**Note:** WORKDIR is set to `/srv/jekyll` in the Dockerfile, so volume mounts work correctly.

### Local Development (Without Docker)

If developing without Docker, install dependencies locally:

```bash
# Install dependencies (requires Ruby 3.3.4 and Node.js)
bundle install
npm install

# Development server with live reload (uses both config files)
bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --livereload

# Development server with incremental builds
bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --livereload --incremental

# Build for development
bundle exec jekyll build --config "_config.yml,_config_dev.yml"

# Build for production
bundle exec jekyll build
```

**Note:** Both `bundle install` (Ruby gems) and `npm install` (Node.js for Lunr.js) are required.

## Architecture

### Content Organization

The site uses a **data-driven architecture** where project/grant information lives in a CSV file and is dynamically rendered into pages:

- **_data/grants.csv**: Master database of all projects and grants. Contains ~40 fields including project details, funding amounts, descriptions, photos, and categorizations
- **_plugins/data_page_generator.rb**: Custom Jekyll plugin that reads grants.csv and generates individual pages for each grant based on templates
- **Content pages**: Program descriptions (program/), project indexes by year (projects/YYYY.md) and letter (projects/a.md, etc.)

### Key Directories

- **_layouts/**: Page templates (grant.html, program.html, project-*.html, etc.)
- **_includes/**: Reusable components (navbar, footer, header, analytics, etc.)
- **program/**: Markdown files for each program (100-days.md, hive.md, etc.) with frontmatter defining title, logo, acknowledgements, etc.
- **search/**: Search functionality using Lunr.js with JSON indexes generated from Jekyll data
- **photos/**, **logos/**: Static assets referenced by grants.csv and program pages
- **theme/**: Bootstrap-based theme files

### Configuration

- **_config.yml**: Production configuration (baseurl: `/`)
- **_config_dev.yml**: Development overrides (baseurl: `/website_evergreen`, enables page_gen for testing)
- **Gemfile**: Uses `github-pages` gem for consistency with GitHub Pages deployment
- **package.json**: Node.js dependencies (primarily Lunr.js for client-side search)
- **.devcontainer/devcontainer.json**: VS Code devcontainer configuration
- **.vscode/tasks.json**: VS Code tasks for Jekyll commands

### Data Page Generation

The `data_page_generator.rb` plugin enables generating pages from CSV data:

```yaml
page_gen:
  - data: "grants"            # Source: _data/grants.csv
    template: "grant"         # Layout: _layouts/grant.html
    name: "grant-id"          # Field used for URL/filename
    extension: "txt"
    filter_condition: "record['show-hide'] == 'show'"
```

This generates a page for each grant where `show-hide` == 'show', creating URLs like `/projects/highlights/community/#project-slug`.

### Search Implementation

The site includes a client-side search using:
- **Lunr.js** for indexing and search (specified in package.json)
- **search/data_programs.json** and **search/data_projects.json**: Liquid-generated JSON indexes
- **search/search.js**: Search UI logic

### Jekyll Plugins Used

- jekyll-redirect-from
- jekyll-seo-tag
- jekyll-sitemap
- jemoji
- Custom data_page_generator (see _plugins/)

## Content Structure Conventions

### Program Pages (program/*.md)

Each program page uses the `program` layout with extensive frontmatter:

```yaml
layout: program
title: "Program Name"
subtitle: "Brief description"
description: "Full description"
logo: "/logos/program-name.png"
superprogram: "Community" or "Learning"
program: "Short Name"
cover-image:
  source: "/photos/covers/..."
  caption: "..."
video:
  url: "..."
  thumbnail: "..."
acknowledgements:
  - title: "Supporters"
    items: [...]
  - title: "Partners"
    items: [...]
  - title: "Staff"
    items: [...]
```

### Grants CSV Structure

Key fields in _data/grants.csv:
- Identifiers: `grant-id`, `project-slug`, `wordpress-id`
- Display: `project-name`, `year-display`, `short-statement`, `full-description`
- Organization: `superprogram`, `program`, `type`, `funding-round`
- Visibility: `show-hide`, `featured`
- Assets: `photo`, `website`
- Financial: `amount`, `amount-numeric`, `date-authorized`

## Important Notes

- **CSV changes require rebuild**: The site generates static pages from CSV data, so changes to grants.csv require a Jekyll rebuild
- **Baseurl difference**: Production uses `baseurl: "/"` while development uses `baseurl: "/website_evergreen"`
- **Asset management**: Many assets (photos, logos, theme files) are kept in _site/ via `keep_files` configuration
- **URL structure**: The `page_gen-dirs: true` setting creates directory-based URLs (name/index.html) instead of flat files (name.html)
- **Node.js requirement**: npm is required for Lunr.js search dependencies (included in Dockerfile)
- **Development workflow**: Preferred approach is VS Code devcontainer + command-line `claude` on host machine for seamless file sharing and live reload
