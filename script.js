/* =========================================================
   LUNÉRA STUDIO - INTERNIFY TASK 3
   JavaScript Functionality
   ========================================================= */


/* =========================
   MOBILE NAVIGATION
   ========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

    document.addEventListener("click", (event) => {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

        }

    });

}


/* =========================
   DARK / LIGHT MODE
   ========================= */

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    }

}


/* =========================
   LOAD SAVED THEME
   ========================= */

const savedTheme = localStorage.getItem("luneraTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

} else {

    document.body.classList.remove("dark-mode");

}

updateThemeIcon();


/* =========================
   TOGGLE THEME
   ========================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "luneraTheme",
            isDarkMode ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


/* =========================
   CONTACT FORM VALIDATION
   ========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const successMessage =
        document.getElementById("successMessage");


    /* =========================
       VALIDATE NAME
       ========================= */

    function validateName() {

        const name = nameInput.value.trim();

        if (name === "") {

            nameError.textContent =
                "Please enter your name.";

            nameInput.classList.add("input-error");
            nameInput.classList.remove("input-success");

            return false;

        }

        if (name.length < 3) {

            nameError.textContent =
                "Name must be at least 3 characters.";

            nameInput.classList.add("input-error");
            nameInput.classList.remove("input-success");

            return false;

        }

        nameError.textContent = "";

        nameInput.classList.remove("input-error");
        nameInput.classList.add("input-success");

        return true;

    }


    /* =========================
       VALIDATE EMAIL
       ========================= */

    function validateEmail() {

        const email = emailInput.value.trim();

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            emailInput.classList.add("input-error");
            emailInput.classList.remove("input-success");

            return false;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            emailInput.classList.add("input-error");
            emailInput.classList.remove("input-success");

            return false;

        }

        emailError.textContent = "";

        emailInput.classList.remove("input-error");
        emailInput.classList.add("input-success");

        return true;

    }


    /* =========================
       VALIDATE MESSAGE
       ========================= */

    function validateMessage() {

        const message =
            messageInput.value.trim();

        if (message === "") {

            messageError.textContent =
                "Please enter your message.";

            messageInput.classList.add("input-error");
            messageInput.classList.remove("input-success");

            return false;

        }

        if (message.length < 10) {

            messageError.textContent =
                "Message must be at least 10 characters.";

            messageInput.classList.add("input-error");
            messageInput.classList.remove("input-success");

            return false;

        }

        messageError.textContent = "";

        messageInput.classList.remove("input-error");
        messageInput.classList.add("input-success");

        return true;

    }


    /* =========================
       LIVE VALIDATION
       ========================= */

    nameInput.addEventListener("input", () => {

        validateName();

        successMessage.classList.remove("show");

    });

    emailInput.addEventListener("input", () => {

        validateEmail();

        successMessage.classList.remove("show");

    });

    messageInput.addEventListener("input", () => {

        validateMessage();

        successMessage.classList.remove("show");

    });


    /* =========================
       FORM SUBMISSION
       ========================= */

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (
            isNameValid &&
            isEmailValid &&
            isMessageValid
        ) {

            successMessage.classList.add("show");

            contactForm.reset();

            nameInput.classList.remove("input-success");
            emailInput.classList.remove("input-success");
            messageInput.classList.remove("input-success");

            nameInput.focus();

        } else {

            successMessage.classList.remove("show");

        }

    });

}
