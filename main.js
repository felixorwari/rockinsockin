const app = Vue.createApp({
  data() {
    return {
      cart: [],
      products: [],
      stockThreshold: 5,
    }
  },

  methods: {
    fetchProducts() {
      fetch('./data/products.json')
        .then((response) => {
          console.log('Loading product data...')

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json()
        })
        .then((data) => {
          this.products = data
          console.log('Product data loaded successfully')
        })
        .catch((error) => {
          console.error('Couldn\'t load product info: ', error);
        })
    },

    updateCart(product, quantity) {
      console.log('Adding item to shopping basket..')

      // Add product to cart
      this.cart.push({
        product: product.id,
        variant: product.selectedVariant.id,
        quantity: quantity
      })

      console.log('Item successfully added to basket!')
    },

    showCart() {
      console.log(this.cart);
    }
  },

  created() {
    this.fetchProducts();
  }
})