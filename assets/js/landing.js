// landing pagez

window.onload = function () {
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 1500);
};

// ACCORDIONS
try {
    const accordions = document.querySelectorAll(".accordion");
    const openAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion-content");
        content.style.maxHeight = content.scrollHeight + "px";
    };
    const closeAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion-content");
        content.style.maxHeight = null;
    };
    accordions.forEach((accordion) => {
        const intro = accordion.querySelector(".accordion-intro");
        const content = accordion.querySelector(".accordion-content");
        intro.onclick = () => {
            if (content.style.maxHeight) {
                closeAccordion(accordion);
            } else {
                accordions.forEach((accordion) => closeAccordion(accordion));
                openAccordion(accordion);
            }
        };
    });
} catch (error) {
    throw new Error(`Could not initialize accordion functionality, please check error: ${error.message}`);
}

// MOBILE SIDEBAR
try {

    function toggleMobileSidebar(e) {
        const sidebar = document.getElementById(e.dataset.target);

        if (sidebar.dataset.isopen === 'false') {
            sidebar.style.display = 'grid';
            sidebar.dataset.isopen = 'true';
        } else {
            sidebar.style.display = 'none';
            sidebar.dataset.isopen = 'false';
        }
    }

} catch (error) {
    throw new Error(`There was an error trying to initialize mobile sidebar functionality, please see error: ${error.message}`)
}

// REGISTRATION MODAL
try {

    function formPager(targetId, currentId) {

        // close all form pages
        const pages = document.querySelectorAll('.form-page');
        pages.forEach((page) => page.classList.remove('form-page-active'));

        const targetElement = document.getElementById(targetId);
        const toggleElement = document.getElementById(currentId);

        targetElement.classList.add('form-page-active');
        toggleElement.classList.remove('form-page-active');
    }

    function toggleAccountModal(e, page) {

        if (page === 'login') {
            formPager('form-page-2', 'form-page-1');
        } else if (page === 'register') {
            formPager('form-page-1', 'form-page-2');
        }

        const reg_modal = document.getElementById(e.dataset.target);

        // close mobile sidebar if it's open
        const mobile_sidebar = document.getElementById('mobile-sidebar');
        mobile_sidebar.style.display = 'none';
        mobile_sidebar.dataset.isopen = 'false';

        if (reg_modal.dataset.isopen === "false") {

            reg_modal.style.display = 'flex';
            reg_modal.dataset.isopen = "true"
            reg_modal.style.animation = 'fadeInGrow .2s';

        } else {

            reg_modal.dataset.isopen = "false"
            reg_modal.style.animation = 'fadeOutShrink .2s';

            // couldnt find a better way than this and the event type animationend
            // primitive but works and maintainable
            setTimeout(function () {
                reg_modal.style.display = 'none';
            }, 200);

        }
    }

} catch (error) {
    throw new Error(`Could not initialize modal code, please see error: ${error.message}`)
}