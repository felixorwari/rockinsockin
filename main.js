const app = Vue.createApp({
    data() {
        return {
            cart: [],
            stockThreshold: 5,
        }
    },

    methods: {
        updateCart(product, quantity) {
            // Add product to cart
            // this.cart.push([product.id, product.selectedVariant.id])
            this.cart.push({
                product: product.id,
                variant: product.selectedVariant.id,
                quantity: quantity
            })
            console.log(this.cart)
        }
    }
})