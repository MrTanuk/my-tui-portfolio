import type { GitHubRepo, LanguageInfo } from '../types';
import { CONFIG } from '../config';

const GITHUB_API = 'https://api.github.com';

// Language colors and icons mapping
 const LANGUAGE_MAP: Record<string, LanguageInfo> = {
    TypeScript: { name: 'TypeScript', color: '#3178c6', icon: '\ue628' },
    JavaScript: { name: 'JavaScript', color: '#f7df1e', icon: '\ue74e' },
    PHP: { name: 'PHP', color: '#777bb4', icon: '\ue73d' },
    Python: { name: 'Python', color: '#3572A5', icon: '\ue73c' },
    'C++': { name: 'C++', color: '#f34b7d', icon: '\ue61d' },
    C: { name: 'C', color: '#555555', icon: '\ue61e' },
    Rust: { name: 'Rust', color: '#dea584', icon: '\ue7a8' },
    Go: { name: 'Go', color: '#00ADD8', icon: '\ue626' },
    Java: { name: 'Java', color: '#b07219', icon: '\ue738' },
    Ruby: { name: 'Ruby', color: '#701516', icon: '\ue739' },
    Lua: { name: 'Lua', color: '#000080', icon: '\ue620' },
    Shell: { name: 'Shell', color: '#89e051', icon: '\ue795' },
    HTML: { name: 'HTML', color: '#e34c26', icon: '\ue736' },
    CSS: { name: 'CSS', color: '#563d7c', icon: '\ue749' },
    Vue: { name: 'Vue', color: '#41b883', icon: '\uf4f4' },
    Astro: { name: 'Astro', color: '#ff5a03', icon: '\ue735' },
    Dockerfile: { name: 'Docker', color: '#384d54', icon: '\ue7b0' },
    Markdown: { name: 'Markdown', color: '#083fa1', icon: '\ue73e' },
 };

/**
 * Fetch repositories from GitHub
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const username = CONFIG.GITHUB_USERNAME;
  const url = `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks if configured
    const filteredRepos = CONFIG.SHOW_FORKS 
      ? repos 
      : repos.filter(repo => !repo.fork);
    
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Get language info for display
 */
export function getLanguageInfo(language: string | null): LanguageInfo {
  if (!language) {
    return { name: 'Markdown', color: '#ffffff', icon: '' };
  }
  
  return LANGUAGE_MAP[language] || { 
    name: language, 
    color: '#6e7681', 
    icon: '\uea7b' 
  };
}

/**
 * Format date to relative time
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Get featured repos (top N by stars)
 */
export function getFeaturedRepos(
  repos: GitHubRepo[], 
  count: number = CONFIG.FEATURED_REPOS_COUNT
): GitHubRepo[] {
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

/**
 * Get unique languages from repos
 */
export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = new Set<string>();
  repos.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  return Array.from(languages).sort();
}
