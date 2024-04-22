import http from "../http-common";

class StaffService {
  getAll() {
    return http.get("/staff/staff");
  }

  get(id) {
    return http.get(`/staff/staff/${id}`);
  }

  create(data) {
    return http.post("/staff/staff", data);
  }

  update(id, data) {
    return http.put(`/staff/staff/${id}`, data);
  }

  delete(id) {
    return http.delete(`/staff/staff/${id}`);
  }

}

export default new StaffService();