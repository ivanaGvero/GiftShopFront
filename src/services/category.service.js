import http from "../http-common";

class CategoryService {
  getAll() {
    return http.get("/categories/category");
  }

  get(id) {
    return http.get(`/categories/category/${id}`);
  }

  create(data) {
    return http.post("/categories/category", data);
  }

  update(id, data) {
    return http.put(`/categories/category/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categories/category/${id}`);
  }

}

export default new CategoryService();