document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const header = document.querySelector("header");
  const projects = document.querySelectorAll(".project");
  const footer = document.querySelector("footer");
  const langToggle = document.getElementById("lang-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const langItems = document.querySelectorAll(".dropdown-item");
  const langName = document.getElementById("lang-name");
  const currentFlag = document.getElementById("current-flag");
  const nav = document.querySelector("nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navClose = document.getElementById("nav-close");
  let currentLang = "en";

  const contactContainer = document.querySelector(".contact-container");

  window.addEventListener("scroll", function () {
    const contactTop = contactContainer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (contactTop < windowHeight) {
      contactContainer.classList.add("show");
    }
  });

  const skills = document.querySelectorAll(".skill img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "transform 0.5s";
          entry.target.style.transform = "scale(1.1)";
        } else {
          entry.target.style.transform = "scale(1)";
        }
      });
    },
    { threshold: 0.5 }
  );

  skills.forEach((skill) => observer.observe(skill));

  new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const projectImages = [
    {
      id: "realtimechatapp-carousel",
      images: [
        "./assets/images/realtimechatapp/chat1.png",
        "./assets/images/realtimechatapp/chat2.png",
        "./assets/images/realtimechatapp/chat3.png",
        "./assets/images/realtimechatapp/chat4.png",
        "./assets/images/realtimechatapp/chat5.png",
        "./assets/images/realtimechatapp/chat6.png",
        "./assets/images/realtimechatapp/chat7.png",
        "./assets/images/realtimechatapp/chat8.png",
        "./assets/images/realtimechatapp/chat9.png",
        "./assets/images/realtimechatapp/chatm1.png",
        "./assets/images/realtimechatapp/chatm2.png",
        "./assets/images/realtimechatapp/chatm3.png",
        "./assets/images/realtimechatapp/chatm4.png",
        "./assets/images/realtimechatapp/chatm5.png",
        "./assets/images/realtimechatapp/chatm6.png",
        "./assets/images/realtimechatapp/chatm7.png",
        "./assets/images/realtimechatapp/chatm8.png",
        "./assets/images/realtimechatapp/chatm9.png",
      ],
    },
    {
      id: "furniture-carousel",
      images: [
        "./assets/images/funiture/furni1.png",
        "./assets/images/funiture/furni2.png",
        "./assets/images/funiture/furni3.png",
        "./assets/images/funiture/furni4.png",
        "./assets/images/funiture/furni5.png",
        "./assets/images/funiture/furni6.png",
      ],
    },
  ];

  projectImages.forEach((project) => {
    const carouselInner = document.querySelector(`#${project.id}`);

    project.images.forEach((src, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = src;
      img.alt = `Slide ${index + 1}`;

      slideDiv.appendChild(img);
      carouselInner.appendChild(slideDiv);
    });
  });

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    header.classList.toggle("dark-theme");
    nav.classList.toggle("dark-theme");
    projects.forEach((project) => project.classList.toggle("dark-theme"));
    dropdownMenu.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });

  navToggle.addEventListener("click", () => {
    nav.classList.add("open");
  });

  navClose.addEventListener("click", () => {
    nav.classList.remove("open");
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      nav.classList.remove("open");
    }
  });

  langToggle.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  const setActiveLang = (lang) => {
    langItems.forEach((item) => {
      if (item.dataset.lang === lang) {
        item.classList.add("active");
        langName.textContent = item.textContent.trim();
        currentFlag.src = item.querySelector("img").src;
      } else {
        item.classList.remove("active");
      }
    });
  };

  const updateContent = (lang) => {
    document
      .querySelectorAll("[data-lang-en], [data-lang-vn]")
      .forEach((element) => {
        const text = element.getAttribute(`data-lang-${lang}`);
        if (text) {
          if (element.tagName === "TITLE") {
            document.title = text;
          } else {
            element.textContent = text;
          }
        }
      });

    setActiveLang(lang);
    currentLang = lang;
  };

  langItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLang = item.dataset.lang;
      updateContent(selectedLang);
      dropdownMenu.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!langToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  updateContent(currentLang);
});
