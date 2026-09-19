/**
 * Fetches GitHub user profile and repositories
 * Displays them dynamically on the portfolio
 */
(function () {
    const USERNAME = 'Mallesh-1124';
    const AVATAR_URL = `https://avatars.githubusercontent.com/u/214317617?v=4`;
    const API_BASE = 'https://api.github.com';

    // Language colors for display
    const LANG_COLORS = {
        'TypeScript': '#3178c6',
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C': '#555555',
        'C++': '#f34b7d',
        'Java': '#b07219',
        'Astro': '#bc3177',
        'Julia': '#a270ba',
        'Shell': '#89e051'
    };

    async function fetchJSON(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.warn('GitHub API error:', err.message);
            return null;
        }
    }

    async function loadUserProfile() {
        const data = await fetchJSON(`${API_BASE}/users/${USERNAME}`);
        if (!data) return;

        // Update about section GitHub preview
        const nameEl = document.getElementById('gh-name');
        const bioEl = document.getElementById('gh-bio');
        const createdEl = document.getElementById('gh-created');

        if (nameEl) nameEl.textContent = data.name || data.login;
        if (bioEl) bioEl.textContent = data.bio || 'Passionate developer building real-world projects.';
        if (createdEl) {
            const year = data.created_at ? data.created_at.substring(0, 4) : '2025';
            createdEl.textContent = year;
        }

        // Update stats in GH preview
        const statsEl = document.getElementById('gh-stats');
        if (statsEl) {
            statsEl.innerHTML = `
                <span><strong>${data.public_repos}</strong> repos</span>
                <span><strong>${data.followers || 0}</strong> followers</span>
                <span><strong>${year || '2025'}</strong> since</span>
            `;
        }
    }

    async function loadRepositories() {
        const grid = document.getElementById('repos-grid');
        if (!grid) return;

        const repos = await fetchJSON(`${API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=100&type=owner`);
        if (!repos || repos.length === 0) {
            grid.innerHTML = '<div class="repos-loading">Failed to load repositories. <a href="https://github.com/' + USERNAME + '" target="_blank">View on GitHub</a></div>';
            return;
        }

        // Sort by updated, take top 6
        const sorted = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);

        grid.innerHTML = sorted.map(repo => {
            const lang = repo.language || 'Unknown';
            const langColor = LANG_COLORS[lang] || '#888';
            const desc = repo.description || 'No description provided.';
            const stars = repo.stargazers_count || 0;
            const forks = repo.forks_count || 0;
            const created = new Date(repo.created_at).getFullYear();
            const isFork = repo.fork ? '(fork)' : '';

            return `
                <div class="repo-card">
                    <div class="repo-card-header">
                        <span class="repo-name">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                            ${repo.name} ${isFork}
                        </span>
                        <span class="repo-primary-lang">
                            <span class="lang-dot" style="background:${langColor}" aria-label="${lang}"></span>
                            ${lang}
                        </span>
                    </div>
                    <p class="repo-desc">${desc}</p>
                    <div class="repo-footer">
                        <span class="repo-stat">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            ${stars}
                        </span>
                        <span class="repo-stat">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M6 9l6 6 6-6"/>
                            </svg>
                            ${forks}
                        </span>
                        <span class="repo-stat">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            ${created}
                        </span>
                    </div>
                    <div class="repo-link">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.homepage ? 'Live Demo ↗' : 'View Repository ↗'}
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    async function init() {
        await Promise.all([loadUserProfile(), loadRepositories()]);
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
