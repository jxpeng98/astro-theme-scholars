# Changelog

All notable changes to this project will be documented in this file.

## 0.3.0 - 2025-12-11

### Features

- **UI Redesign ("Soft Modern"):**
  - Overhauled the entire card design language across the site (Home, About, Projects, Teaching, Researches, Posts).
  - **Styles:** Removed hard borders (`border-gray-200`) in favor of soft shadows (`shadow-sm` -> `hover:shadow-md`).
  - **Geometry:** Increased border radius to `rounded-2xl` for a more modern, friendly aesthetic.
  - **Spacing:** Increased internal card padding (standardized to `p-6`) to improve readability and "breathing room".

- **Homepage:**
  - Redesigned the "Recent Posts" section from a simple list to a **grid card layout** to match the visual weight of the "Selected Publications" section.

- **Configuration:**
  - Added `profileImageWidth` and `profileImageHeight` support in `siteConfig` (and `types/config.ts`) to allow precise pixel-level control over the hero image dimensions (replacing the previous CSS class-based approach).
  - Added configurable Page Titles and Descriptions in `siteConfig` for better customization without editing templates.

### Improvements

- **About Page:** Updated layout for Education, Experience, Service, and Award sections to strictly align with the new card styling.
- **Projects & Teaching:** Refined "Active" and "Past" section cards to ensure visual consistency with the rest of the site.
- **Researches Page:** Adjusted padding specifically for this page (`pl-8`) to perfectly accommodate index badges within the new borderless design.
- **Reliability:** Enhanced Astro templates to gracefully handle missing YAML fields (optional chaining) to prevent build errors.
