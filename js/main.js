(function () {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Resume button handlers
    const downloadBtn = document.getElementById('download-resume');
    const viewBtn = document.getElementById('view-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual resume path when available
            alert('Resume download will be available once uploaded to the repository.');
        });
    }
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume viewer will be available once uploaded to the repository.');
        });
    }
})();
