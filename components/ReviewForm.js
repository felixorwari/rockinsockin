app.component('review-form', {
  emits: ['add-review'],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  template:
    /*html*/
    `
    <form action="#" class="flex flex-col w-full mx-auto prose gap-y-4" @submit.prevent="saveReview">
      <h3>Leave a review</h3>

      <div class="">
        <label for="name" class="block mb-2 text-sm">Your name:</label>
        <input
          type="text"
          id="name"
          v-model="user"
          class="block p-2.5 w-full text-sm border border-gray-300 rounded"
          placeholder="Full name"
          required
        />
      </div>

      <div class="">
        <label for="comment" class="block mb-2 text-sm">Review:</label>
        <textarea
          id="comment"
          v-model="comment"
          rows="4"
          class="block p-2.5 w-full text-sm border border-gray-300 rounded"
          placeholder="Write a review here"
          required
        ></textarea>
      </div>

      <div class="">
        <label for="rating" class="block mb-2 text-sm">Rating</label>
        <select
          name="rating"
          id="rating"
          v-model="rating"
          class="block p-2.5 w-full text-sm border border-gray-300 rounded"
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-fit grow-0 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition rounded bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-700 hover:shadow-lg hover:disabled:shadow-none disabled:opacity-25 disabled:cursor-not-allowed"
      >
        Submit Review
      </button>
    </form>
    `
  ,

  data() {
    return {
      user: null,
      comment: null,
      rating: null,
    }
  },

  methods: {
    saveReview() {
      let review = {
        user: this.user,
        comment: this.comment,
        rating: this.rating
      }

      this.$emit('add-review', review)

      // Reset form input
      this.user = null
      this.comment = null
      this.rating = null
    }
  }
})