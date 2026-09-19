(function () {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    const projectData = {
        'study-hub': {
            title: 'AceAI Study Hub',
            overview: 'An AI-powered collaborative learning platform where students can join live video study rooms, get guidance from an AI teacher, and receive session summaries. Full-stack application with Next.js frontend and Django backend.',
            problem: 'Students often struggle to find dedicated study partners and maintain consistent study schedules. Existing solutions lack structured collaboration tools and personalized AI assistance.',
            solution: 'Built a full-stack platform with Next.js (TypeScript) frontend and Django backend. Features include live video study rooms, AI teacher guidance via API integration, session summaries, and user profiles.',
            tech: ['Next.js', 'TypeScript', 'Django', 'Python', 'AI APIs', 'PostgreSQL'],
            features: [
                'Live video study rooms with real-time collaboration',
                'AI teacher guidance and session summaries',
                'User authentication and profile management',
                'Scheduled room booking system',
                'Responsive design for all devices',
                'Deployed on Vercel (aceai-studyhub.vercel.app)'
            ],
            challenges: 'Integrating AI features with Django backend while maintaining clean separation of concerns. Building the scheduling system to handle concurrent bookings reliably.',
            results: 'Successfully deployed and functional. Demonstrates full-stack capabilities from database design to frontend implementation with AI integration.',
            github: 'https://github.com/Mallesh-1124/AceAI_StudyHub_Portal',
            live: 'https://aceai-studyhub.vercel.app'
        },
        'robotic-arm': {
            title: 'Camera-Assisted Wi-Fi Robotic Arm',
            overview: 'An ESP32-based robotic arm system with integrated camera for remote visual feedback. Controlled via Wi-Fi using the Blynk mobile app, featuring live video streaming and precise 3-DOF movement.',
            problem: 'Remote manipulation tasks require both precise control and real-time visual feedback. Traditional robotic arms lack integrated cameras and wireless control capabilities.',
            solution: 'Designed and built a 3-degree-of-freedom robotic arm with ESP32-CAM for live video streaming. Implemented Wi-Fi control via Blynk app with a mobile vehicle platform for enhanced mobility.',
            tech: ['ESP32', 'ESP32-CAM', 'C++', 'Blynk', 'Servo Motors', '3D Printing'],
            features: [
                '3-DOF robotic arm with gear reduction',
                'Live video streaming via ESP32-CAM',
                'Wi-Fi based remote control',
                'Blynk mobile app interface',
                'Mobile vehicle platform',
                'Real-time camera feed integration'
            ],
            challenges: 'Synchronizing camera feed with arm movements over Wi-Fi. Calibrating servo motors for precise positioning. Designing the mechanical structure with appropriate gear ratios.',
            results: 'Fully functional remote-controlled robotic arm with live video feedback. Demonstrates integration of embedded systems, networking, and mechanical engineering.',
            github: null,
            live: null
        },
        'ace-eee': {
            title: 'ACE EEE Website',
            overview: 'A comprehensive Django-based web portal for the EEE department featuring responsive Bootstrap 5 design, dynamic syllabus pages, admin panel management, and email notifications.',
            problem: 'The department needed a centralized online presence to share information with students and faculty, but lacked a modern, maintainable web platform.',
            solution: 'Developed a Django website with admin panel for easy content management, backend validation for forms, responsive Bootstrap 5 design, and integrated email functionality.',
            tech: ['Django', 'Python', 'Bootstrap 5', 'HTML/CSS', 'JavaScript', 'SMTP'],
            features: [
                'Admin panel for easy content management',
                'Backend form validation',
                'Responsive department UI with Bootstrap 5',
                'Email integration for contact submissions',
                'Faculty and course information pages',
                'SEO-friendly structure'
            ],
            challenges: 'Building a CMS that non-technical staff could manage easily. Ensuring form data validation on the backend while maintaining good UX.',
            results: 'Deployed as the official department website. Provides reliable information access and streamlined communication channels.',
            github: 'https://github.com/Mallesh-1124/ACE-EEEWeb',
            live: 'https://mallesh-1124.github.io/ACE-EEEWeb/'
        },
        'flask-chat': {
            title: 'Flask Group Chat',
            overview: 'A real-time group chat application built with Flask and SocketIO, featuring secure room access via passkey, message persistence in MySQL, and user authentication.',
            problem: 'Simple chat applications often lack proper authentication and security measures. Groups need private, secure communication channels.',
            solution: 'Built a Flask application with real-time WebSocket communication, password-protected rooms, MySQL message storage, and user authentication system.',
            tech: ['Flask', 'Flask-SocketIO', 'MySQL', 'JavaScript', 'HTML/CSS'],
            features: [
                'Real-time messaging via WebSockets',
                'User authentication and session management',
                'Password-protected chat rooms (passkey system)',
                'Message persistence in MySQL',
                'Security features and input sanitization',
                'Deployed on Render (flask-group-chat.onrender.com)'
            ],
            challenges: 'Implementing secure room access with passkey authentication. Ensuring message delivery reliability with SocketIO.',
            results: 'Functional real-time chat application with proper security. Demonstrates WebSocket communication and backend security patterns.',
            github: 'https://github.com/Mallesh-1124/flask-group-chat',
            live: 'https://flask-group-chat.onrender.com/'
        },
        'line-follower': {
            title: 'Autonomous Line Following Robot',
            overview: 'An autonomous robot based on ATmega328P microcontroller with line-following capability, infrared sensors, and GSM-based SMS reporting for industrial monitoring.',
            problem: 'Industrial environments require automated monitoring systems that can navigate predefined paths and report status in real-time.',
            solution: 'Developed an ATmega328P-based line-following robot with IR sensors for navigation, GSM module (SIM900) for SMS alerts, and multiple sensor inputs for environmental monitoring.',
            tech: ['ATmega328P', 'C', 'GSM SIM900', 'IR Sensors', 'Arduino'],
            features: [
                'Autonomous line following with IR sensors',
                'GSM SMS reporting for alerts',
                'Multiple sensor integration',
                'Industrial monitoring capabilities',
                'Motor control with speed regulation',
                'Low-power design for extended operation'
            ],
            challenges: 'Reliable line detection under varying lighting conditions. Integrating GSM module for SMS functionality.',
            results: 'Fully operational line-following robot with SMS alert system. Demonstrates embedded systems and hardware-software integration.',
            github: null,
            live: null
        },
        'weather-now': {
            title: 'Weather-Now',
            overview: 'A simple, responsive React application that lets users quickly check the current weather for any city using the Open-Meteo API. No API key required.',
            problem: 'Users need quick, accurate weather information without navigating complex weather websites or dealing with API key setups.',
            solution: 'Built a React application using Open-Meteo Geocoding + Weather APIs (free, no key needed). Displays current conditions, temperature, and wind speed for any city worldwide.',
            tech: ['React', 'JavaScript', 'Open-Meteo API', 'CSS'],
            features: [
                'Real-time weather data retrieval',
                'Location-based forecasts',
                'Temperature, humidity, and wind speed data',
                'No API key required (Open-Meteo)',
                'Responsive design',
                'Deployed on Netlify (weather-nowweb.netlify.app)'
            ],
            challenges: 'Handling API rate limits and error cases gracefully. Creating adaptive UI that visually responds to different weather conditions.',
            results: 'Functional weather application with clean interface. Shows ability to work with external APIs and build responsive frontends.',
            github: 'https://github.com/Mallesh-1124/weather-now',
            live: 'https://weather-nowweb.netlify.app/'
        }
    };

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        const techHtml = data.tech.map(t => `<span>${t}</span>`).join('');
        const featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');

        modalContent.innerHTML = `
            <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:24px;color:var(--text-primary);">${data.title}</h2>
            <div class="modal-section">
                <h3>Overview</h3>
                <p>${data.overview}</p>
            </div>
            <div class="modal-section">
                <h3>Problem</h3>
                <p>${data.problem}</p>
            </div>
            <div class="modal-section">
                <h3>Solution</h3>
                <p>${data.solution}</p>
            </div>
            <div class="modal-section">
                <h3>Technology</h3>
                <div class="modal-tags">${techHtml}</div>
            </div>
            <div class="modal-section">
                <h3>Key Features</h3>
                <ul>${featuresHtml}</ul>
            </div>
            <div class="modal-section">
                <h3>Challenges</h3>
                <p>${data.challenges}</p>
            </div>
            <div class="modal-section">
                <h3>Results</h3>
                <p>${data.results}</p>
            </div>
            <div class="modal-links">
                ${data.github ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">GitHub</a>` : ''}
                ${data.live ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>` : ''}
            </div>
        `;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
})();
