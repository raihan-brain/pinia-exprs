<script setup lang="ts">
import EditBookRating from "@/components/EditBookRating.vue";
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted, ref, watch } from "vue";
import ALL_BOOKS_QUERY from "../graphql/allBooks.graphql";
import type { BookType } from "@/components/types/bookType";
import AddBook from "@/components/AddBook.vue";
import { useAuth0 } from "@auth0/auth0-vue";

import WelcomeItem from "@/components/WelcomeItem.vue";
const { loginWithRedirect, user, isAuthenticated } = useAuth0();

onMounted(async () => {
  if (localStorage.getItem("isLoggedIn") === "1") {
    return;
  }
  await loginWithRedirect();
  localStorage.setItem("isLoggedIn", "1");
});

const computedUser = computed(() => user.value);

watch(computedUser, (newValue) => {
  console.log("computed user ");
  console.log(newValue);
});

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
const login = () => {
  loginWithRedirect();
};

defineProps<{
  msg: string;
}>();
</script>

<template>
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
  <div>
    <WelcomeItem>
      <button @click="login">Login</button>
      <h2>working on displaying user details</h2>
      <p>User: {{ user }}</p>
      <p>Authenticated: {{ isAuthenticated }}</p>
    </WelcomeItem>
  </div>
</template>
