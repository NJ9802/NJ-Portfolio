export class ApiClientService {
  static post = async (
    path: string,
    body: Record<any, any>,
    headers?: HeadersInit
  ) => {
    const response = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    return response;
  };
}
