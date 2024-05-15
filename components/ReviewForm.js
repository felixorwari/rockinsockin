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
        <label for="name" class="block mb-2 text-sm font-medium">Username:</label>
        <input
          type="text"
          id="name"
          v-model="user"
          class="block p-2.5 w-full text-sm border border-gray-300 rounded placeholder:text-gray-400"
          placeholder="Username/email address"
          autofill="username"
          required
        />
      </div>

      <div class="">
        <label for="rating" class="block mb-2 text-sm font-medium">Rating</label>
        <select
          name="rating"
          id="rating"
          v-model="rating"
          class="block p-2.5 w-full text-sm border border-gray-300 rounded placeholder:text-gray-400"
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      <div class="">
        <label for="comment" class="block mb-2 text-sm font-medium">Review:</label>
        <textarea
          id="comment"
          v-model="comment"
          rows="4"
          :maxlength
          class="block p-2.5 w-full text-sm border border-gray-300 rounded placeholder:text-gray-400"
          placeholder="Write a review here"
          required
        ></textarea>
        <p class="text-sm text-gray-400 text-right" :comment>
          <span v-if="comment">{{ comment.length }}</span>
          <span v-else>0</span>
          /{{ maxlength }} characters</p>
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
      maxlength: 160
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