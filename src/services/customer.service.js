import http from "../http-common";

class CustomerService {
  getAll() {
    return http.get("/customer/customer");
  }

  get(id) {
    return http.get(`/customer/customer/${id}`);
  }

  create(data) {
    return http.post("/customer/customer", data);
  }

  update(id, data) {
    return http.put(`/customer/customer/${id}`, data);
  }

  delete(id) {
    return http.delete(`/customer/customer/${id}`);
  }

}

export default new CustomerService();