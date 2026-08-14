/* ==========================================================================
   DEVPORTFOLIO - GIT & GITHUB WORKSHOP MAIN JAVASCRIPT
   Clean, modern Vanilla JavaScript (ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE PERSISTENCE
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    /* --------------------------------------------------------------------------
       2. MOBILE NAVIGATION MENU
       -------------------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    /* --------------------------------------------------------------------------
       3. DYNAMIC TYPED TEXT EFFECT IN HERO
       -------------------------------------------------------------------------- */
    const typedTextSpan = document.getElementById('typedText');
    const roles = [
        "Responsive Web Interfaces",
        "Git & GitHub Workflows",
        "Open Source Projects",
        "GitHub Pages Web Apps"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typedTextSpan) {
        typeEffect();
    }


    /* --------------------------------------------------------------------------
       4. SCROLL SPY & ACTIVE NAV LINK HIGHLIGHT
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);


    /* --------------------------------------------------------------------------
       5. PROJECT FILTERING
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* --------------------------------------------------------------------------
       6. PROJECT DETAILS MODAL DIALOG
       -------------------------------------------------------------------------- */
    const projectModal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalGitCode = document.getElementById('modalGitCode');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    const projectData = {
        '1': {
            title: "Git & GitHub Workshop Portfolio",
            tags: ["Git", "HTML/CSS", "GitHub Pages"],
            desc: "A developer portfolio starter crafted specifically for hands-on Git workshops. Features complete GitHub Pages compatibility, modular code structure, and interactive CLI integration.",
            gitWorkflow: `git clone https://github.com/your-username/workshop-portfolio.git\ncd workshop-portfolio\ngit checkout -b feature/customize-bio\n# Edit index.html and style.css\ngit add .\ngit commit -m "Customize personal bio and styles"\ngit push origin feature/customize-bio`
        },
        '2': {
            title: "Interactive Git Command Visualizer",
            tags: ["JavaScript", "Git CLI", "Interactive"],
            desc: "An interactive browser widget that simulates Git commands and visualizes commit graphs, branch switching, and staging areas in real-time.",
            gitWorkflow: `git checkout -b feature/git-visualizer\ngit add js/main.js css/style.css\ngit commit -m "Add terminal command parser"\ngit push origin feature/git-visualizer`
        },
        '3': {
            title: "Markdown Live Preview Editor",
            tags: ["HTML", "Vanilla JS", "Markdown"],
            desc: "Live dual-pane editor for instant rendering of GFM (GitHub Flavored Markdown) documents, making README writing effortless.",
            gitWorkflow: `git checkout -b feature/markdown-editor\ngit commit -m "Implement side-by-side preview pane"\ngit push origin feature/markdown-editor`
        },
        '4': {
            title: "TaskFlow Minimal Kanban Board",
            tags: ["JavaScript", "LocalStorage", "Kanban"],
            desc: "Lightweight drag-and-drop task tracking tool engineered to map out features, issues, and Git commit tasks.",
            gitWorkflow: `git checkout -b feature/kanban-board\ngit commit -m "Add drag-and-drop state persistence"\ngit push origin feature/kanban-board`
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.desc;
                modalGitCode.textContent = data.gitWorkflow;

                // Tags
                modalTags.innerHTML = '';
                data.tags.forEach(t => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = t;
                    modalTags.appendChild(tagSpan);
                });

                projectModal.removeAttribute('hidden');
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.setAttribute('hidden', '');
        });
    }

    // Close modal when clicking outside card
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.setAttribute('hidden', '');
        }
    });


    /* --------------------------------------------------------------------------
       7. INTERACTIVE GIT TERMINAL SIMULATOR
       -------------------------------------------------------------------------- */
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const termSubmitBtn = document.getElementById('termSubmitBtn');
    const chipBtns = document.querySelectorAll('.chip-btn');

    let currentBranch = 'main';
    let stagedFiles = [];
    let commitsCount = 3;

    function appendTerminalOutput(cmd, outputText, type = 'normal') {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'term-line';

        let colorClass = '';
        if (type === 'success') colorClass = 'term-success';
        if (type === 'warning') colorClass = 'term-warning';
        if (type === 'info') colorClass = 'term-info';

        if (cmd) {
            lineDiv.innerHTML = `<span class="term-prompt">workshop@git-pages (${currentBranch}):~$</span> ${cmd}`;
            terminalOutput.appendChild(lineDiv);
        }

        if (outputText) {
            const resDiv = document.createElement('div');
            resDiv.className = `term-line ${colorClass}`;
            resDiv.innerHTML = outputText;
            terminalOutput.appendChild(resDiv);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processGitCommand(inputCmd) {
        const trimmed = inputCmd.trim();
        if (!trimmed) return;

        if (trimmed.toLowerCase() === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const lower = trimmed.toLowerCase();

        if (lower === 'git init') {
            appendTerminalOutput(trimmed, `Initialized empty Git repository in /workspace/portfolio/.git/`, 'success');
        } 
        else if (lower === 'git status') {
            if (stagedFiles.length > 0) {
                appendTerminalOutput(trimmed, `On branch <span class="term-highlight">${currentBranch}</span><br>Changes to be committed:<br>&nbsp;&nbsp;<span class="term-success">modified: index.html</span><br>&nbsp;&nbsp;<span class="term-success">modified: css/style.css</span>`, 'info');
            } else {
                appendTerminalOutput(trimmed, `On branch <span class="term-highlight">${currentBranch}</span><br>Your branch is up to date with 'origin/${currentBranch}'.<br>nothing to commit, working tree clean`, 'info');
            }
        } 
        else if (lower.startsWith('git checkout -b')) {
            const branchName = trimmed.split(' ')[3] || 'feature/new-branch';
            currentBranch = branchName;
            appendTerminalOutput(trimmed, `Switched to a new branch '<span class="term-highlight">${currentBranch}</span>'`, 'success');
        } 
        else if (lower === 'git add .') {
            stagedFiles = ['index.html', 'css/style.css'];
            appendTerminalOutput(trimmed, `Staged 2 files for commit (index.html, css/style.css).`, 'success');
        } 
        else if (lower.startsWith('git commit')) {
            commitsCount++;
            stagedFiles = [];
            const commitHash = Math.random().toString(36).substring(2, 9);
            appendTerminalOutput(trimmed, `[${currentBranch} ${commitHash}] Workshop changes committed successfully.<br> 2 files changed, 28 insertions(+)`, 'success');
        } 
        else if (lower.startsWith('git push')) {
            appendTerminalOutput(trimmed, `Enumerating objects: 5, done.<br>Writing objects: 100% (5/5), 1.2 KiB | 1.2 MiB/s, done.<br>To https://github.com/user/portfolio.git<br>&nbsp;* [new branch] ${currentBranch} -> ${currentBranch}<br><span class="term-success">🚀 GitHub Pages build triggered! Live at: https://user.github.io/portfolio</span>`, 'success');
        } 
        else if (lower === 'git help') {
            const helpText = `Available simulated Git commands:<br>
            - <span class="term-highlight">git init</span>: Initialize local repository<br>
            - <span class="term-highlight">git status</span>: View branch and file status<br>
            - <span class="term-highlight">git checkout -b &lt;branch&gt;</span>: Create &amp; switch branch<br>
            - <span class="term-highlight">git add .</span>: Stage modified files<br>
            - <span class="term-highlight">git commit -m "msg"</span>: Commit staged files<br>
            - <span class="term-highlight">git push origin main</span>: Deploy/Push to remote GitHub<br>
            - <span class="term-highlight">clear</span>: Clear terminal window`;
            appendTerminalOutput(trimmed, helpText, 'info');
        } 
        else {
            appendTerminalOutput(trimmed, `git: '${trimmed}' is not a recognized command. Type <span class="term-highlight">git help</span> for workshop commands.`, 'warning');
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                processGitCommand(cmd);
            }
        });
    }

    if (termSubmitBtn) {
        termSubmitBtn.addEventListener('click', () => {
            const cmd = terminalInput.value;
            terminalInput.value = '';
            processGitCommand(cmd);
        });
    }

    // Quick Command Chip Click Handlers
    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            processGitCommand(cmd);
        });
    });


    /* --------------------------------------------------------------------------
       8. CONTACT FORM VALIDATION & SUBMISSION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formAlert = document.getElementById('formAlert');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Email validation
            if (!validateEmail(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            if (isValid) {
                formAlert.className = 'form-alert success';
                formAlert.textContent = '🎉 Thank you! Your message has been sent successfully.';
                formAlert.removeAttribute('hidden');

                contactForm.reset();

                setTimeout(() => {
                    formAlert.setAttribute('hidden', '');
                }, 5000);
            }
        });
    }


    /* --------------------------------------------------------------------------
       9. FOOTER YEAR UPDATE
       -------------------------------------------------------------------------- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
