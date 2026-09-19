import { PromptItem } from '../types/prompt';

/**
 * Utility to calculate and return 4-8 related prompts for a given current prompt.
 * Prefers same category, then shared tags, then fallback to other published prompts.
 */
export function getRelatedPrompts(
  currentPrompt: PromptItem,
  allPrompts: PromptItem[],
  limit = 4
): PromptItem[] {
  const candidates = allPrompts.filter(
    (p) => p.id !== currentPrompt.id && p.published !== false
  );

  // Score each candidate
  const scored = candidates.map((candidate) => {
    let score = 0;

    // Direct category match (highest weight)
    if (candidate.category === currentPrompt.category) {
      score += 10;
    }

    // Shared tag matches
    const sharedTags = candidate.tags.filter((tag) =>
      currentPrompt.tags.includes(tag)
    );
    score += sharedTags.length * 3;

    return { candidate, score };
  });

  // Sort by highest score first, fallback to sortOrder
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (a.candidate.sortOrder || 0) - (b.candidate.sortOrder || 0);
  });

  return scored.slice(0, limit).map((item) => item.candidate);
}
