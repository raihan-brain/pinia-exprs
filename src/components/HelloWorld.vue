<script setup lang="ts">
import EditBookRating from "@/components/EditBookRating.vue";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import ALL_BOOKS_QUERY from "../graphql/allBooks.graphql";
import type { BookType } from "@/components/types/bookType";
import AddBook from "@/components/AddBook.vue";

const searchTerm = ref("");

const { result, loading, error } = useQuery(
  ALL_BOOKS_QUERY,
  () => ({
    search: searchTerm.value,
  }),
  () => ({
    debounce: 500,
  })
);

const books = computed(() => result.value?.allBooks ?? []);

watch(result, () => {
  console.log("==== watched");
  console.log(result.value.allBooks);
});

watch(books, () => {
  console.log("=== books", books);
});

console.log("==== env " + import.meta.env.MODE);

const activeBook = ref<Partial<BookType | null>>();
const showNewBookForm = ref(false);

defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="flex flex-row">
    <div class="basis-1/4">01</div>
    <div class="basis-1/4">02</div>
    <div class="basis-1/2">03</div>
  </div>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
  <div>
    <div>
      <button v-if="!showNewBookForm" @click="showNewBookForm = true">
        Add a new book
      </button>

      <AddBook
        v-if="showNewBookForm"
        @close-form="showNewBookForm = false"
        :search-term="searchTerm"
      ></AddBook>
    </div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">loading search ....</p>
    <p v-else-if="error">Something went wrong! Please try again.</p>
    <template v-else>
      <p v-if="activeBook">
        <EditBookRating
          :initial-rating="activeBook?.rating"
          :book-id="activeBook?.id"
          @close-form="activeBook = null"
        ></EditBookRating>
      </p>
      <template v-else>
        <p v-for="book in books" :key="book.id">
          {{ book.title }} - {{ book.rating }}
          <button @click="activeBook = book">Edit Rating</button>
        </p>
      </template>
    </template>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
