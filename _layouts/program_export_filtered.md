---
layout: null
---
{%- comment -%}
This layout exports program page frontmatter to Markdown format with optional filtering and sorting.
It resolves grant-id references from _data/grants.csv just like the website does.

Parameters (set in page frontmatter):
- filter_superprogram: String to filter by superprogram (e.g., "Community"), or null for all programs
- sort_by_earliest_year: Boolean to sort programs by their earliest year
{%- endcomment -%}

{%- comment -%}{{ content }}{%- endcomment -%}

{%- comment -%} Step 1: Collect all program pages {%- endcomment -%}
{%- assign all_programs = "" | split: "" -%}
{%- for program_page in site.pages -%}
  {%- if program_page.path contains 'program/' and program_page.path contains '.md' and program_page.layout == 'program' and program_page.sitemap != false -%}
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
  {%- comment -%}
  Sort by earliest_year field using Liquid's built-in sort filter.
  All program pages now have an earliest_year field in frontmatter.
  {%- endcomment -%}
  {%- assign programs = programs | sort: "earliest_year" -%}
{%- endif -%}

{%- comment -%} Step 4: Render each program using the same logic as program_export.md {%- endcomment -%}
{%- for program_page in programs -%}

# {{ program_page.title | smartify }}

## Metadata

- **Subtitle:** {{ program_page.subtitle | smartify }}
- **Description:** {{ program_page.description | smartify }}
- **Program:** {{ program_page.program | smartify }}
{%- if program_page.superprogram %}
- **Superprogram:** {{ program_page.superprogram | smartify }}
{%- endif %}
{%- if program_page.years %}
- **Years:** {{ program_page.years | join: ', ' }}
{%- endif %}
{%- if program_page.logo %}
- **Logo:** {{ site.baseurl }}{{ program_page.logo }}
{%- endif %}
{%- if program_page.keywords and program_page.keywords != '' %}
- **Keywords:** {{ program_page.keywords }}
{%- endif %}
- **URL:** {{ site.baseurl }}/program/{{ program_page.title | slugify }}/

{%- if program_page.cover-image %}

### Cover Image

- **Source:** {{ site.baseurl }}{{ program_page.cover-image.source }}
- **Caption:** {{ program_page.cover-image.caption | smartify }}
{%- if program_page.cover-image.subcaption %}
- **Subcaption:** {{ program_page.cover-image.subcaption | smartify }}
{%- endif %}
{%- if program_page.cover-image.credit %}
- **Credit:** {{ program_page.cover-image.credit | strip_html | smartify }}
{%- endif %}
{%- endif %}

{%- if program_page.video %}

### Video

- **URL:** {{ program_page.video.url | replace_first: 'https://www.youtube-nocookie.com/embed/', 'https://www.youtube.com/watch?v=' | remove_last: '?rel=0' }}
- **Title:** {{ program_page.video.title | smartify }}
- **Caption:** {{ program_page.video.caption | smartify }}
{%- if program_page.video.duration %}
- **Duration:** {{ program_page.video.duration }}
{%- endif %}
{%- if program_page.video.date %}
- **Date:** {{ program_page.video.date }}
{%- endif %}
{%- if program_page.video.thumbnail %}
- **Thumbnail:** {{ site.baseurl }}{{ program_page.video.thumbnail }}
{%- endif %}
{%- endif %}

{%- if program_page.context %}

## Context

**{{ program_page.context.heading | smartify }}**

{%- for detail in program_page.context.details %}

{{ detail | smartify }}
{%- endfor %}
{%- endif %}

{%- if program_page.by-the-numbers %}

## By the Numbers
{{ "" }}
{%- for stat in program_page.by-the-numbers %}
- **{{ stat.heading | smartify }}:** {{ stat.data | smartify }}
{%- if stat.link %} ([link]({{ stat.link | replace_first: 'local:/', site.baseurl }})){%- endif %}
{%- endfor %}
{%- endif %}

{%- if program_page.highlights %}

## Highlights

{%- for highlight in program_page.highlights %}

### {{ highlight.title | smartify }}

{%- if highlight.description %}
{%- for desc in highlight.description %}

{{ desc | smartify }}

{%- endfor %}
{%- endif %}

{%- if highlight.sections %}
{%- for section in highlight.sections %}

#### {{ section.title | smartify }}

{%- if section.description %}
{%- for desc in section.description %}

{{ desc | smartify }}

{%- endfor %}
{%- endif %}

{%- if section.features %}
{%- for feature in section.features %}

{%- if feature.grant-id %}
{%- assign grant = site.data.grants | where: 'grant-id', feature.grant-id | first %}
{%- if grant %}

- **{{ feature.title | default: 'Feature' | smartify }}**: {{ grant.short-statement | strip | smartify }} *{{ feature.grant-id }}*{%- if grant.photo %} [image]({{ site.baseurl }}{{ grant.photo }}){%- endif %}
{%- endif %}
{%- else %}

- **{{ feature.title | default: 'Feature' | smartify }}**: {{ feature.description | strip | smartify }} {%- if feature.image %} [image]({{ site.baseurl }}{{ feature.image }}){%- endif %}{%- if feature.link %} [link]({{ feature.link | replace_first: 'local:/', site.baseurl }}){%- endif %}
{%- endif %}
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- endif %}

{%- if highlight.features %}
{%- for feature in highlight.features %}

{%- if feature.grant-id %}
{%- assign grant = site.data.grants | where: 'grant-id', feature.grant-id | first %}
{%- if grant %}

- **{{ feature.title | default: 'Feature' | smartify }}**: {{ grant.short-statement | strip | smartify }} *{{ feature.grant-id }}*{%- if grant.photo %} [image]({{ site.baseurl }}{{ grant.photo }}){%- endif %}
{%- endif %}
{%- else %}

- **{{ feature.title | default: 'Feature' | smartify }}**: {{ feature.description | strip | smartify }} {%- if feature.image %} [image]({{ site.baseurl }}{{ feature.image }}){%- endif %}{%- if feature.link %} [link]({{ feature.link | replace_first: 'local:/', site.baseurl }}){%- endif %}
{%- endif %}

{%- endfor %}
{%- endif %}

{%- endfor %}
{%- endif %}

{%- if program_page.acknowledgements %}

## Acknowledgements

{%- for ack in program_page.acknowledgements %}
{%- if ack.stacked %}
{%- for stacked_item in ack.stacked %}

### {{ stacked_item.title | smartify }}

{%- for item in stacked_item.items %}
- {{ item | smartify | replace_first: '|', ', ' }}
{%- endfor %}
{%- endfor %}
{%- else %}

### {{ ack.title | smartify }}

{%- if ack.divided %}
{%- for division in ack.divided %}
{%- for item in division.items %}
- {{ item | smartify | replace_first: '|', ', ' }}
{%- endfor %}
{%- endfor %}
{%- else %}
{%- for item in ack.items %}
- {{ item | smartify | replace_first: '|', ', ' }}
{%- endfor %}
{%- endif %}
{%- endif %}
{%- endfor %}
{%- endif %}

{{ "" }}
---
{{ "" }}
{{ "" }}
{%- endfor %}
