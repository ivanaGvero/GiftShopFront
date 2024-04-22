import http from "../http-common";

class ReviewService {
  getAll() {
    return http.get("/review/review");
  }

  get(id) {
    return http.get(`/review/review/${id}`);
  }

  getByProductId(id) {
    return http.get(`/review/review/product/${id}`);
  }

  create(data) {
    return http.post("/review/review", data);
  }

  update(id, data) {
    return http.put(`/review/review/${id}`, data);
  }

  delete(id) {
    return http.delete(`/review/review/${id}`);
  }

}

export default new ReviewService();