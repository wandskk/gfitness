const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

const SECRET_KEY =
  "EVuxVvTpl2kNClVmRKDAiubNm8QZr3s56BvqmaziiYmlaMSCovU6gd0qUGvu3Rw";

// Middleware para criar um JWT
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const { id, username, password, name, gender, userType } = user;
    const token = jwt.sign(
      { id, username, password, name, gender, userType },
      SECRET_KEY,
      { expiresIn: "4h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});

// Middleware para proteger as rotas
server.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "Token não fornecido" });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("JSON Server is running");
});

server.get("/clients", (req, res) => {
  const clients = router.db.get("clients").value();
  clients.sort((a, b) => a.name.localeCompare(b.name));
  res.json(clients);
});

// Adicionar novo cliente
server.post("/clients", (req, res) => {
  const newClient = req.body;

  const clients = router.db.get("clients");
  const lastIndex = clients.value().reduce((maxId, client) => {
    return client.id > maxId ? client.id : maxId;
  }, 0);
  newClient.id = lastIndex + 1;

  clients.push(newClient).write();

  res.json(newClient);
});

// Lista o cliente pelo id
server.get("/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = router.db.get("clients").find({ id: clientId }).value();
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: "Cliente não encontrado" });
  }
});

// Atualizar dados do cliente pelo id
server.put("/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const updatedClient = req.body;
  const existingClient = router.db.get("clients").find({ id: clientId });

  if (existingClient.value()) {
    existingClient.assign(updatedClient).write();
    res.json(updatedClient);
  } else {
    res.status(404).json({ message: "Cliente não encontrado" });
  }
});

// Deletar um cliente pelo id
server.delete("/clients/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const existingClient = router.db.get("clients").find({ id: clientId });

  if (existingClient.value()) {
    existingClient.remove().write();
    res.json({ message: "Cliente deletado com sucesso" });
  } else {
    res.status(404).json({ message: "Cliente não encontrado" });
  }
});
