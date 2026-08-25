export const config = { runtime: "edge" };

let handlerPromise;
function getHandler() {
  if (!handlerPromise) {
    handlerPromise = import("../dist/server/index.js").then((m) => m.default);
  }
  return handlerPromise;
}

export default async function (request) {
  const handler = await getHandler();
  return handler.fetch(request, {}, {});
}
