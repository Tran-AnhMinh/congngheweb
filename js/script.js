document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    dropdownItems.forEach(item => {
        const content = item.querySelector('.nav-item-content');

        content.addEventListener('click', (e) => {
            e.preventDefault();

            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    const menuIcon = document.querySelector('.menu-icon');
    const mainNav = document.querySelector('.main-nav');
    if (menuIcon && mainNav) {
        menuIcon.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    const lArrow = document.querySelector('.main-content-doc-display-larrow');
    const rArrow = document.querySelector('.main-content-doc-display-rarrow');
    const docContainer = document.querySelector('.main-content-doc-display');

    if (lArrow && rArrow && docContainer) {
        lArrow.addEventListener('click', (e) => {
            e.preventDefault();
            const boxes = docContainer.querySelectorAll('.main-content-doc-display-box');
            if (boxes.length > 0) {
                const lastBox = boxes[boxes.length - 1];
                docContainer.insertBefore(lastBox, lArrow.nextElementSibling);
            }
        });

        rArrow.addEventListener('click', (e) => {
            e.preventDefault();
            const boxes = docContainer.querySelectorAll('.main-content-doc-display-box');
            if (boxes.length > 0) {
                const firstBox = boxes[0];
                docContainer.insertBefore(firstBox, rArrow);
            }
        });
    }
});
