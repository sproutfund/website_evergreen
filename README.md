# The Sprout Fund – Evergreen Website

The official evergreen website for The Sprout Fund, a Pittsburgh-based nonprofit that supported community initiatives, innovative programs, and creative projects.

**Live Site:** [www.sproutfund.org](https://www.sproutfund.org)

## Overview

This Jekyll-based static site archives The Sprout Fund's legacy of programs, projects, and grants. The site uses a data-driven architecture where project information is managed in CSV format and dynamically rendered into pages through custom Jekyll plugins.

**Key Technologies:**
- Jekyll 3.10.0 (static site generator)
- GitHub Pages 232
- Ruby 3.3.4
- Lunr.js (client-side search)
- Bootstrap (theme framework)

## Quick Start with Docker (Recommended)

The best way to develop this site is using **VS Code with devcontainers**, which provides a consistent Docker-based environment without installing Ruby, Jekyll, or dependencies on your local machine. This approach also allows you to use agentic command-line tools (like `claude`) from your host machine while the development server runs in the container.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed
- [Visual Studio Code](https://code.visualstudio.com/) installed (or compatible alternative like Cursor)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

### Preferred Workflow: VS Code Devcontainer + Command-line Claude

1. **Open in VS Code (or compatible)**:
   ```bash
   code .
   ```

2. **Reopen in Container**:
   - When prompted, click "Reopen in Container"
   - Or: Press `F1` → "Dev Containers: Reopen in Container"
   - First-time setup will build the Docker image and install dependencies automatically

3. **Start Jekyll server**:
   - Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows/Linux)
   - Select "Serve Jekyll (Dev)" from the task list
   - Or manually run in the VS Code terminal:
     ```bash
     bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --host 0.0.0.0 --livereload
     ```

4. **Access the site**:
   - Open your browser to `http://localhost:4000/website_evergreen/`
   - Changes will auto-reload thanks to `--livereload`

5. **Use Claude Code from your host machine** (optional):
   - In a separate terminal on your host machine, run `claude`
   - Make changes via Claude Code CLI
   - Changes are immediately visible in the devcontainer
   - Jekyll livereload automatically refreshes your browser

**Why this workflow?** The devcontainer handles all Jekyll dependencies, while you can use command-line `claude` from your host machine. Both see the same files, and livereload works seamlessly across both.

### Alternative: Docker CLI Commands (Without VS Code)

If you prefer not to use VS Code, you can run Docker commands directly:

1. **Build the Docker image** (first time only):
   ```bash
   docker build -t sproutfund-jekyll .
   ```

2. **Run the development server**:
   ```bash
   docker run --rm -it \
     -v "$(pwd):/srv/jekyll" \
     -p 4000:4000 \
     sproutfund-jekyll \
     bundle exec jekyll serve --config "_config.yml,_config_dev.yml" \
     --host 0.0.0.0 --livereload
   ```

3. **Access the site**:
   - Open your browser to `http://localhost:4000/website_evergreen/`
   - Changes will auto-reload thanks to `--livereload`

### Additional Docker Commands

```bash
# Build for development (faster, useful for testing)
docker run --rm -v "$(pwd):/srv/jekyll" sproutfund-jekyll \
  bundle exec jekyll build --config "_config.yml,_config_dev.yml"

# Build for production
docker run --rm -v "$(pwd):/srv/jekyll" sproutfund-jekyll \
  bundle exec jekyll build

# Incremental builds (faster for small changes)
docker run --rm -it -v "$(pwd):/srv/jekyll" -p 4000:4000 sproutfund-jekyll \
  bundle exec jekyll serve --config "_config.yml,_config_dev.yml" \
  --host 0.0.0.0 --livereload --incremental
```

## Local Development (Alternative)

If you prefer to develop without Docker, you can install dependencies locally.

### Prerequisites

- Ruby 3.3.4 (recommended) or compatible version
- Bundler gem
- Node.js and npm

### Setup

1. **Install Ruby dependencies**:
   ```bash
   bundle install
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

### Development Commands

```bash
# Development server with live reload (recommended)
bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --livereload

# Development server with incremental builds (faster for large sites)
bundle exec jekyll serve --config "_config.yml,_config_dev.yml" --livereload --incremental

# Build for development
bundle exec jekyll build --config "_config.yml,_config_dev.yml"

# Build for production
bundle exec jekyll build
```

The development server will be available at `http://localhost:4000/website_evergreen/`

## Project Structure

### Data-Driven Architecture

This site uses a unique data-driven approach:

```
_data/grants.csv          → Master database of all projects/grants
_plugins/                 → Custom Jekyll plugin (data_page_generator.rb)
_layouts/grant.html       → Template for individual grant pages
                         ↓
                    Generated pages for each grant
```

### Key Directories

```
_data/                    # Data files
  └── grants.csv          # Master database (~40 fields per project)

_plugins/                 # Custom Jekyll plugins
  └── data_page_generator.rb  # Generates pages from CSV data

_layouts/                 # Page templates
  ├── default.html
  ├── program.html
  ├── grant.html
  └── projects-*.html

_includes/                # Reusable components
  ├── navbar.html
  ├── footer.html
  └── ...

program/                  # Program description pages
  ├── 100-days.md
  ├── hive.md
  └── ...

projects/                 # Project index pages
  ├── 2001.md ... 2018.md  # By year
  ├── a.md ... z.md        # By first letter
  └── highlights/

search/                   # Client-side search
  ├── data_programs.json  # Liquid-generated index
  ├── data_projects.json
  └── search.js           # Lunr.js implementation

photos/, logos/           # Static assets
theme/                    # Bootstrap-based theme
```

### Configuration Files

- **_config.yml**: Production configuration (baseurl: `/`)
- **_config_dev.yml**: Development overrides (baseurl: `/website_evergreen`)
- **Gemfile**: Ruby dependencies (uses `github-pages` gem)
- **package.json**: Node dependencies (Lunr.js for search)

## Architecture Details

### Data Page Generation

The custom `data_page_generator.rb` plugin reads `_data/grants.csv` and automatically generates pages for each grant:

```yaml
# Configured in _config_dev.yml
page_gen:
  - data: "grants"            # Source: _data/grants.csv
    template: "grant"         # Layout: _layouts/grant.html
    name: "grant-id"          # Field used for URL/filename
    extension: "txt"
    filter_condition: "record['show-hide'] == 'show'"
```

Only grants with `show-hide` == 'show' are published.

### Grants CSV Schema

The master database contains ~40 fields per project:

- **Identifiers**: `grant-id`, `project-slug`, `wordpress-id`
- **Display**: `project-name`, `year-display`, `short-statement`, `full-description`
- **Organization**: `superprogram`, `program`, `type`, `funding-round`
- **Visibility**: `show-hide`, `featured`
- **Assets**: `photo`, `website`
- **Financial**: `amount`, `amount-numeric`, `date-authorized`

### Content Rendering with Front Matter

Program pages (`program/*.md`) use a **data-driven templating system** that separates content from presentation:

- **Content** lives in YAML front matter within markdown files
- **Structure** is defined by Liquid templates (`_layouts/*.html`, `_includes/page_parts/*.html`)
- **Project data** is automatically loaded from `_data/grants.csv` via `grant-id` references

This architecture enables:
- Content updates without touching HTML/templates
- Consistent styling across all program pages
- Dynamic integration with the grants database
- Flexible page structures through configuration

**Example front matter structure:**

```yaml
layout: program
title: "Program Name"
subtitle: "Brief description"
logo: "/logos/program-name.png"

cover-image:
  source: "/photos/covers/hero.jpg"
  caption: "Photo description"

by-the-numbers:
  - heading: "Total Investment"
    data: "$982,000"

context:
  heading: "Program Overview"
  details:
    - "Program description paragraph 1"
    - "Program description paragraph 2"

highlights:
  - title: "Funded Projects"
    features:
      - grant-id: "ABC-123"    # Auto-populated from grants.csv
      - grant-id: "ABC-124"

acknowledgements:
  - title: "Supporters"
    items: ["Organization Name", "Partner Org"]
```

**📖 For complete documentation on front matter fields, template mappings, and examples, see [FRONTMATTER_GUIDE.md](FRONTMATTER_GUIDE.md)**

### Search Implementation

Client-side search using Lunr.js:
- Jekyll generates search indexes at build time (`search/data_*.json`)
- Lunr.js provides fast, client-side full-text search
- No server-side search infrastructure needed

## Important Development Notes

- **CSV Changes**: Modifications to `_data/grants.csv` require a rebuild to generate updated pages
- **Baseurl Difference**: Production uses `/`, development uses `/website_evergreen`
- **Asset Management**: Photos, logos, and theme files are preserved in `_site/` via `keep_files` configuration
- **URL Structure**: `page_gen-dirs: true` creates directory-based URLs (`/name/` instead of `/name.html`)

## Jekyll Plugins

- **github-pages**: GitHub Pages dependencies
- **jekyll-redirect-from**: URL redirects
- **jekyll-seo-tag**: SEO meta tags
- **jekyll-sitemap**: Sitemap generation
- **jemoji**: Emoji support
- **data_page_generator** (custom): CSV-to-page generation

## Contributing

When making changes:

1. Test locally using Docker or local development setup
2. Verify both development and production builds
3. Check that search indexes update properly
4. Ensure CSV changes don't break page generation

## License

See [LICENSE.md](LICENSE.md) for details.

## Repository

[github.com/sproutfund/website_evergreen](https://github.com/sproutfund/website_evergreen)
