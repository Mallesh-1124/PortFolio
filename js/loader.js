(function () {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loadTime = prefersReduced ? 800 : 1400;

    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, loadTime);

    document.body.style.overflow = 'hidden';
})();
