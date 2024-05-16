let body = document.querySelector("body");

const Proracun = () => {
  const maticnaPloca =
    parseFloat(document.getElementById("maticnaPloca").value) || 0;
  const ram = parseFloat(document.getElementById("ram").value) || 0;
  const ssd = parseFloat(document.getElementById("ssd").value) || 0;
  const grafickaKartica =
    parseFloat(document.getElementById("grafickaKartica").value) || 0;
  const procesor = parseFloat(document.getElementById("procesor").value) || 0;

  if (maticnaPloca && ram && ssd && grafickaKartica && procesor) {
    const total = maticnaPloca + ram + ssd + grafickaKartica + procesor;

    let ukupnaCijena = document.getElementById("totalPrice");

    if (!ukupnaCijena) {
      ukupnaCijena = document.createElement("h2");
      ukupnaCijena.id = "totalPrice";
      body.appendChild(ukupnaCijena);
    }

    ukupnaCijena.innerText = `Ukupna cijena racunara je ${total.toFixed(2)} KM`;
  } else if (
    maticnaPloca < 0 ||
    ram < 0 ||
    ssd < 0 ||
    grafickaKartica < 0 ||
    procesor < 0
  ) {
    alert("Cijena mora biti veca 0 KM");

    let ukupnaCijena = document.getElementById("totalPrice");

    if (ukupnaCijena) {
      body.removeChild(ukupnaCijena);
    }
  } else {
    let ukupnaCijena = document.getElementById("totalPrice");

    if (ukupnaCijena) {
      body.removeChild(ukupnaCijena);
    }
  }
};

let inputs = document.querySelectorAll("input").forEach((e) => {
  e.addEventListener("input", Proracun);
});
