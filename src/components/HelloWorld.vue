<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";
import ALL_BOOKS_QUERY from "../graphql/allBooks.query.gql";
const searchTerm = ref("");

const { result, loading } = useQuery(ALL_BOOKS_QUERY, () => ({
  search: searchTerm.value,
}));

watch(result, () => {
  console.log("==== watched");
  console.log(result.value.allBooks);
});

defineProps<{
  msg: string;
}>();
console.log("========== working on it!!!!!!!");
</script>

<template>
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
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">loading search ....</p>
    <template v-else>
      <p v-for="book in result?.allBooks" :key="book.id">
        {{ book.title }}
      </p>
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
