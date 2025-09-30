document.addEventListener('DOMContentLoaded', function () {
    // FAQ функциональность
    const faqItems = document.querySelectorAll('.faq__item');

    // Инициализация всех элементов (скрытие ответов)
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq__answer');
        const toggle = item.querySelector('span');

        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
        answer.style.opacity = '0';
        toggle.textContent = '+';
    });

    function toggleAnswer(clickedItem) {
        const answer = clickedItem.querySelector('.faq__answer');
        const toggle = clickedItem.querySelector('span');
        const question = clickedItem.querySelector('.faq__question');

        const isOpen = answer.style.display === 'block';

        // Закрываем все элементы
        faqItems.forEach(item => {
            if (item !== clickedItem) {
                const otherAnswer = item.querySelector('.faq__answer');
                const otherToggle = item.querySelector('span');
                const otherQuestion = item.querySelector('.faq__question');

                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.opacity = '0';
                otherQuestion.style.marginBottom = '0';
                setTimeout(() => {
                    otherAnswer.style.display = 'none';
                }, 300);
                otherToggle.textContent = '+';
            }
        });

        // Переключаем текущий элемент
        if (isOpen) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            question.style.marginBottom = '0';
            setTimeout(() => {
                answer.style.display = 'none';
            }, 300);
            toggle.textContent = '+';
        } else {
            answer.style.display = 'block';
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            question.style.marginBottom = '30px';
            toggle.textContent = '−';
        }
    }

    // Назначаем обработчики
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const toggle = item.querySelector('span');

        question.addEventListener('click', () => toggleAnswer(item));
        toggle.addEventListener('click', () => toggleAnswer(item));

        question.style.cursor = 'pointer';
        toggle.style.cursor = 'pointer';
    });

    // Навигационные выпадающие меню
    const navItems = document.querySelectorAll('.nav-list__item');

    navItems.forEach(item => {
        const link = item.querySelector('.nav-list__link');
        const dropdown = item.querySelector('.nav-dropdown');

        if (!dropdown) return; // Пропускаем элементы без выпадающих меню

        // Обработчик клика по ссылке
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const isExpanded = link.getAttribute('aria-expanded') === 'true';

            // Закрываем все другие выпадающие меню
            navItems.forEach(otherItem => {
                const otherLink = otherItem.querySelector('.nav-list__link');
                const otherDropdown = otherItem.querySelector('.nav-dropdown');

                if (otherItem !== item && otherDropdown) {
                    otherLink.setAttribute('aria-expanded', 'false');
                    otherDropdown.style.opacity = '0';
                    otherDropdown.style.visibility = 'hidden';
                    otherDropdown.style.transform = 'translateY(-10px)';
                }
            });

            // Переключаем текущее меню
            if (isExpanded) {
                link.setAttribute('aria-expanded', 'false');
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            } else {
                link.setAttribute('aria-expanded', 'true');
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function (e) {
            if (!item.contains(e.target)) {
                link.setAttribute('aria-expanded', 'false');
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        });

        // Поддержка клавиатуры
        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            } else if (e.key === 'Escape') {
                link.setAttribute('aria-expanded', 'false');
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        });
    });
});

// Боковое мобильное меню
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileSidebar = document.querySelector('.mobile-sidebar');
const mobileSidebarClose = document.querySelector('.mobile-sidebar__close');
const mobileSidebarOverlay = document.querySelector('.mobile-sidebar__overlay');

// Функция открытия бокового меню
function openMobileSidebar() {
    mobileSidebar.classList.add('active');
    document.body.classList.add('mobile-menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenuToggle.setAttribute('aria-label', 'Закрыть меню');
}

// Функция закрытия бокового меню
function closeMobileSidebar() {
    mobileSidebar.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
    
    // Закрываем все выпадающие меню
    const mobileDropdowns = document.querySelectorAll('.mobile-nav-dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list__link');
    
    mobileDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    mobileLinks.forEach(link => {
        link.setAttribute('aria-expanded', 'false');
    });
}

// Обработчики событий
if (mobileMenuToggle && mobileSidebar) {
    // Открытие меню по клику на бургер
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        openMobileSidebar();
    });
    
    // Закрытие меню по клику на кнопку закрытия
    if (mobileSidebarClose) {
        mobileSidebarClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileSidebar();
        });
    }
    
    // Закрытие меню по клику на overlay
    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileSidebar();
        });
    }
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeMobileSidebar();
        }
    });
}

// Мобильные выпадающие меню
const mobileNavItems = document.querySelectorAll('.mobile-nav-list__item');

mobileNavItems.forEach(item => {
    const link = item.querySelector('.mobile-nav-list__link');
    const dropdown = item.querySelector('.mobile-nav-dropdown');

    if (!dropdown) return; // Пропускаем элементы без выпадающих меню

    // Обработчик клика по ссылке
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const isExpanded = link.getAttribute('aria-expanded') === 'true';

        // Закрываем все другие выпадающие меню
        mobileNavItems.forEach(otherItem => {
            const otherLink = otherItem.querySelector('.mobile-nav-list__link');
            const otherDropdown = otherItem.querySelector('.mobile-nav-dropdown');

            if (otherItem !== item && otherDropdown) {
                otherLink.setAttribute('aria-expanded', 'false');
                otherDropdown.classList.remove('active');
            }
        });

        // Переключаем текущее меню
        if (isExpanded) {
            link.setAttribute('aria-expanded', 'false');
            dropdown.classList.remove('active');
        } else {
            link.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('active');
        }
    });
});