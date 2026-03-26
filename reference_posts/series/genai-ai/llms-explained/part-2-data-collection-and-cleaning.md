---
title: "LLMs explained (Part 2): How LLMs collect and clean training data"
subtitle: "You can't train a great AI on junk data. So how do companies collect, clean, and process the trillions of words that fuel modern LLMs?"
author: Jose Parreño Garcia
published: 2025-04-26
source: https://joseparreogarcia.substack.com/p/llms-explained-part-2-data-collection-cleaning
theme: genai-ai
type: series
series: LLMs Explained
series_part: 2
---

# LLMs explained (Part 2): How LLMs collect and clean training data

*You can't train a great AI on junk data. So how do companies collect, clean, and process the trillions of words that fuel modern LLMs?*

---

I know plenty of data scientists who get all hyped up about training models but cringe when it's time to clean data. Like it or not: **garbage in, garbage out** applies just as much to LLMs as it does to classical machine learning.

This post zooms in on the first — and often overlooked — stage of building an LLM: data collection and cleaning. In many ways, this step is just as important as the model itself.

---

## How much data do you actually need?

First, let's clarify two fundamental concepts:

**Parameters:** The internal "knobs" the model adjusts during training. Each parameter is a weight in the neural network. Modern LLMs have billions to trillions.

**Tokens:** The units of text the model processes. A token is roughly ¾ of a word. GPT-4 is estimated to have been trained on ~13 trillion tokens.

The internet contains an estimated 180+ zettabytes of data (one zettabyte = one trillion gigabytes). Even if only 10% is useful text, the volume available is not the problem.

The problem is what that text looks like.

---

## Two problems with internet data

**Problem 1: How webpages are formatted**

Raw HTML is not clean text. Scrapers ingest ads, sidebars, navigation menus, JavaScript, and all kinds of junk alongside the actual content. Converting a webpage into usable training text requires stripping and normalising all of that.

**Problem 2: The quality of what's on the internet**

Wouldn't it be a fun experiment to build an LLM on Reddit data alone? Fun, sure. Useful? Questionable. Spam, misinformation, low-quality content, and duplicate pages all need to be filtered out. Not all data sources are equal.

---

## What OpenAI's GPT-3 paper reveals

OpenAI's *"Language Models are Few-Shot Learners"* paper gives us a rare public glimpse into their data choices:

- **Before filtering:** 45TB of compressed plaintext (~90TB uncompressed)
- **After filtering:** 570GB

The breakdown of sources by learning weight:

| Source | Volume | Learning weight |
|--------|--------|----------------|
| CommonCrawl | ~400GB | Low (volume, lower quality) |
| WebText2 (Reddit-linked) | ~19GB | High |
| Books1 + Books2 | ~67GB | High |
| Wikipedia | ~10GB | High |

**The key insight:** CommonCrawl contributes the most data by volume, but the model spends *more time learning from* higher-quality sources like Wikipedia, books, and curated web content. Quality beats quantity.

[Visual: table | GPT-3 paper | data source breakdown — showing volume vs learning epochs across sources]

---

## FineWeb: the open-source window into how it's done

OpenAI, Anthropic, and other labs use proprietary methods to refine their datasets. Most of it happens behind NDA walls.

**FineWeb** is an open-source initiative from HuggingFace designed to replicate this high-quality dataset curation process — making the cleaning pipeline visible and reproducible.

**FineWeb stats:**
- 15 trillion tokens
- 44TB disk space
- Derived from 96 CommonCrawl snapshots
- Models trained on FineWeb outperform those trained on C4, Dolma, The Pile, SlimPajama, RedPajama2

**FineWeb's cleaning pipeline includes:**
- URL filtering (block known low-quality or adult domains)
- Language detection (keep only target languages)
- Boilerplate removal (strip nav, menus, headers)
- Quality scoring using a trained classifier
- Near-duplicate deduplication
- Content-based filtering for harmful or toxic material

[Visual: diagram | FineWeb / HuggingFace | pipeline illustration — showing how each cleaning step improves data quality scores]

FineWeb is one of the best public windows into how companies like OpenAI prepare data at scale. It reveals best practices and offers a reproducible framework that the broader research community can use and improve upon.

---

## Key takeaway

The model you get out is a function of the data you put in. The billions of parameters in an LLM can only learn patterns that exist in the training corpus. If that corpus is full of spam, misinformation, and low-quality writing, the model reflects that.

The teams that build the best models invest as much in data curation as in architecture and training compute.

*Continues in [Part 3: How LLMs learn — from tokens to training](./part-3-from-tokens-to-training.md)*
