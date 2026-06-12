 (function () {
  // Header style on scroll
  var header = document.querySelector(".header");
  if (header) {
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal — Intersection Observer
  var revealSections = document.querySelectorAll(".section.reveal");
  if (revealSections.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    revealSections.forEach(function (section) {
      revealObserver.observe(section);
    });
  }

  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Profile modal — open/close with transitions
  var profileModal = document.getElementById("profile-modal");
  var modalPhoto = document.getElementById("profile-modal-photo");
  var openBtn = document.getElementById("open-profile-modal");
  var navLogo = document.getElementById("open-profile-modal-nav");
  var heroPhoto = document.getElementById("open-profile-modal-hero-photo");
  var closeBtn = document.getElementById("close-profile-modal");
  var backdrop = document.getElementById("profile-modal-backdrop");
  var TRANSITION_MS = 400;
  var lastOpener;

  function openProfileModal(opener) {
    lastOpener = opener;
    if (!profileModal) return;
    if (modalPhoto) {
      const profilePhotos = [
        'profile.png',
        'profile-1.png',
        'pink-shirt.jpeg'
      ];
      let currentPhotoIndex = parseInt(modalPhoto.dataset.photoIndex || '0');
      if (opener === openBtn) {
        // Clicked on name — cycle to next photo
        currentPhotoIndex = (currentPhotoIndex + 1) % profilePhotos.length;
        modalPhoto.classList.add('swapping');
        setTimeout(() => {
          modalPhoto.src = profilePhotos[currentPhotoIndex];
          modalPhoto.style.objectPosition = 'center center';
          modalPhoto.dataset.photoIndex = currentPhotoIndex;
          modalPhoto.classList.remove('swapping');
        }, 150);
      } else {
        // Other openers — default to profile photo
        modalPhoto.src = profilePhotos[0];
        modalPhoto.style.objectPosition = 'center 25%';
        modalPhoto.dataset.photoIndex = 0;
      }
    }
    profileModal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        profileModal.classList.add("open");
        closeBtn && closeBtn.focus();
      });
    });
  }

  function closeProfileModal() {
    if (!profileModal) return;
    profileModal.classList.remove("open");
    setTimeout(function () {
      profileModal.hidden = true;
      document.body.style.overflow = "";
      (lastOpener || openBtn) && (lastOpener || openBtn).focus();
    }, TRANSITION_MS);
  }

  function attachProfileModalOpen(el) {
    if (!el) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openProfileModal(el);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProfileModal(el);
      }
    });
  }
  attachProfileModalOpen(openBtn);
  attachProfileModalOpen(navLogo);
  attachProfileModalOpen(heroPhoto);
  if (closeBtn) closeBtn.addEventListener("click", closeProfileModal);
  if (backdrop) backdrop.addEventListener("click", closeProfileModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && profileModal && !profileModal.hidden) closeProfileModal();
  });
})();
