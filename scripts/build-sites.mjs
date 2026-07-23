import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const staticRoot = path.join(distRoot, "static");
const serverRoot = path.join(distRoot, "server");
const hostingConfig = JSON.parse(
  await fs.readFile(path.join(projectRoot, ".openai", "hosting.json"), "utf8")
);

if (!hostingConfig.project_id) {
  throw new Error(".openai/hosting.json belum memiliki project_id");
}

const files = [
  ["ai/training-planner/", "ai/training-planner/index.html", "text/html; charset=utf-8"],
  ["ai/training-planner/index.html", "ai/training-planner/index.html", "text/html; charset=utf-8"],
  ["ai/training-planner/styles.css", "ai/training-planner/styles.css", "text/css; charset=utf-8"],
  ["ai/training-planner/app.js", "ai/training-planner/app.js", "text/javascript; charset=utf-8"],
  ["ai/training-planner/data/training-templates.js", "ai/training-planner/data/training-templates.js", "text/javascript; charset=utf-8"],
  ["ai/training-planner/data/handoyo-plan.js", "ai/training-planner/data/handoyo-plan.js", "text/javascript; charset=utf-8"],
  ["ai/training-planner/data/default-participants.js", "ai/training-planner/data/default-participants.js", "text/javascript; charset=utf-8"],
  ["ai/training-planner/og.png", "ai/training-planner/og.png", "image/png"],
  ["assets/images/favicon-32x32.png", "assets/images/favicon-32x32.png", "image/png"],
  ["assets/images/favicon-16x16.png", "assets/images/favicon-16x16.png", "image/png"],
  ["assets/images/apple-touch-icon.png", "assets/images/apple-touch-icon.png", "image/png"],
  ["assets/images/brand/logo-128.webp", "assets/images/brand/logo-128.webp", "image/webp"],
  ["robots.txt", "robots.txt", "text/plain; charset=utf-8"]
];

await fs.rm(distRoot, { recursive: true, force: true });
await fs.mkdir(staticRoot, { recursive: true });
await fs.mkdir(serverRoot, { recursive: true });

const assets = {};
for (const [route, source, type] of files) {
  const sourcePath = path.join(projectRoot, source);
  const bytes = await fs.readFile(sourcePath);
  assets[`/${route}`] = {
    base64: bytes.toString("base64"),
    type,
    html: type.startsWith("text/html")
  };
  const destinationPath = path.join(staticRoot, source);
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  await fs.writeFile(destinationPath, bytes);
}

const workerSource = `const assets = ${JSON.stringify(assets)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function securityHeaders(contentType, isHtml) {
  const headers = new Headers({
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Opener-Policy": "same-origin"
  });
  if (isHtml) {
    headers.set("Cache-Control", "no-store");
    headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
    );
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  } else {
    headers.set("Cache-Control", "public, max-age=86400");
  }
  return headers;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return Response.redirect(new URL("/ai/training-planner/", url), 302);
    }
    const asset = assets[url.pathname];
    if (!asset) {
      return new Response("Not Found", {
        status: 404,
        headers: securityHeaders("text/plain; charset=utf-8", false)
      });
    }
    let body = decodeBase64(asset.base64);
    if (asset.html) {
      const html = new TextDecoder().decode(body).replaceAll(
        "https://mozaiqfutureacademy.com",
        url.origin
      );
      body = new TextEncoder().encode(html);
    }
    if (request.method === "HEAD") {
      return new Response(null, { status: 200, headers: securityHeaders(asset.type, asset.html) });
    }
    return new Response(body, {
      status: 200,
      headers: securityHeaders(asset.type, asset.html)
    });
  }
};
`;

await fs.writeFile(path.join(serverRoot, "index.js"), workerSource);
await fs.mkdir(path.join(distRoot, ".openai"), { recursive: true });
await fs.copyFile(
  path.join(projectRoot, ".openai", "hosting.json"),
  path.join(distRoot, ".openai", "hosting.json")
);

console.log(`Built ${Object.keys(assets).length} static routes for Sites.`);
