export class ApiClientService {
  static post = async (
    path: string,
    body: Record<any, any>,
    params?: RequestInit
  ) => {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...params,
    });

    return response;
  };

  static delete = async (path: string, params?: RequestInit) => {
    const response = await fetch(path, {
      method: "DELETE",
      ...params,
    });

    return response;
  };
}
