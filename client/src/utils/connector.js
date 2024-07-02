export async function askServer(
  route,
  method,
  body = {},
  content = "application/json;charset=utf-8"
) {
  // const baseUrl = "http://139.162.166.227:3000";
  const baseUrl = "https://server.exdb.local";
  const data = {
    headers: {
      "Content-Type": content,
      Accept: "application/json",
    },
    credentials: "include",
    mode: "cors",
    method: method,
  };

  if (method === "POST" || method === "PUT") {
    data.body = JSON.stringify(body);
  }

  const response = await fetch(baseUrl + route, data);
  if (response.status === 200) {
    return {
      status: response.status,
      response: await response.json(),
    };
  }
  return {
    status: response.status,
  };
}
