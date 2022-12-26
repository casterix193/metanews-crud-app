import axios from "axios";

export const client = axios.create({ baseURL: "https://metaadmin.onrender.com/api/" });

client.interceptors.response.use((response) => response.data);

export class Articles {
  static list = async () => {
    return client.get("articles");
  };

  static get = async (id) => {
    return client.get(`articles/${id}`);
  };

  static create = async (data) => {
    return client.post("articles", data);
  };

  static update = async (id, data) => {
    return client.put(`articles/${id}`, data);
  };

  static delete = async (id) => {
    return client.delete(`articles/${id}`);
  };
}

export class Resources {
  static list = async () => {
    return client.get("resources");
  };

  static get = async (id) => {
    return client.get(`resources/${id}`);
  };

  static create = async (data) => {
    return client.post("resources", data);
  };

  static update = async (id, data) => {
    return client.put(`resources/${id}`, data);
  };

  static delete = async (id) => {
    return client.delete(`resources/${id}`);
  };
}
