import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const root = new URL(".", import.meta.url).pathname;
const port = Number.parseInt(process.env.PORT || "4173", 10);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function resolvePath(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, cleanPath === "/" ? "index.html" : cleanPath);
  if (!filePath.startsWith(root)) return join(root, "index.html");
  if (existsSync(filePath) && statSync(filePath).isFile()) return filePath;
  return join(root, "index.html");
}

createServer((request, response) => {
  const filePath = resolvePath(request.url || "/");
  response.writeHead(200, {
    "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Ayse Sude blog site running at http://127.0.0.1:${port}`);
});
