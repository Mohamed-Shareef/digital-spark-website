export const config = { runtime: "nodejs" };

let handlerPromise;
function getHandler() {
  if (!handlerPromise) {
    handlerPromise = import("../dist/server/index.js").then((m) => m.default);
  }
  return handlerPromise;
}

function nodeRequestToWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? req : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

export default async function (req, res) {
  const handler = await getHandler();
  const webRequest = nodeRequestToWebRequest(req);
  const webResponse = await handler.fetch(webRequest, {}, {});

  res.statusCode = webResponse.status;
  for (const [key, value] of webResponse.headers) {
    res.setHeader(key, value);
  }

  if (webResponse.body) {
    const reader = webResponse.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}
