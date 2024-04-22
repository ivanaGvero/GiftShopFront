import http from "../http-common";

class StripePaymentService {
  pay() {
    return http.get("/stripe/payment");
  }

}

export default new StripePaymentService();