const app = Vue.createApp({
    data() {
        return {
            cart: 0,
            stockThreshold: 5,
            products: [
                {
                    id: 1,
                    brand: "Chameleon Chic",
                    name: "Socks",
                    description: 'Available in refreshing green and cool blue. Whether you\'re feeling like a verdant forest or a tranquil ocean, these socks will match your mood effortlessly.',
                    selectedVariant: null,
                    selectedSize: null,
                    details: ['50% Cotton', '30% Wool', '20% Polyester'],
                    variants: [
                        { id: 2234, color: 'Green', image: './assets/images/socks_green.jpg', quantity: 8 },
                        { id: 1135, color: 'Navy', image: './assets/images/socks_blue.jpg', quantity: 15 },
                    ],
                    sizes: ['small (s)', 'medium (m)', 'large (lg)'],
                    totalInventory: 0
                },
                {
                    id: 2,
                    brand: "Sunrise Spectrum",
                    name: "Socks",
                    description: "Embrace the vibrant hues of dawn with our Sunrise Spectrum socks. Available in warm orange and radiant yellow, these socks will brighten up your day with every step.",
                    selectedVariant: null,
                    selectedSize: null,
                    details: ['70% Cotton', '25% Nylon', '5% Spandex'],
                    variants: [
                        { id: 3234, color: 'Orange', image: './assets/images/socks_orange.jpg', quantity: 8 },
                        { id: 3335, color: 'Pink', image: './assets/images/socks_magenta.jpg', quantity: 12 },
                        { id: 3335, color: 'Lime', image: './assets/images/socks_lime.jpg', quantity: 0 },
                    ],
                    sizes: ['small (s)', 'medium (m)', 'large (lg)'],
                    totalInventory: 0
                },
                {
                    id: 3,
                    sku: "BW20HT21P123456",
                    brand: "Rainbow Dreams",
                    name: "Socks",
                    description: "Experience the magic of rainbow dreams with our vibrant socks. Available in three stunning colors to match your every mood.",
                    defaultImage: "./assets/images/socks_rainbow.jpg",
                    selectedVariant: null,
                    selectedSize: null,
                    details: ['80% Cotton', '15% Polyester', '5% Spandex'],
                    variants: [
                        { id: 4234, color: 'Red', image: './assets/images/socks_red.jpg', quantity: 10 },
                        { id: 4235, color: 'Blue', image: './assets/images/socks_blue.jpg', quantity: 8 },
                        { id: 4236, color: 'Yellow', image: './assets/images/socks_yellow.jpg', quantity: 12 },
                    ],
                    sizes: ['small (s)', 'medium (m)', 'large (lg)'],
                    url: 'https://example.com/rainbow_dreams_socks',
                    totalInventory: 0
                }
            ]
        }
    },

    beforeMount() {
        // Calculate the total invetory for each product
        this.products.forEach(product => {
            product.totalInventory = product.variants.reduce((total, variant) => total + variant.quantity, 0)
        });

        // Set a default variant
        this.products.forEach(product => {
            const variant = product.variants.find(variant => variant.quantity > 0);

            if (variant) {
                product.selectedVariant = variant
            }
        })
    },

    methods: {
        addToCart(productID) {
            // Find the product by ID
            const product = this.products.find(product => product.id === productID)
            if (!product || !product.selectedVariant || product.selectedVariant.quantity <= 0) return // Product not found, or no variant selected, or variant out of stock

            // Increment cart count
            this.cart += 1

            // Decrement quantity of selected variant
            product.selectedVariant.quantity -= 1

            // Recalculate total inventory
            product.totalInventory = product.variants.reduce((total, variant) => total + variant.quantity, 0)
        },

        updateVariant(product, variant) {
            product.selectedVariant = variant
        }
    }
})