const WHATSAPP_NUMBER = "50685427529";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-nav");
const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
const finePointerQuery = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

/* =========================================================
   WHATSAPP LINKS
========================================================= */

function initializeWhatsAppLinks() {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const message = link.dataset.message;

    if (!message) {
      link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
      return;
    }

    link.href =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;
  });
}

/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMobileMenu({ returnFocus = false } = {}) {
  if (!menuButton || !mobileNavigation) return;

  const wasOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");

  mobileNavigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");

  if (returnFocus && wasOpen) {
    menuButton.focus();
  }
}

function openMobileMenu() {
  if (!menuButton || !mobileNavigation) return;

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Cerrar menú");

  mobileNavigation.classList.add("is-open");
  document.body.classList.add("menu-open");
}

function initializeMobileMenu() {
  if (!menuButton || !mobileNavigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (!isOpen) return;

    const clickedInsideNav =
      mobileNavigation.contains(event.target);

    const clickedToggle =
      menuButton.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120) {
      closeMobileMenu();
    }
  });
}

/* =========================================================
   HEADER SCROLL STATE
========================================================= */

function initializeHeaderScrollState() {
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 40
    );
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });
}

/* =========================================================
   FAQ ACCORDION
========================================================= */

function initializeFaq() {
  const faqItems = [
    ...document.querySelectorAll(".faq-list details"),
  ];

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
}

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

function initializeRevealAnimations() {
  const elements = [
    ...document.querySelectorAll(
      ".reveal, .reveal-text"
    ),
  ];

  if (
    reducedMotionQuery.matches ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  elements.forEach((element, index) => {
    const delay = Math.min(
      (index % 4) * 70,
      210
    );

    element.style.transitionDelay = `${delay}ms`;
    observer.observe(element);
  });
}

/* =========================================================
   IMAGE MASK REVEAL
========================================================= */

function initializeImageReveal() {
  const imageRevealElements = [
    ...document.querySelectorAll(
      "[data-image-reveal]"
    ),
  ];

  if (
    reducedMotionQuery.matches ||
    !("IntersectionObserver" in window)
  ) {
    imageRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  imageRevealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   HERO PARALLAX
========================================================= */

function initializeHeroParallax() {
  const scene = document.querySelector(
    "[data-parallax-scene]"
  );

  if (
    !scene ||
    reducedMotionQuery.matches
  ) {
    return;
  }

  const image = scene.querySelector("[data-depth]");

  if (!image) return;

  let ticking = false;

  const update = () => {
    const scrollPosition = window.scrollY;
    const heroHeight =
      scene.parentElement?.offsetHeight ||
      window.innerHeight;

    if (scrollPosition > heroHeight * 1.15) {
      ticking = false;
      return;
    }

    const depth =
      Number.parseFloat(image.dataset.depth) ||
      0.04;

    const offset =
      Math.min(scrollPosition, heroHeight) *
      depth;

    image.style.transform =
      `translate3d(0, ${offset}px, 0) scale(1.04)`;

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();

  window.addEventListener("scroll", requestUpdate, {
    passive: true,
  });
}

/* =========================================================
   PRODUCT 3D TILT
========================================================= */

function initializeTiltCards() {
  if (
    reducedMotionQuery.matches ||
    !finePointerQuery.matches
  ) {
    return;
  }

  const cards = document.querySelectorAll(
    "[data-tilt]"
  );

  cards.forEach((card) => {
    const maxRotation = 4.25;

    const handlePointerMove = (event) => {
      const rect =
        card.getBoundingClientRect();

      const relativeX =
        (event.clientX - rect.left) /
        rect.width;

      const relativeY =
        (event.clientY - rect.top) /
        rect.height;

      const rotationY =
        (relativeX - 0.5) *
        maxRotation *
        2;

      const rotationX =
        (0.5 - relativeY) *
        maxRotation *
        2;

      card.style.transform =
        `perspective(1200px)` +
        ` rotateX(${rotationX}deg)` +
        ` rotateY(${rotationY}deg)` +
        ` translateZ(0)`;
    };

    const resetCard = () => {
      card.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    };

    card.addEventListener(
      "pointermove",
      handlePointerMove
    );

    card.addEventListener(
      "pointerleave",
      resetCard
    );

    card.addEventListener(
      "pointercancel",
      resetCard
    );
  });
}

/* =========================================================
   MAGNETIC CTA
========================================================= */

function initializeMagneticButtons() {
  if (
    reducedMotionQuery.matches ||
    !finePointerQuery.matches
  ) {
    return;
  }

  const buttons =
    document.querySelectorAll(".magnetic");

  buttons.forEach((button) => {
    const strength = 0.14;

    const handleMove = (event) => {
      const rect =
        button.getBoundingClientRect();

      const offsetX =
        event.clientX -
        (rect.left + rect.width / 2);

      const offsetY =
        event.clientY -
        (rect.top + rect.height / 2);

      button.style.transform =
        `translate3d(` +
        `${offsetX * strength}px, ` +
        `${offsetY * strength}px, 0)`;
    };

    const reset = () => {
      button.style.transform =
        "translate3d(0, 0, 0)";
    };

    button.addEventListener(
      "pointermove",
      handleMove
    );

    button.addEventListener(
      "pointerleave",
      reset
    );

    button.addEventListener(
      "pointercancel",
      reset
    );
  });
}

/* =========================================================
   PARALLAX ON IMAGE BREAK
========================================================= */

function initializeImageBreakParallax() {
  if (reducedMotionQuery.matches) return;

  const image =
    document.querySelector(
      ".image-break-media img"
    );

  const section =
    document.querySelector(".image-break");

  if (!image || !section) return;

  let ticking = false;

  const update = () => {
    const rect =
      section.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    if (
      rect.bottom < 0 ||
      rect.top > viewportHeight
    ) {
      ticking = false;
      return;
    }

    const progress =
      (viewportHeight - rect.top) /
      (viewportHeight + rect.height);

    const offset =
      (progress - 0.5) * 55;

    image.style.transform =
      `translate3d(0, ${offset}px, 0) scale(1.04)`;

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();

  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestUpdate
  );
}

/* =========================================================
   SMOOTH INTERNAL NAVIGATION SAFETY
========================================================= */

function initializeInternalLinks() {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const id =
          link.getAttribute("href");

        if (!id || id === "#") return;

        const target =
          document.querySelector(id);

        if (!target) return;

        if (reducedMotionQuery.matches) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "auto",
            block: "start",
          });
        }
      });
    });
}

/* =========================================================
   INITIALIZE
========================================================= */

function initializeSite() {
  initializeWhatsAppLinks();
  initializeCurrentYear();
  initializeMobileMenu();
  initializeHeaderScrollState();
  initializeFaq();
  initializeRevealAnimations();
  initializeImageReveal();
  initializeHeroParallax();
  initializeTiltCards();
  initializeMagneticButtons();
  initializeImageBreakParallax();
  initializeInternalLinks();
}

initializeSite();
