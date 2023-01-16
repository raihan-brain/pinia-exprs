<script setup lang="ts">
import { reactive } from "vue";
import type { BookType, NewBookType } from "@/components/types/bookType";
import { useMutation } from "@vue/apollo-composable";
import ADD_BOOK_MUTATION from "../graphql/addBookMutation.graphql";
import ALL_BOOKS_QUERY from "../graphql/allBooks.graphql";

const prop = defineProps<{
  searchTerm?: string;
}>();

const emit = defineEmits<{ (e: "closeForm"): void }>();
const newBook = reactive<NewBookType>({
  title: "",
  description: "",
  year: "",
  rating: 0,
  author: "",
});

const { mutate, onDone } = useMutation(ADD_BOOK_MUTATION, () => ({
  variables: { input: { ...newBook, rating: newBook.rating || undefined } },
  update(cache, response) {
    type cacheBookQuery = {
      allBooks: BookType[];
    };
    const sourceData: cacheBookQuery | null = cache.readQuery({
      query: ALL_BOOKS_QUERY,
      variables: { search: prop.searchTerm },
    });

    console.log("===== source data");
    console.log(sourceData);

    console.log("===== result data");
    console.log(response);

    if (sourceData) {
      const data = {
        allBooks: [...sourceData.allBooks, response.data.addBook],
      };
      cache.writeQuery({
        data,
        query: ALL_BOOKS_QUERY,
        variables: { search: prop.searchTerm },
      });
    }
  },
}));
const addBook = () => {
  console.log(newBook);
  mutate();
  emit("closeForm");
};

onDone(() => emit("closeForm"));
</script>

<template>
  <!-- Submit event -->
  <form @submit.prevent="addBook">
    <label for="title">
      Title
      <input type="text" id="title" required v-model.trim="newBook.title" />
    </label>
    <label for="author">
      Author
      <input type="text" id="author" required v-model.trim="newBook.author" />
    </label>
    <label for="description">
      Description (optional)
      <input type="text" id="description" v-model.trim="newBook.description" />
    </label>
    <label for="year">
      Year
      <input type="number" id="year" required v-model.number="newBook.year" />
    </label>
    <label for="rating">
      Rating (optional)
      <input type="number" id="rating" v-model.number="newBook.rating" />
    </label>
    <button type="submit">Submit</button>
    <button type="reset" @click="$emit('closeForm')">Close form</button>
  </form>
</template>

<style scoped>
label {
  display: block;
}
</style>
