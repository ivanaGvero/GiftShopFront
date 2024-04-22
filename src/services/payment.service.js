import http from "../http-common";

class PaymentService {

  pay(data, tokenId, value, userId) {
    const headers = {};
    if (tokenId) {
        headers.token = tokenId;
        headers.amount = value;
        headers.userId = userId;
    }
    return http.post("/payment/payment", data,
     { headers });
  }

  getAll(data, tokenId, value) {
    return http.get("/stripe/payment");
  }

}

export default new PaymentService();