const express = require("express");
const cors = require("cors");
const server = express();
const dadosTanks = require("../BdDJSON/tanks.json");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../Swagger/swagger.json");
server.use(cors());
server.use(express.json());
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.post("/tanks", (req, res) => {
  const novaTank = req.body;
  novaTank.id = parseInt(novaTank.id);
  if (
    !novaTank.id ||
    !novaTank.titulo ||
    !novaTank.exemplo ||
    !novaTank.autor ||
    !novaTank.descricao ||
    !novaTank.ano ||
    !novaTank.pais
  ) {
    return res
      .status(400)
      .json({ mensagem: "Dados incompletos, tente novamente" });
  } else {
    const TankExistente = dadosTanks.Tank.find(
      (Tank) => Tank.id === novaTank.id
    );
    if (TankExistente) {
      return res.status(400).json({
        mensagem: "ID já existe, tente novamente com um ID diferente",
      });
    } else {
      dadosTanks.Tank.push(novaTank);
      salvarDadosTanks(dadosTanks);
      return res
        .status(201)
        .json({ mensagem: "Novo Tank cadastrado com sucesso!" });
    }
  }
});
server.get("/tanks", (req, res) => {
  return res.json(dadosTanks.Tank);
});
server.put("/tanks/:id", (req, res) => {
  const TankId = parseInt(req.params.id);
  const atualizarTank = req.body;
  const idTank = dadosTanks.Tank.findIndex((m) => m.id === TankId);
  if (idTank === -1) {
    return res.status(404).json({ mensagem: "Tank não encontrado :/" });
  } else {
    dadosTanks.Tank[idTank].id = atualizarTank.id || dadosTanks.Tank[idTank].id;
    dadosTanks.Tank[idTank].titulo =
      atualizarTank.titulo || dadosTanks.Tank[idTank].titulo;
    dadosTanks.Tank[idTank].exemplo =
      atualizarTank.exemplo || dadosTanks.Tank[idTank].exemplo;
    dadosTanks.Tank[idTank].autor =
      atualizarTank.autor || dadosTanks.Tank[idTank].autor;
    dadosTanks.Tank[idTank].descricao =
      atualizarTank.descricao || dadosTanks.Tank[idTank].descricao;
    dadosTanks.Tank[idTank].ano =
      atualizarTank.ano || dadosTanks.Tank[idTank].ano;
    dadosTanks.Tank[idTank].pais =
      atualizarTank.pais || dadosTanks.Tank[idTank].pais;
    salvarDadosTanks(dadosTanks);
    return res.json({ mensagem: "Tank atualizado com sucesso!" });
  }
});
server.delete("/tanks/:id", (req, res) => {
  const TankId = parseInt(req.params.id);
  dadosTanks.Tank = dadosTanks.Tank.filter((m) => m.id !== TankId);
  salvarDadosTanks(dadosTanks);
  return res.status(200).json({ mensagem: "Tank excluído com sucesso" });
});
server.listen(3000, () => {
  console.log("O servidor está funcionando! :3");
});
function salvarDadosTanks() {
  fs.writeFileSync("./BdDJSON/tanks.json", JSON.stringify(dadosTanks));
}
module.exports = { server, salvarDadosTanks };
