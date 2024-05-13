app.component('product-display', {
  template:
    /*html*/
    `<div class="flex flex-col gap-8 px-4 py-8 product-display md:px-0">
    <div
      v-for="product in products"
      :key="product.id"
      class="flex flex-col product-container md:flex-row md:gap-6"
    >
      <!-- Product Image -->
      <div
        class="w-full overflow-hidden bg-white border-2 border-gray-100 rounded product-image md:w-1/2"
      >
        <img
          :src="product.selectedVariant.image"
          :alt="product.title"
          class="hover:scale-[110%] object-cover transition"
        />
      </div>

      <!-- Product Info -->
      <div
        class="w-full product-info md:pt-4 md:pb-8 md:w-1/2 text-balance"
      >
        <!-- Inventory Status -->
        <div class="flex items-center mb-4 text-xs inventory">
          <span
            v-if="product.totalInvetory > stockThreshold"
            class="px-4 py-2 text-green-700 bg-green-100 rounded"
          >
          <i class="fa-regular fa-circle-check mr-2 "></i> In stock
          </span>

          <span
            v-else-if="product.totalInvetory <= stockThreshold && product.totalInvetory > 0"
            class="px-4 py-2 text-yellow-700 bg-yellow-100 rounded"
          >
          <i class="fa-regular fa-triangle-exclamation mr-2 "></i> Few items remaining!
          </span>

          <span v-else class="px-4 py-2 text-red-700 bg-red-100 rounded">
          <i class="fa-regular fa-circle-exclamation mr-2 "></i>  Sold out!
          </span>
        </div>

        <h1 class="product-title">
          {{ product.brand + ' ' + product.name }}
        </h1>

        <p class="product-description justify">{{ product.description }}</p>

        <h4>Material</h4>
        <ul>
          <li v-for="productDetail in product.details">
            {{ productDetail }}
          </li>
        </ul>

        <h4>Colors</h4>
        <div class="flex gap-8">
          <div
            v-for="variant in product.variants"
            :key="variant.id"
            @click="updateVariant(product, variant)"
            class="flex items-center group hover:cursor-pointer"
          >
            <span
              :style="{ borderColor: variant.color }"
              class="inline-block w-5 h-5 mr-2 capitalize transition bg-white border-8 border-white rounded-full group-hover:scale-125"
            ></span
            >{{ variant.color }} &nbsp;
            <span class="text-sm italic text-gray-400"
              >({{ variant.quantity }} items)</span
            >
          </div>
        </div>

        <h4>Sizes</h4>
        <div class="flex gap-4 tracking-wide">
          <span
            v-for="(size, index) in product.sizes"
            :key="index"
            @click="updateSize(product, size)"
            class="px-4 py-2 text-xs font-semibold bg-gray-100 border-2 border-gray-200 rounded hover:bg-white hover:cursor-pointer"
            >{{ size.toUpperCase() }}</span
          >
        </div>

        <!-- Action Button(s) -->
        <div class="flex gap-6 mt-8 actions">
          <button
            :disabled="!product.selectedVariant || product.selectedVariant.quantity <= 0"
            @click="addToCart(product.id)"
            type="button"
            class="px-6 py-4 text-sm font-semibold tracking-wide text-white uppercase transition bg-blue-700 rounded hover:bg-blue-600 hover:shadow-lg hover:disabled:shadow-none disabled:bg-blue-700 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>`,

  data() {
    return {
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
    },

    updateSize(product, size) {
      product.selectedSize = size
    }
  }
});