---
title: Multilingual Citation Miner
summary: Natural-language processing pipeline that extracts multilingual citations from PDF proceedings to improve bibliometric coverage for underrepresented venues.
status: past
period: 2022 to 2023
order: 2
tech:
  - Python
  - spaCy
  - PostgreSQL
highlights:
  - Combined document parsing with language-aware entity extraction.
  - Produced reviewable citation candidates instead of opaque automated matches.
metadata:
  - label: Role
    value: Research engineer
  - label: Focus
    value: Scholarly infrastructure
---

## Research question

How can bibliographic pipelines recover useful citation records from proceedings that are poorly represented in dominant scholarly indexes?

## Approach

The pipeline separates PDF extraction, language-aware parsing, and candidate review. That separation made it possible to improve individual stages without rebuilding the entire workflow and kept uncertain matches visible to researchers.

## Outcome

The project established a reproducible route from heterogeneous proceedings to structured citation candidates. Its strongest contribution was methodological: automation accelerated review while human judgment remained part of the evidence chain.
