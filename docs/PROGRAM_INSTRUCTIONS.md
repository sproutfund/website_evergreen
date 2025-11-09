# Program Page Content Instructions

This guide provides comprehensive instructions for creating new program pages for The Sprout Fund's archival website. It is based on the content patterns, structure, and style observed in the complete program pages.

---

## Prompt

> Use the attached [files] and content instructions to create the text for a draft program page for [program name]. Include recommendations for multimedia content and photos. Output as a new Markdown artifact.
> If you require additional information to complete the task, please ask me clarifying questions.

---

## Guiding Principles

Before creating a new program page, keep these core principles in mind:

* **Tone:** The writing should be professional, celebratory, and reflective. This is an archive, so write in the past tense. The goal is to document *what* the program did, *why* it was important, and *what* its impact was.
* **Completeness:** Aim to fill every section. Missing information (like funders or partners) should be a last resort.
* **Consistency:** Adhere strictly to the headings and formatting outlined in this guide.

---

## Table of Contents

1. [Content Structure Overview](#content-structure-overview)
2. [Metadata Section](#metadata-section)
3. [Context Section](#context-section)
4. [By the Numbers Section](#by-the-numbers-section)
5. [Highlights Section](#highlights-section)
6. [Acknowledgements Section](#acknowledgements-section)
7. [Writing Style Guidelines](#writing-style-guidelines)
8. [Content Template](#content-template)
9. [Complete Examples](#complete-examples)

---

## Content Structure Overview

Every program page should follow this consistent structure:

```
# Program Name

## Metadata
## Context
## By the Numbers
## Highlights
## Acknowledgements
```

### Section Hierarchy

- **H1 (`#`)**: Program name only
- **H2 (`##`)**: Major sections (Metadata, Context, By the Numbers, Highlights, Acknowledgements)
- **H3 (`###`)**: Subsections within major sections (e.g., "Funded Project Highlights", "Community Events")
- **H4 (`####`)**: Categories within subsections (e.g., "Regional Projects", "Grassroots Projects")

---

## Metadata Section

The Metadata section provides structured information about the program. All fields should be included even if some are empty.

### Required Fields

```markdown
## Metadata

- **Subtitle:** [One-sentence tagline describing the program's purpose]
- **Description:** [2-4 sentence overview of the program, its goals, and impact]
- **Program:** [Program name as it appears in grants.csv]
- **Superprogram:** [Category: Community, Learning, Public Art]
- **Years:** [Comma-separated list of years, e.g., "2014, 2015, 2016"]
- **Logo:** [URL to logo image]
- **URL:** [Canonical URL on sproutfund.org]
```

**Important:** Cover Image and Video are H3 subsections (###) nested under the Metadata H2 section (##), not standalone H2 sections.

### Cover Image Subsection

```markdown
### Cover Image

- **Source:** [URL to cover photo]
- **Caption:** [Description of what the photo shows]
- **Subcaption:** [Location and date in format: "Location, Month Year"]
- **Credit:** [Photo credit in format: "photo: Photographer Name"]
```

**Caption Style Guidelines:**
- Be descriptive and specific
- Use present tense when describing ongoing action in the photo
- Include context that connects to the program's mission
- Examples:
  - "100 Days supporters proudly display the final program poster at the Day 100 Party"
  - "Young Naturalists spend summer outdoors learning about the environment and gaining unique work experience"

### Video Subsection (Optional)

*This section is optional. Remove it entirely if no video is available for the program.*

```markdown
### Video

- **URL:** [YouTube embed URL with ?rel=0 parameter]
- **Title:** [Video title - may include HTML tags like <em>]
- **Caption:** [1-2 sentence description of video content]
- **Duration:** [Length in minutes/seconds, e.g., "90 seconds", "4 minutes", "6½ minutes"]
- **Thumbnail:** [URL to video thumbnail image]
```

**Video Guidelines:**
- Always include the `?rel=0` parameter in YouTube URLs to prevent related videos
- Keep captions concise but informative
- Use natural language for duration (not "0:90" but "90 seconds")

---

## Context Section

The Context section tells the story of the program. This is the heart of the narrative content.

### Structure

```markdown
## Context

**[Bold opening statement or program tagline]**

[3-6 paragraphs telling the program story, following this arc:]
1. The need or opportunity that led to the program
2. How the program was designed and implemented
3. Key activities and approaches
4. Outcomes and impact
5. Legacy or lasting influence
```

### Content Guidelines

**Opening Statement:**
- Bold the opening 3-8 word statement
- Should capture the essence of the program
- Examples:
  - "**Powering local solutions to pressing national concerns**"
  - "**Turning the entire city into a campus for learning**"
  - "**Pittsburgh is a place where we all belong.**"

**Narrative Flow:**

Write 3-6 paragraphs following this story arc:

1. **Paragraph 1: The "Why"** - Set the scene. What was the problem, opportunity, or community need that inspired this program? What was happening in Pittsburgh/the region?
   
2. **Paragraph 2: The "What"** - Describe what the program *was*. Was it a grant program? A series of events? A public art initiative? What activities did it include?

3. **Paragraph 3: The "How"** - Explain the process. How were projects selected? Did you use public voting, community advisors, or a jury? What was Sprout's role in implementation?

4. **Remaining Paragraphs: The "Result"** - Detail the scale, achievements, and specific numbers. Conclude with the overall outcome, impact, and legacy. What changed? What was learned?

**Writing Style:**
- Use past tense (the programs are completed)
- Be specific with numbers, dates, and names
- Include partner organizations and key collaborators
- Show don't just tell - use concrete examples
- Maintain a tone that is professional but warm and community-focused

**Length:** 
- Aim for 300-600 words (4-8 paragraphs)
- Shorter programs (1 year): 300-400 words
- Multi-year programs: 500-600 words

---

## By the Numbers Section

This section provides key metrics and statistics about the program at a glance. This is a high-impact, scannable list of key metrics using a "Key: Value" format. Add or remove items as needed based on what's most relevant to your program, but include common metrics for consistency across programs.

### Structure

```markdown
## By the Numbers

- **Year Active:** [Single year or range, e.g., "2017" or "2014–2016"]
- **[Metric Name]:** [Value and context]
- **[Metric Name]:** [Value and context]
- **[Metric Name]:** [Value and context]
```

### Guidelines

**Metric Selection:**
Include 4-8 of the most significant metrics that tell the program's story. Common metrics include:

- Financial metrics:
  - Total Investment
  - Crowdfunding Raised
  - Average Grant Size
  
- Participation metrics:
  - Funded Projects
  - Participating Organizations
  - Youth Engaged / Participants
  - Volunteers / Community Advisors
  
- Reach metrics:
  - Neighborhoods Engaged
  - Counties Served
  - Online Votes
  - Event Attendees
  
- Output metrics:
  - Murals Created / Badges Earned / etc.
  - Publications / Resources Developed

**Formatting:**
- Use bold for metric names
- Include units and context
- Use consistent number formatting:
  - Use commas for thousands (1,000+)
  - Round to whole numbers unless precision matters
  - Use "+" for approximate counts (6,000+)
  - Use "–" (en dash) for ranges
  
**Examples:**
- `**Total Investment:** $982,000`
- `**Funded Projects:** 100`
- `**Geography:** 14 counties of Southwestern PA`
- `**Youth Participants:** 6,000+`
- `**Online Votes:** 41,000`

---

## Highlights Section

The Highlights section showcases the most compelling projects, activities, and outcomes. This is often the longest section.

### Overall Structure

```markdown
## Highlights

### [Subsection Name]

[Optional introductory paragraph]

#### [Category Name if applicable]

[Optional category description]

- **[Project/Activity Name]**: [Description]. *[Grant ID if applicable]* [image](URL)
```

### Common Subsections

#### 1. Funded Project Highlights

**Purpose:** Showcase representative projects that capture the diversity and impact of the program.

**Guidelines:**
- Select 8-12 exemplary projects
- Represent diverse approaches, geographies, or topics
- Include both well-known successes and community favorites
- Group into thematic categories if applicable

**Format:**
```markdown
### Funded Project Highlights

[Optional: 1-2 sentence overview of the types of projects funded]

#### [Category Name] (if using categories)

[Optional: 1 sentence about this category]

- **Project Name**: Description of project purpose and activities. *GRANT-ID* [image](URL)
```

**Description Guidelines:**
- Start with a gerund (verb + -ing) or action verb
- Focus on what the project accomplished, not just what it intended
- Keep to 1-2 sentences (20-40 words)
- Include tangible details
- Use language that conveys community impact

**Examples:**
- "**#PGHYouthVision**: Sharing youth perspectives about the future of our region with policymakers and organizers through data collection, a media campaign, and a town hall event."
- "**Prototype Workshop Series**: Breaking down gendered stereotypes through feminist workshops in making, engineering, and self-advocacy."
- "**The Soil Superheroes**: Investigating soil lead levels in Homewood through youth-led exploration and research."

#### 2. Program Activities / Programmatic Activities

**Purpose:** Document major events, processes, and community engagement activities.

**Guidelines:**
- Include 3-8 major activities
- Can be grouped by type or presented chronologically
- Include context about scale and participation

**Format:**
```markdown
### Programmatic Activities

- **Activity Name**: Description of what happened, who participated, and what was achieved. [image](URL)
```

**Examples:**
- "**Applicant Support**: Sprout helped applicants develop their two-minute video pitches with the help of Sprout staff and a professional photographer."
- "**Day 100 Party**: On the 100th day, Sprout hosted a public open house to celebrate and showcase the funded projects' activities and achievements."

#### 3. Community Building Activities / Events

**Format for standalone events:**
```markdown
#### [Event Name]

[1-2 paragraph description of the event, its purpose, scale, and outcomes]

- **Feature**: [Optional detail] [image](URL)
```

#### 4. Competencies / Resources / Downloads

**Purpose:** Document tangible outputs like lesson plans, toolkits, research, or frameworks.

**Format:**
```markdown
### [Resource Category Name]

[Overview paragraph explaining the resources]

- **Resource Name**: Description. [image](URL) [link](URL)
```

#### 5. Related Programs

**Purpose:** Connect programs that have meaningful relationships.

**Format:**
```markdown
### Related Programs

- **Program Name**: Brief description of how it relates to this program. [image](logo-URL) [link](program-URL)
```

---

## Acknowledgements Section

The Acknowledgements section recognizes all organizations and individuals who made the program possible.

### Structure

```markdown
## Acknowledgements

### Supporters
[List of funding organizations]

### Partners
[List of partner organizations]

### [Additional Categories as Needed]
[Context-specific groups]

### Staff
[List of Sprout staff, with years if relevant]
```

### Guidelines

**Formatting:**
- Use unordered lists (bullets with `-`)
- List items in a logical order (alphabetical, by contribution size, or by significance)
- For staff with partial tenure: add years in format ", YYYY" or ", YYYY-YYYY"

**Common Additional Categories:**
- Jury / Advisory Committee
- Community Connections Committee Co-Chairs
- Moderators / Facilitators
- Interns / Fellows

**Examples:**

```markdown
### Supporters
- The Heinz Endowments
- Allegheny County
- Urban Redevelopment Authority of Pittsburgh
- Crowdrise campaign donors

### Partners
- Carnegie Library of Pittsburgh
- Union Project

### Staff
- Cathy Lewis Long
- Matt Hannigan
- Diana Avart
- Ryan Coon
- Victoria Zuber, intern
```

---

## Writing Style Guidelines

### Voice and Tone

**Professional but Warm:**
- Celebrate achievements without hyperbole
- Acknowledge community contributions
- Show respect for all participants
- Be specific and concrete

**Past Tense:**
- Programs are complete, so use past tense consistently
- Exception: When referring to ongoing legacies or current availability of resources

### Language Patterns

**Action-Oriented:**
- Lead with strong verbs
- Focus on what was accomplished
- Describe tangible activities and outcomes

**Community-Centered:**
- Emphasize people and collaboration
- Name specific organizations and partners
- Show how the work connected people

**Specific Over General:**
- Use concrete numbers, dates, locations
- Name neighborhoods, schools, organizations
- Describe actual activities, not just intentions

### Formatting Conventions

**Lists:**
- Use unordered lists (bullet points) for most content
- Maintain parallel structure within a list
- Keep list items to 1-3 lines when possible

**Emphasis:**
- Use **bold** for opening statements, metric names, and section emphasis
- Use *italics* sparingly (mainly for publication titles, technical terms)
- Use HTML tags (`<em>`, `<strong>`) when needed in titles

**Numbers:**
- Spell out numbers one through nine
- Use numerals for 10 and above
- Use commas in thousands (1,000+)
- Format currency with $ and commas
- Use en dash (–) for ranges without spaces

**Links:**
- Image links: `[image](URL)`
- External links: `[link](URL)` 
- Include actual working URLs, not placeholders

---

## Content Template

Use this template as a starting point for new program pages:

```markdown
# [Program Name]

## Metadata

- **Subtitle:** [One-sentence program tagline]
- **Description:** [2-4 sentences providing overview, goals, and key impact]
- **Program:** [Program name as it appears in database]
- **Superprogram:** [Community / Learning / Public Art]
- **Years:** [Year(s) program was active]
- **Logo:** https://www.sproutfund.org/logos/[program-slug].png
- **URL:** https://www.sproutfund.org/program/[program-slug]/

### Cover Image

- **Source:** https://www.sproutfund.org/photos/covers/[program-slug].jpg
- **Caption:** [Descriptive caption of image content]
- **Subcaption:** [Location, Month Year]
- **Credit:** photo: [Photographer Name]

### Video

- **URL:** https://www.youtube.com/watch?v=[VIDEO-ID]?rel=0
- **Title:** [Video Title]
- **Caption:** [1-2 sentence video description]
- **Duration:** [X minutes/seconds]
- **Thumbnail:** https://www.sproutfund.org/photos/video_thumbnails/[program-slug].jpg

## Context

**[Bold opening statement]**

[First paragraph: Set the scene - what was the need or opportunity?]

[Second paragraph: Describe how the program was designed and who Sprout partnered with]

[Middle paragraphs: Detail the key activities, processes, and scale of the program]

[Final paragraph: Capture the lasting impact and what was learned]

## By the Numbers

- **Years Active:** [YYYY or YYYY–YYYY]
- **Total Investment:** $[amount]
- **Funded Projects:** [number]
- **[Other Key Metric]:** [value]
- **[Other Key Metric]:** [value]
- **[Other Key Metric]:** [value]

## Highlights

### Funded Project Highlights

[Brief overview of funded project portfolio]

#### [Category Name if using categories]

[Optional category description]

- **Project Name**: Description of project activities and impact. *GRANT-ID* [image](https://www.sproutfund.org/photos/projects/[project-slug].jpg)

- **Project Name**: Description of project activities and impact. *GRANT-ID* [image](URL)

[Additional projects...]

### Programmatic Activities

[Optional overview paragraph]

- **Activity Name**: Description of the activity, who participated, and outcomes. [image](URL)

[Additional activities...]

### [Additional Subsections as Needed]

## Acknowledgements

### Supporters
- [Funding organization]
- [Funding organization]

### Partners
- [Partner organization]
- [Partner organization]

### Staff
- [Staff name]
- [Staff name, years if partial tenure]
```

---

## Complete Examples

The following programs serve as excellent models for complete, well-structured content:

### Exemplary Complete Programs

1. **100 Days of US** - Excellent context narrative, diverse project highlights, comprehensive acknowledgements
2. **City of Learning** - Complex multi-year program with excellent categorization of projects and activities
3. **Community Connections** - Masterful storytelling, geographic diversity, thorough documentation
4. **Hive** - Strong integration of related programs, good use of categories
5. **One Northside** - Clear program structure, excellent community event documentation

### Key Strengths to Emulate

**From 100 Days:**
- Compelling opening that establishes urgency
- Specific numbers throughout (150 applications, 41,000 votes, 60 advisors)
- Project highlights organized by theme with concrete impact descriptions

**From City of Learning:**
- Multi-level categorization (Out-of-School, In Classrooms, Events)
- Integration of research and evaluation findings
- Comprehensive related programs section

**From Community Connections:**
- Regional scope clearly articulated
- Two-tier project structure (Regional and Grassroots)
- Strong sense of process (ideation → selection → execution → documentation)

**From Hive:**
- Clear connection to broader movement (Hive Learning Networks)
- Resource development and sharing (lesson plans, downloads)
- Good balance of local and global perspectives

---

## Additional Notes

### Images

- All images should have working URLs to sproutfund.org domain
- Use consistent naming conventions
- Projects: `/photos/projects/[project-slug].jpg`
- Programs: `/photos/programs/[program-slug]/[image-name].jpg`
- Covers: `/photos/covers/[program-slug].jpg`

### Grant IDs

- Format: `*GRANT-ID*` in italics after project description
- Include when referencing funded projects
- Examples: `*3119-100DAYS*`, `*2372-COL*`, `*PGH250-321*`

### Cross-References

- Link to related programs when relevant
- Use consistent link format: `[link](program-URL)`
- Include program logo images in related programs section

### Placeholder Content to Avoid

- "NEED TO ADD" - ensure all content is complete
- Empty descriptions
- Generic text that could apply to any program
- Missing metrics in "By the Numbers"

### Quality Checks

Before finalizing a program page, verify:

- [ ] All required metadata fields are complete
- [ ] Context section tells a complete story (300+ words)
- [ ] At least 5 metrics in "By the Numbers"
- [ ] At least 6 project/activity highlights
- [ ] All acknowledgements sections have content (missing information is a last resort)
- [ ] All image URLs are complete and working
- [ ] Grant IDs are included for funded projects
- [ ] Writing is in consistent past tense
- [ ] Numbers are formatted consistently
- [ ] No placeholder text remains

---

## Markdown Conventions

### Headers
```markdown
# Program Name (H1)
## Major Section (H2)
### Subsection (H3)
#### Category (H4)
```

### Lists
```markdown
- Bullet point
- Bullet point
  - Sub-bullet (2 spaces indent)
```

### Emphasis
```markdown
**Bold text**
*Italic text*
<em>HTML emphasis</em>
<strong>HTML strong</strong>
```

### Links
```markdown
[image](URL)
[link](URL)
```

### Special Characters
- Em dash: `—` (for parenthetical thoughts)
- En dash: `–` (for ranges: 2014–2016)
- Ampersand: `&amp;` (HTML entity in some contexts)
- Less than: `&lt;` (HTML entity when needed)
- Greater than: `&gt;` (HTML entity when needed)

---

## Final Thoughts

The goal of these program pages is to:

1. **Document** the breadth and depth of Sprout's work
2. **Celebrate** the people and projects that made each program special
3. **Preserve** institutional knowledge and best practices
4. **Inspire** future community work in Pittsburgh and beyond

Write with these purposes in mind, and always ask: "Does this content honor the people who made this program happen and help readers understand its significance?"
