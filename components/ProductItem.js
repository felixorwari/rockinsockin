app.component('product-item', {
  emits: ['add-to-cart'],
  props: {
    product: {
      type: Object,
      required: true
    },
    stockThreshold: {
      type: Number,
      required: true
    }
  },
  template:
    /*html*/
    `
    <!-- Product Card -->
    <article class="flex flex-col product-container md:flex-row gap-8">
      <!-- Product Image -->
      <figure
        class="w-full self-start overflow-hidden bg-white border-2 border-gray-100 rounded product-image md:w-1/2"
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
      <div
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
          <p class="font-bold text-3xl">Ksh. {{ product.price.toLocaleString() }}/-</p>
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

        <review-form :product class="mt-12" @add-review="addReview"></review-form>
      </div>
    </article>
    `
  ,

  data() {
    return {
      orderQuantity: 1
    }
  },

  /** @TODO Refactor these to remove unnecessary 'product' parameter */
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
    },

    addReview(review) {
      console.log('Adding review...')
      this.product.reviews.push(review)
      console.log('Review successfully added!')
    }
  },

  beforeMount() {
    // Calculate the total invetory
    this.product.totalInventory = this.product.variants.reduce((total, variant) => total + variant.quantity, 0)

    // Set a default variant
    const variant = this.product.variants.find(variant => variant.quantity > 0);

    if (variant) {
      this.product.selectedVariant = variant
    }
  }
});