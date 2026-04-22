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

const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

const stateChoices = new Choices(stateSelect, {
  searchEnabled: false,
  itemSelectText: "",
  placeholder: true,
  placeholderValue: "Selecione um estado",
  shouldSort: false,
});

const cityChoices = new Choices(citySelect, {
  searchEnabled: true,
  itemSelectText: "",
  placeholder: true,
  placeholderValue: "Selecione uma cidade",
  shouldSort: false,
});

async function fetchCities(state) {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
  );
  const cities = await response.json();
  return cities;
}

async function init() {
  const initialCities = await fetchCities(stateSelect.value);
  cityChoices.setChoices(
    initialCities.map((city) => ({
      value: city.nome,
      label: city.nome,
    })),
  );

  cityChoices.setChoiceByValue(initialCities[0].nome);
}

init();

stateSelect.addEventListener("change", async () => {
  const state = stateSelect.value;

  if (!state) return;

  const cities = await fetchCities(state);

  cityChoices.clearStore();
  cityChoices.clearChoices();
  cityChoices.setChoices(
    cities.map((city) => ({
      value: city.nome,
      label: city.nome,
    })),
  );

  cityChoices.setChoiceByValue(cities[0].nome);
});

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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
}

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
  };

  if (!isValidEmail(data.email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (!isValidPhone(data.phone)) {
    alert("Por favor, insira um número válido.");
    return;
  }

  window.alert("Form enviado!");
  console.log(data);
});

// ===== FOOTER CONTACT =====

const contactBtn = document.getElementById("contact-btn");

contactBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("+55 (11) 2227.3076").then(() => {
    const original = contactBtn.textContent;
    contactBtn.textContent = "Copiado!";
    setTimeout(() => (contactBtn.textContent = original), 2000);
  });
});
