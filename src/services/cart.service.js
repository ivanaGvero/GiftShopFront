class CartService {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (!cart) {
        cart = [];
      }

      const existing = cart.find(x => x.productId === product.productId);
      if (existing) {
        existing.selectedQuantity +=1;
      } else {
        cart.push({
            ...product,
            selectedQuantity: 1
        })
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }

    getCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = [];
        }

        return cart;
    }

    clearStorage() {
        localStorage.removeItem("cart");
    }
  }
  
  export default new CartService();