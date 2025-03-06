export class EntityApiService {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  getPath = (path?: string) => {
    return `${this.url}${path || ""}`;
  };

  handleResponse = async (promise: Promise<any>): Promise<any> => {
    const res = await promise;

    if (!res.ok) throw new Error("Error en la solicitud");

    return res;
  };
}
