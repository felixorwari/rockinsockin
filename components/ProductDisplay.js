app.component('product-display', {
  emits: ['add-to-cart'],
  props: {
    stockThreshold: {
      type: Number,
      required: true
    }
  },
  template:
    /*html*/
    `
    <div class="flex flex-col px-4 py-8 product-display xl:px-0 gap-8">
      <section
        v-for="product in products"
        :key="product.id"
        class="flex flex-col product-container md:flex-row gap-8"
      >
        <!-- Product Image -->
        <figure
          class="grid w-full overflow-hidden bg-white border-2 border-gray-100 rounded product-image md:w-1/2"
        >
          <img
            :src="product.selectedVariant.image"
            :alt="product.brand"
            :title="product.brand"
            class="w-full h-auto hover:scale-[110%] object-cover transition"
          />
          <figcaption class="sr-only">{{ product.brand + ' ' + product.name }}</figcaption>
        </figure>

        <!-- Product Info -->
        <article
          class="w-full prose product-info md:pt-4 md:pb-8 md:w-1/2 text-balance my-8"
        >
          <!-- Inventory Status -->
          <div class="flex items-center mb-4 text-xs inventory">
            <span
              v-if="product.selectedVariant.quantity > stockThreshold"
              class="px-4 py-2 text-green-600 bg-green-50 rounded"
            >
              <i class="fa-solid fa-circle-check mr-2 "></i> In stock
            </span>

            <span
              v-else-if="product.selectedVariant.quantity <= stockThreshold && product.selectedVariant.quantity > 0"
              class="px-4 py-2 text-yellow-600 bg-yellow-50 rounded"
            >
              <i class="fa-solid fa-triangle-exclamation mr-2 "></i> Few items remaining!
            </span>

            <span v-else class="px-4 py-2 text-red-600 bg-red-50 rounded">
              <i class="fa-solid fa-circle-exclamation mr-2 "></i>  Sold out!
            </span>
          </div>

          <h1 class="product-title">
            {{ product.brand + ' ' + product.name }}
          </h1>

          <p class="product-description">{{ product.description }}</p>

          <div class="my-4">
            <p class="font-semibold text-2xl">Ksh. {{ product.price.toLocaleString() }}/-</p>
          </div>

          <h4>Material:</h4>
          <p>{{ product.material.join(', ') }}</p>

          <h4>Choose Color: </h4>
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

          <h4>Select size:</h4>
          <div class="flex gap-4 tracking-wide">
            <span
              v-for="(size, index) in product.sizes"
              :key="index"
              @click="updateSize(product, size)"
              class="px-2 sm:px-4 py-2 text-xs font-semibold bg-gray-100 border-2 border-gray-200 rounded hover:bg-white hover:cursor-pointer"
              >{{ size.toUpperCase() }}</span
            >
          </div>

          <!-- Action Button(s) -->
          <div class="flex items-end gap-6 mt-8 actions">
            <div class="">
              <label for="orderQuantity" class="mr-2 mb-2 block font-medium">Quantity</label>
              <div class="relative flex items-center">
                <button 
                  type="button" 
                  class="-mr-[1px] bg-gray-100 border border-gray-300 px-4 py-[.425rem] focus:ring-2 rounded-s disabled:opacity-25" 
                  @click="orderQuantity--"
                  :disabled="product.selectedVariant.quantity === 0 || orderQuantity <= 1"
                  >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  v-model="orderQuantity"
                  name="orderQuantity"
                  class="w-12 h-11 text-center text-sm py-2.5 border-gray-300" 
                  min="1" 
                  :max="product.selectedVariant.quantity" 
                  :disabled="product.selectedVariant.quantity === 0"
                  step="1"
                  required />
                <button 
                  type="button" 
                  class="-ml-[1px] bg-gray-100 border border-gray-300 px-4 py-[.425rem] focus:ring-2 rounded-e disabled:opacity-25" 
                  @click="orderQuantity++"
                  :disabled="product.selectedVariant.quantity === 0 || orderQuantity >= product.selectedVariant.quantity"
                  >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>

            <button
              :disabled="!product.selectedVariant || product.selectedVariant.quantity <= 0"
              @click="addToCart(product, orderQuantity)"
              type="button"
              class="px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition bg-gradient-to-br from-blue-700 to-blue-800 rounded hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:disabled:shadow-none disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <i class="mr-2 fa-solid fa-cart-plus"></i>
              Buy Now
            </button>
          </div>
        </article>
      </section>
    </div>
  `,

  data() {
    return {
      products: [
        {
          id: 3,
          sku: "BW20HT21P123456",
          brand: "CozyFeet",
          name: "Ankle Socks",
          description: "Wrap your feet in comfort and style with our CozyFeet Ankle Socks! These socks are like a warm hug for your feet, available in two classic colors to complement any mood or occasion. Opt for striking Red for a bold touch or classic Black for understated chic.",
          defaultImage: "./assets/images/socks_rainbow.jpg",
          selectedVariant: null,
          selectedSize: null,
          material: ['80% Cotton', '15% Polyester', '5% Spandex'],
          variants: [
            { id: 4234, color: 'Red', image: './assets/images/socks_red.jpg', quantity: 10 },
            { id: 4235, color: 'Black', image: './assets/images/socks_black.jpg', quantity: 8 },
          ],
          sizes: ['(s) small', '(m) medium', '(l) large'],
          price: 299,
          totalInventory: 0
        },
        {
          id: 1,
          brand: "Stripy Swag",
          name: "Striped Socks",
          description: 'Make a bold statement with our Striped Swag Striped Socks! These socks are like a party for your feet, available in two striking designs to jazz up any ensemble. Choose between sunny yellow/white stripes for a burst of energy or classic navy/red stripes for timeless elegance.',
          selectedVariant: null,
          selectedSize: null,
          material: ['50% Cotton', '30% Wool', '20% Polyester'],
          variants: [
            { id: 2234, color: 'Yellow', image: './assets/images/socks_yellow.jpg', quantity: 15 },
            { id: 1135, color: 'Navy', image: './assets/images/socks_striped.jpg', quantity: 6 },
          ],
          sizes: ['(s) small', '(m) medium', '(l) large'],
          price: 249,
          totalInventory: 0
        },
        {
          id: 2,
          brand: "Funky Prints",
          name: "Patterned Socks",
          description: "Step up your sock game with our Funky Prints Patterned Socks! These socks are a feast for the eyes, available in two eye-catching designs to add a pop of color to any outfit. Choose between Purple Checkered for a touch of sophistication or Navy Christmas for a festive twist.",
          selectedVariant: null,
          selectedSize: null,
          material: ['70% Cotton', '25% Nylon', '5% Spandex'],
          variants: [
            { id: 3335, color: 'Navy', image: './assets/images/socks_christmas.jpg', quantity: 4 },
            { id: 3234, color: 'Purple', image: './assets/images/socks_checkered.jpg', quantity: 8 },
          ],
          sizes: ['(s) small', '(m) medium', '(l) large'],
          price: 319,
          totalInventory: 0
        }
      ],
      orderQuantity: 1
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
    addToCart(product, orderQuantity) {
      // Confirm stock levels for selected product variant 
      if (!product.selectedVariant || product.selectedVariant.quantity <= 0 || orderQuantity > product.selectedVariant.quantity) return // Product not found, or no variant selected, or variant out of stock

      // Emit event to update cart
      this.$emit('add-to-cart', product, orderQuantity)

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