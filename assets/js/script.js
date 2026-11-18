const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const resumeForm = document.getElementById("resume-access-form");
if (resumeForm) {
  resumeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.getElementById("resume-password");
    const feedback = document.getElementById("password-feedback");
    const downloads = document.getElementById("resume-downloads");
    const value = input.value;
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
    if (hash === "4a22a6393cfd9abd76ef1f105c0b99205fa72bf85a492ac0dc6df1484ef7b702") {
      downloads.hidden = false;
      feedback.textContent = "Access granted. Select the resume you want to download.";
      feedback.style.color = "#168f63";
      input.value = "";
    } else {
      downloads.hidden = true;
      feedback.textContent = "Incorrect password. Please try again.";
      feedback.style.color = "#b64b4b";
      input.select();
    }
  });
}
