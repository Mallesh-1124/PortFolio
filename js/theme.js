/* ============================================
   THEME MANAGEMENT
   ============================================ */

(function () {
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check saved preference or system preference
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }

    function updateIcon() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    updateIcon();

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateIcon();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
})();
