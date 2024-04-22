import http from "../http-common";

class OrderService {
  getAll() {
    return http.get("/orders/orders");
  }

  get(id) {
    return http.get(`/orders/orders/${id}`);
  }

  create(data) {
    return http.post("/orders/orders", data);
  }

  update(id, data) {
    return http.put(`/orders/orders/${id}`, data);
  }

  delete(id) {
    return http.delete(`/orders/orders/${id}`);
  }

}

export default new OrderService();