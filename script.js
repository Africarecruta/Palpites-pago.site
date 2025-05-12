
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("palpiteForm");
  const resultado = document.getElementById("resultado");
  const rankingEl = document.getElementById("ranking");

  function atualizarRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    rankingEl.innerHTML = "";
    ranking.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${item.nome} - ${item.palpite} (${item.status})`;
      rankingEl.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const palpite = document.getElementById("palpite").value;
    const ganhou = Math.random() < 0.3; // 30% chance de "ganhar"
    const status = ganhou ? "ACERTOU" : "ERROU";

    resultado.textContent = `${nome}, você ${status} o palpite!`;

    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.unshift({ nome, palpite, status });
    localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 10))); // Top 10
    atualizarRanking();

    form.reset();
  });

  atualizarRanking();
});
