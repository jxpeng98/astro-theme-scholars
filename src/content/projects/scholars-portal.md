---
title: Scholars Portal
subtitle: Template infrastructure for academic homepages
summary: Source-available portal that brings publications, talks, teaching materials, and projects into one maintainable academic profile.
status: active
period: 2023 to Present
order: 1
featured: true
cover: ../../assets/projects/scholars-portal.png
coverAlt: Desktop view of the Scholars academic portfolio homepage
badges:
  - Template
  - Open source
tech:
  - Astro
  - TypeScript
  - Content Collections
highlights:
  - Keeps publications, posts, and project metadata in simple content files.
  - Supports release-tagged updates for downstream personal sites.
metadata:
  - label: Role
    value: Maintainer
  - label: Audience
    value: Researchers
links:
  - label: Repository
    href: https://github.com/jxpeng98/astro-theme-scholars
  - label: Documentation
    href: https://github.com/jxpeng98/astro-theme-scholars#readme
---

## Why it exists

Academic websites often begin as a small profile and become difficult to maintain as publications, teaching, talks, and service accumulate. Scholars Portal keeps those records close to the site while preserving a calm, readable public interface.

## What I contributed

I shaped the information architecture, the content model, and the reusable theme layer. The current system favors native Astro features so an individual researcher can update the site without maintaining an application backend.

## How it works

Content collections validate long-form records at build time. Shared layouts handle navigation, metadata, accessibility, and responsive presentation, while each collection retains the fields its content actually needs.

The result is a source-available starting point that can grow with a scholarly career without turning routine editing into frontend work.
