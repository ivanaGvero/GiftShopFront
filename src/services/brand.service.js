import http from "../http-common";

class BrandsService {
  getAll() {
    return http.get("/brand/brand");
  }

  get(id) {
    return http.get(`/brand/brand/${id}`);
  }

  create(data) {
    return http.post("/brand/brand", data);
  }

  update(id, data) {
    return http.put(`/brand/brand/${id}`, data);
  }

  delete(id) {
    return http.delete(`/brand/brand/${id}`);
  }

}

export default new BrandsService();