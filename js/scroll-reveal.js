(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        if (prefersReduced) {
            el.classList.add('revealed');
        } else {
            observer.observe(el);
        }
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line-progress') ||
        (() => {
            const line = document.createElement('div');
            line.className = 'timeline-line-progress';
            document.querySelector('.timeline')?.appendChild(line);
            return line;
        })();

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    function updateTimelineProgress() {
        if (!timelineLine || !prefersReduced) return;
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (timelineHeight + windowHeight)));
        timelineLine.style.height = (progress * 100) + '%';
    }

    if (!prefersReduced) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateTimelineProgress);
        });
    }
    updateTimelineProgress();
})();
