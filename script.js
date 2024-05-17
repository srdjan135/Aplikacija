let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modall");
let input = modal.querySelector("input");
let izmjeni = modal.querySelector("#izmjeni");
let odustani = document.querySelectorAll(".odustani");
let dodaj = document.querySelector("#dodaj");
let modal2 = document.querySelector(".modall2");
let dodati = modal2.querySelector("#dodati");
let input2 = modal2.querySelector("input");
let form = document.querySelector("form");
let trenutnaVrijednost = null;
let body = document.querySelector("body");

const displayNone = () => {
  modal.style.display = "none";
  modal2.style.display = "none";
  overlay.style.display = "none";
};
overlay.addEventListener("click", displayNone);

odustani.forEach((e) => {
  e.addEventListener("click", displayNone);
});

dodati.addEventListener("click", () => {
  if (input2.value === "") {
    alert("Morate unijeti naziv");
  } else {
    let noviElement = document.createElement("div");
    noviElement.classList.add("form-group");
    noviElement.innerHTML = `
      <label for="${input2.value}">${input2.value}</label>
      <div class="inner-div">
        <input type="number" class="form-control" id="${input2.value}" />
        <span>KM</span>
        <i class="ri-pencil-fill" title="Promjena imena"></i>
          <i class="fa-solid fa-trash" title="Brisanje"></i>
      </div>
    `;
    form.appendChild(noviElement);
    displayNone();

    noviElement.querySelector("input").addEventListener("input", Proracun);
  }
});

form.addEventListener("click", (e) => {
  if (e.target.classList.contains("ri-pencil-fill")) {
    modal.style.display = "flex";
    overlay.style.display = "block";
    let glavniDiv = e.target.closest(".form-group");
    let naziv = glavniDiv.querySelector("label");
    input.value = naziv.innerText;
    trenutnaVrijednost = naziv;
  }

  if (e.target.classList.contains("fa-solid")) {
    let item = e.target.closest(".form-group");
    item.remove();
    Proracun();
  }
});

izmjeni.addEventListener("click", () => {
  if (input.value === "") {
    alert("Morate unijeti naziv");
  } else {
    trenutnaVrijednost.innerText = input.value;
    displayNone();
  }
});

dodaj.addEventListener("click", () => {
  modal2.style.display = "flex";
  overlay.style.display = "block";
});

const Proracun = () => {
  let total = 0;
  let validnost = true;
  let popunjenaPolja = true;

  document.querySelectorAll("input[type='number']").forEach((input) => {
    const value = parseFloat(input.value);
    if (isNaN(value)) {
      popunjenaPolja = false;
    } else if (value < 1) {
      validnost = false;
    } else {
      total += value;
    }
  });

  if (!validnost) {
    alert("Cijena mora biti veca od 0 KM");

    let ukupnaCijena = document.getElementById("totalPrice");
    if (ukupnaCijena) {
      ukupnaCijena.remove();
    }
    return;
  }

  if (!popunjenaPolja) {
    let ukupnaCijena = document.getElementById("totalPrice");
    if (ukupnaCijena) {
      ukupnaCijena.remove();
    }
    return;
  }

  let ukupnaCijena = document.getElementById("totalPrice");

  if (!ukupnaCijena) {
    ukupnaCijena = document.createElement("h2");
    ukupnaCijena.id = "totalPrice";
    body.appendChild(ukupnaCijena);
  }

  ukupnaCijena.innerText = `Ukupna cijena racunara je ${total.toFixed(2)} KM`;
};

document.querySelectorAll("input[type='number']").forEach((e) => {
  e.addEventListener("input", Proracun);
});
