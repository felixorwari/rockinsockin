app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },

  template:
    /*html*/
    `
    <div class="pt-8 border-t">
      <h3>Product Reviews <span class="">({{ reviews.length }})</span></h3>

      <div class="flex flex-col divide-y">
        <div v-for="(review, index) in reviews" :key="index" class="py-4">
          <div class="flex items-center">
            <div class="rounded-full h-[50px] w-[50px] border border-gray-300 me-4"></div>

            <div class="flex flex-col">
              <p class="font-medium my-0">{{ review.user }}</p>
              <div class="flex items-center">
                <i v-for="rating in review.rating" class="fa-solid fa-star text-orange-500"></i>
                <i v-for="rating in (5 - review.rating)" class="fa-regular fa-star text-gray-300"></i>
                <span class="ml-4">{{ review.rating }}/5</span>
              </div>
            </div>
          </div>

          <p class="mb-2">{{ review.comment }}</p>

          <aside class="flex gap-4">
            <div class="px-4 py-2">
              <i class="fa-regular fa-thumbs-up mr-4"></i> Helpful
            </div>
            <div class="px-4 py-2">
              <i class="fa-regular fa-thumbs-down mr-4"></i> Unhelpful
            </div>
          </aside>
        </div>
      </div>
    </div>
  `
})