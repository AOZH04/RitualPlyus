(function () {
    'use strict';

    // Год в подвале
    var yearEl = document.getElementById('footer_year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // Тень шапки при прокрутке
    var header = document.getElementById('site_header');
    function onScroll() {
        if (header) {
            header.classList.toggle('is_scrolled', window.scrollY > 8);
        }
        if (nav && nav.classList.contains('is_open')) {
            closeNav();
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Мобильное меню
    var toggle = document.getElementById('nav_toggle');
    var nav = document.getElementById('main_nav');
    function closeNav() {
        if (!nav || !toggle) { return; }
        nav.classList.remove('is_open');
        toggle.classList.remove('is_active');
        toggle.setAttribute('aria-expanded', 'false');
    }
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is_open');
            toggle.classList.toggle('is_active', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        nav.addEventListener('click', function (e) {
            if (e.target.classList.contains('main_nav_link')) { closeNav(); }
        });
    }

    // Простая валидация статической формы
    var form = document.querySelector('.contact_form');
    if (form) {
        form.addEventListener('submit', function (e) {
            var valid = true;
            var fields = form.querySelectorAll('input[required]');
            fields.forEach(function (input) {
                var field = input.closest('.form_field');
                clearTip(field);
                if (!input.value.trim()) {
                    valid = false;
                    showTip(field, 'Заполните это поле');
                }
            });
            if (!valid) { e.preventDefault(); }
        });
        form.addEventListener('input', function (e) {
            var field = e.target.closest('.form_field');
            if (field && field.classList.contains('has_error') && e.target.value.trim()) {
                clearTip(field);
            }
        });
    }

    function showTip(field, text) {
        if (!field) { return; }
        field.classList.add('has_error');
        var tip = document.createElement('span');
        tip.className = 'form_field_tip';
        tip.textContent = text;
        field.appendChild(tip);
    }
    function clearTip(field) {
        if (!field) { return; }
        field.classList.remove('has_error');
        var tip = field.querySelector('.form_field_tip');
        if (tip) { tip.remove(); }
    }
})();
