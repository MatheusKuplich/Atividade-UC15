const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const siteDirectory = path.resolve(__dirname, "..");
const port = 4173;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp"
};

const server = http.createServer((request, response) => {
  let requestPath;

  try {
    requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch (error) {
    console.error("O caminho solicitado não pôde ser interpretado.", error);
    response.writeHead(400).end("Caminho inválido.");
    return;
  }

  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const filePath = path.resolve(siteDirectory, relativePath);

  if (filePath !== siteDirectory && !filePath.startsWith(`${siteDirectory}${path.sep}`)) {
    response.writeHead(403).end("Acesso negado.");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code !== "ENOENT") {
        console.error(`Não foi possível ler ${filePath}.`, error);
      }

      const isMissing = error.code === "ENOENT";
      response.writeHead(isMissing ? 404 : 500).end(
        isMissing ? "Arquivo não encontrado." : "Não foi possível ler o arquivo."
      );
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(content);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Yggdrasil disponível em http://127.0.0.1:${port}`);
});
