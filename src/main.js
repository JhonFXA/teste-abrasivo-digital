const nav = document.getElementById("nav-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

const items = document.querySelectorAll(".testimonials .item");
const btns = document.querySelectorAll(".testimonials .carousel-btn");

function goTo(index) {
  items.forEach((item) => item.classList.remove("active"));
  btns.forEach((btn) => btn.classList.remove("active"));
  items[index].classList.add("active");
  btns[index].classList.add("active");
}

btns.forEach((btn, i) => btn.addEventListener("click", () => goTo(i)));

goTo(0);

// ===== FORM VALIDATION =====

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 10) {
    value = value.replace(/^(\d{2})/, "($1) ").replace(/(\d{4})(\d)/, "$1-$2");
  } else {

    value = value.replace(/^(\d{2})/, "($1) ").replace(/(\d{5})(\d)/, "$1-$2");
  }
  phoneInput.value = value;
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    enterprise: document.getElementById("enterprise").value.trim(),
    state: document.getElementById("state").value,
    city: document.getElementById("city").value.trim(),
    mensage: document.getElementById("message").value.trim(),
  }

  window.alert("Form enviado!");
});


// ===== FOOTER CONTACT =====

const contactBtn = document.getElementById('contact-btn');

contactBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('+55 (11) 2227.3076').then(() => {
    const original = contactBtn.textContent;
    contactBtn.textContent = 'Copiado!';
    setTimeout(() => contactBtn.textContent = original, 2000);
  });
});