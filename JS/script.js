document.addEventListener("DOMContentLoaded", function () {
  loadTanksList();
  document
    .getElementById("formAdicionarTank")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      adicionarTank();
    });
});
function adicionarTank() {
  const id = document.getElementById("id").value;
  const titulo = document.getElementById("tituloTank").value;
  const exemplo = document.getElementById("exemploTank").value;
  const autor = document.getElementById("autorTank").value;
  const descricao = document.getElementById("descricaoTank").value;
  const ano = document.getElementById("anoTank").value;
  const pais = document.getElementById("paisTank").value;
  if (!id || !titulo || !exemplo || !autor || !descricao || !ano || !pais) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  fetch("http://localhost:3000/tanks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      exemplo: exemplo,
      autor: autor,
      descricao: descricao,
      ano: ano,
      pais: pais,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao adicionar tank");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loadTanksList();
    })
    .catch((error) => {
      alert("ID Repetido, tente outro.");
    });
}
function loadTanksList() {
  fetch("http://localhost:3000/tanks")
    .then((response) => response.json())
    .then((data) => displayTanksList(data))
    .catch((error) => console.error("Error:", error));
}
function displayTanksList(data) {
  const listaTanks = document.getElementById("listaTanks");
  listaTanks.innerHTML = "";
  data.forEach((tank) => {
    const listItem = document.createElement("div");
    listItem.classList = `tank`;
    listItem.innerHTML = `
          <img src="${tank.exemplo}" id="iconeTank">
          <h3 id="texto">${tank.titulo}
          <h4 id="texto2">${tank.descricao}
      `;
    listItem.addEventListener("click", function () {
      ver(tank.id);
    });
    listaTanks.appendChild(listItem);
  });
  function ver(id) {
    const tank = data.find((tank) => tank.id === id);
    if (tank) {
      const modalM = document.getElementById("dialogTank");
      modalM.showModal();
      const vish = document.getElementById("quadrado-preto");
      vish.innerHTML = `
          <h4 onclick="sairModal2()">Voltar</h4>
          <h2>Tank:</h2>
          <div id="dentro">
              <a href="https://www.youtube.com/results?search_query=tank ${tank.titulo}"><img src="${tank.exemplo}" id="iconeTank"></a>
              <br>
              <h3>ID: ${id}</p>
              <p>Título: ${tank.titulo}</p>
              <p>Autor do Tank: ${tank.autor}</p>
              <p>Descrição: ${tank.descricao}</p>
          </div>
          <div id="botoes">
              <button type="button" onClick="deletarTank(${tank.id})" class="botao">Deletar</button>
              <button type="button" onClick="alterarTanks(${tank.id}, '${tank.titulo}', '${tank.exemplo}', '${tank.autor}', '${tank.descricao}', '${tank.ano}', '${tank.pais}')" class="botao" id="botaoAlt">Alterar</button>
          </div>
          `;
    }
  }
}
function alterarTanks(id, titulo, exemplo, autor, descricao, ano, pais) {
  const modalA = document.getElementById("dialogAlt");
  modalA.showModal();
  document.getElementById("idAlt").value = id;
  document.getElementById("tituloTankAlt").value = titulo;
  document.getElementById("exemploTankAlt").value = exemplo;
  document.getElementById("autorTankAlt").value = autor;
  document.getElementById("descricaoTankAlt").value = descricao;
  document.getElementById("anoTankAlt").value = ano;
  document.getElementById("paisTankAlt").value = pais;
  document.getElementById("idAlt").readOnly = true;
}
function alterarTank() {
  const id = parseInt(document.getElementById("idAlt").value);
  const titulo = document.getElementById("tituloTankAlt").value;
  const exemplo = document.getElementById("exemploTankAlt").value;
  const autor = document.getElementById("autorTankAlt").value;
  const descricao = document.getElementById("descricaoTankAlt").value;
  const ano = document.getElementById("anoTankAlt").value;
  const pais = document.getElementById("paisTankAlt").value;
  fetch(`http://localhost:3000/tanks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      exemplo: exemplo,
      autor: autor,
      descricao: descricao,
      ano: ano,
      pais: pais,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao adicionar tank");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loadTanksList();
    })
    .catch((error) => {
      alert("Erro ao adicionar tank.");
    });
}
function deletarTank(id) {
  fetch(`http://localhost:3000/tanks/${id}`, {
    method: "DELETE",
  });
}
function sairModal() {
  const modal = document.getElementById("dialogAdd");
  modal.close();
}
function sairModal2() {
  const modalM = document.getElementById("dialogTank");
  modalM.close();
}
function sairModal3() {
  const modalA = document.getElementById("dialogAlt");
  modalA.close();
}
function adicionarModal() {
  const modal = document.getElementById("dialogAdd");
  modal.showModal();
}