(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnSuccess = submitBtn.querySelector('.btn-success');

    function showError(input, errorEl, message) {
        const errEl = document.getElementById(errorEl);
        if (errEl) errEl.textContent = message;
        input.style.borderColor = '#ef4444';
    }

    function clearError(input, errorEl) {
        const errEl = document.getElementById(errorEl);
        if (errEl) errEl.textContent = '';
        input.style.borderColor = '';
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
            clearError(nameInput, 'name-error');
        }
    });

    emailInput.addEventListener('blur', () => {
        if (!emailInput.value.trim()) {
            showError(emailInput, 'email-error', 'Email is required.');
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'email-error', 'Please enter a valid email.');
        } else {
            clearError(emailInput, 'email-error');
        }
    });

    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim()) {
            clearError(messageInput, 'message-error');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        clearError(nameInput, 'name-error');
        clearError(emailInput, 'email-error');
        clearError(messageInput, 'message-error');

        if (!nameInput.value.trim()) {
            showError(nameInput, 'name-error', 'Name is required.');
            valid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'email-error', 'Email is required.');
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'email-error', 'Please enter a valid email.');
            valid = false;
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'message-error', 'Message is required.');
            valid = false;
        }

        if (!valid) return;

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        const mailtoLink = `mailto:kolipakamallesh@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(nameInput.value)}&body=${encodeURIComponent(messageInput.value)}%0A%0AName: ${encodeURIComponent(nameInput.value)}%0AEmail: ${encodeURIComponent(emailInput.value)}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
            btnLoading.style.display = 'none';
            btnSuccess.style.display = 'inline';
            submitBtn.disabled = false;

            form.reset();

            setTimeout(() => {
                btnSuccess.style.display = 'none';
                btnText.style.display = 'inline';
            }, 2500);
        }, 800);
    });
})();
