#!/usr/bin/env python3
"""
Local SEO Article Generator using Ollama LLM.

Reads keywords.json, generates SEO-optimized Markdown articles via a local
Ollama model, saves them in the Astro content directory, and pushes to GitHub.

Usage:
    python scripts/local_generate.py                  # Generate next priority article
    python scripts/local_generate.py --all            # Generate all pending articles
    python scripts/local_generate.py --keyword "xyz"  # Generate a specific keyword
    python scripts/local_generate.py --dry-run        # Preview without saving/pushing
"""

import json
import os
import re
import subprocess
import sys
import argparse
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError

# === CONFIGURATION ===
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma2"  # or "llama3", "mistral", "phi3"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / "src" / "content" / "blog"
KEYWORDS_FILE = PROJECT_ROOT / "keywords.json"
GENERATED_LOG = PROJECT_ROOT / "scripts" / ".generated.json"


def load_keywords():
    """Load keywords configuration."""
    with open(KEYWORDS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_generated():
    """Load list of already generated slugs."""
    if GENERATED_LOG.exists():
        with open(GENERATED_LOG, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"generated": []}


def save_generated(data):
    """Save list of generated slugs."""
    with open(GENERATED_LOG, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def call_ollama(prompt: str, model: str = OLLAMA_MODEL) -> str:
    """Call local Ollama API and return the full response text."""
    payload = json.dumps({
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.7,
            "top_p": 0.9,
            "num_predict": 8192,
        }
    }).encode("utf-8")

    req = Request(
        OLLAMA_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("response", "")
    except URLError as e:
        print(f"ERROR: Cannot reach Ollama at {OLLAMA_URL}")
        print(f"  Make sure Ollama is running: ollama serve")
        print(f"  And the model is pulled: ollama pull {model}")
        print(f"  Error: {e}")
        sys.exit(1)


def generate_article(keyword_data: dict, site_config: dict) -> str:
    """Generate a full SEO article in Markdown format via Ollama."""
    keyword = keyword_data["keyword"]
    slug = keyword_data["slug"]
    category = keyword_data["category"]
    language = keyword_data.get("language", "fr")
    today = datetime.now().strftime("%Y-%m-%d")

    prompt = f"""Tu es un expert SEO et rédacteur spécialisé dans les panneaux solaires en France.
Rédige un article de blog complet et optimisé SEO pour le mot-clé : "{keyword}"

CONTRAINTES STRICTES :
- Langue : français
- Longueur : 2500-3000 mots minimum
- Format : Markdown avec frontmatter YAML
- Le frontmatter DOIT suivre EXACTEMENT ce format (entre les --- ) :

---
title: "[Titre SEO optimisé, moins de 60 caractères]"
metaTitle: "[Meta title SEO, moins de 60 caractères]"
metaDescription: "[Meta description, moins de 155 caractères]"
excerpt: "[Résumé accrocheur en 2-3 phrases]"
date: "{today}"
author: "{site_config.get('default_author', 'Équipe Le Panneau Solaire')}"
category: "{category}"
image: "/images/blog/{slug}-hero.webp"
readTime: "18 min"
niche: "panneaux-solaires"
language: "{language}"
tags: ["panneaux solaires", "{keyword.split()[0]}", "2026"]
faq:
  - question: "[Question 1 liée au mot-clé]"
    answer: "[Réponse détaillée de 3-4 phrases]"
  - question: "[Question 2]"
    answer: "[Réponse détaillée]"
  - question: "[Question 3]"
    answer: "[Réponse détaillée]"
  - question: "[Question 4]"
    answer: "[Réponse détaillée]"
  - question: "[Question 5]"
    answer: "[Réponse détaillée]"
---

STRUCTURE DE L'ARTICLE :
1. Introduction engageante (pourquoi ce sujet est important en 2026)
2. Plusieurs sections H2 avec des sous-sections H3
3. Des tableaux de données chiffrées (prix, comparatifs, statistiques)
4. Des blockquotes avec des conseils pratiques (> **Conseil :** ...)
5. Des listes à puces pour la lisibilité
6. Une section finale "Demandez votre étude solaire gratuite" avec ce CTA exact :
   [Demander mon étude gratuite](#form)

RÈGLES :
- Utilise des chiffres concrets et réalistes pour le marché français 2026
- Prix de l'électricité en 2026 : 0,2762 €/kWh
- Prime autoconsommation 2026 : 1 140€ (3 kWc), 1 680€ (6 kWc), 2 340€ (9 kWc)
- Mentionne les installateurs RGE, Enedis, le compteur Linky
- Sois factuel, pas commercial. Ton d'expert bienveillant.
- N'inclus PAS de texte en dehors du frontmatter et du contenu Markdown.
- Commence directement par le frontmatter YAML (---)

Génère l'article complet maintenant :"""

    print(f"  Generating with {OLLAMA_MODEL} (this may take 2-5 minutes)...")
    response = call_ollama(prompt)

    # Clean up the response
    response = response.strip()

    # Ensure it starts with frontmatter
    if not response.startswith("---"):
        # Try to find the frontmatter start
        idx = response.find("---")
        if idx >= 0:
            response = response[idx:]
        else:
            print("  WARNING: No frontmatter detected in LLM output")

    return response


def save_article(content: str, keyword_data: dict) -> Path:
    """Save the generated article to the correct directory."""
    niche = keyword_data.get("niche", "panneaux-solaires")
    language = keyword_data.get("language", "fr")
    slug = keyword_data["slug"]

    # Create directory
    article_dir = CONTENT_DIR / niche / language
    article_dir.mkdir(parents=True, exist_ok=True)

    filepath = article_dir / f"{slug}.md"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    return filepath


def git_push(filepaths: list[Path], message: str = "Auto-post: new SEO article"):
    """Stage, commit, and push changes to GitHub."""
    try:
        for fp in filepaths:
            rel = fp.relative_to(PROJECT_ROOT)
            subprocess.run(["git", "add", str(rel)], cwd=PROJECT_ROOT, check=True)

        # Also add the generated log
        subprocess.run(
            ["git", "add", "scripts/.generated.json"],
            cwd=PROJECT_ROOT, check=True
        )

        subprocess.run(
            ["git", "commit", "-m", message],
            cwd=PROJECT_ROOT, check=True
        )
        subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=PROJECT_ROOT, check=True
        )
        print("  Pushed to GitHub successfully.")
    except subprocess.CalledProcessError as e:
        print(f"  Git error: {e}")
        print("  You may need to push manually: git push origin main")


def get_pending_keywords(config: dict, generated: dict) -> list[dict]:
    """Get keywords that haven't been generated yet, sorted by priority."""
    pending = []
    for niche in config.get("niches", []):
        niche_id = niche["id"]
        for kw in niche.get("keywords", []):
            kw_with_niche = {**kw, "niche": niche_id}
            if kw["slug"] not in generated.get("generated", []):
                pending.append(kw_with_niche)

    # Sort by priority (1 = highest)
    pending.sort(key=lambda x: x.get("priority", 99))
    return pending


def main():
    parser = argparse.ArgumentParser(description="Generate SEO articles with local Ollama LLM")
    parser.add_argument("--all", action="store_true", help="Generate all pending articles")
    parser.add_argument("--keyword", type=str, help="Generate a specific keyword")
    parser.add_argument("--dry-run", action="store_true", help="Preview without saving/pushing")
    parser.add_argument("--model", type=str, default=OLLAMA_MODEL, help=f"Ollama model (default: {OLLAMA_MODEL})")
    parser.add_argument("--no-push", action="store_true", help="Save locally without pushing to git")
    args = parser.parse_args()

    global OLLAMA_MODEL
    OLLAMA_MODEL = args.model

    print("=" * 60)
    print("  LOCAL SEO ARTICLE GENERATOR")
    print(f"  Model: {OLLAMA_MODEL} | Ollama: {OLLAMA_URL}")
    print("=" * 60)

    config = load_keywords()
    site = config.get("site", {})
    generated = load_generated()

    # Determine which keywords to process
    if args.keyword:
        # Find the specific keyword
        targets = []
        for niche in config.get("niches", []):
            for kw in niche.get("keywords", []):
                if kw["keyword"] == args.keyword or kw["slug"] == args.keyword:
                    targets.append({**kw, "niche": niche["id"]})
        if not targets:
            print(f"Keyword '{args.keyword}' not found in keywords.json")
            sys.exit(1)
    elif args.all:
        targets = get_pending_keywords(config, generated)
    else:
        # Just the next one
        targets = get_pending_keywords(config, generated)[:1]

    if not targets:
        print("\nNo pending keywords to generate. All done!")
        print("Add more keywords to keywords.json to continue.")
        return

    print(f"\nArticles to generate: {len(targets)}")
    for i, t in enumerate(targets, 1):
        print(f"  {i}. [{t.get('priority', '?')}] {t['keyword']}")

    print()
    saved_files = []

    for i, kw_data in enumerate(targets, 1):
        print(f"[{i}/{len(targets)}] Generating: {kw_data['keyword']}")

        # Generate article
        article_content = generate_article(kw_data, site)

        if args.dry_run:
            print(f"  [DRY RUN] Would save to: src/content/blog/{kw_data['niche']}/{kw_data.get('language', 'fr')}/{kw_data['slug']}.md")
            print(f"  Content preview ({len(article_content)} chars):")
            print("  " + article_content[:300].replace("\n", "\n  ") + "...")
            continue

        # Save article
        filepath = save_article(article_content, kw_data)
        saved_files.append(filepath)
        print(f"  Saved: {filepath.relative_to(PROJECT_ROOT)}")

        # Mark as generated
        generated["generated"].append(kw_data["slug"])
        generated[kw_data["slug"]] = {
            "keyword": kw_data["keyword"],
            "generated_at": datetime.now().isoformat(),
            "model": OLLAMA_MODEL,
        }
        save_generated(generated)

    # Git push
    if saved_files and not args.dry_run and not args.no_push:
        print(f"\nPushing {len(saved_files)} article(s) to GitHub...")
        slugs = [f.stem for f in saved_files]
        git_push(saved_files, f"Auto-post: {', '.join(slugs)}")

    print(f"\nDone! {len(saved_files)} article(s) generated.")
    remaining = len(get_pending_keywords(config, generated))
    print(f"Remaining keywords: {remaining}")


if __name__ == "__main__":
    main()
