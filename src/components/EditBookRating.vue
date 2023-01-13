<script setup lang="ts">
import { ref } from "vue";
import UPDATE_BOOK_MUTATION from "../graphql/updateBook.mutation.gql";
import { useMutation } from "@vue/apollo-composable";
import type { PropType } from "vue";
const props = defineProps({
  initialRating: {
    type: Object as PropType<number | undefined>,
    required: true,
  },
  bookId: {
    type: Object as PropType<string | undefined>,
    required: true,
  },
});

// const props = defineProps<{
//   initialRating: number;
//   bookId: string;
// }>();

const emit = defineEmits<{ (e: "closeForm"): void }>();

const rating = ref(props.initialRating);

const { mutate, onDone, loading, error } = useMutation(
  UPDATE_BOOK_MUTATION,
  () => ({
    variables: {
      id: props.bookId,
      rating: parseFloat(rating.value as unknown as string),
    },
  })
);

const updateRating = () => {
  mutate();
  console.log(rating.value);
  // parseFloat(rating.value);
  emit("closeForm");
};
onDone(() => {
  emit("closeForm");
});
</script>

<template>
  <input
    type="text"
    v-model="rating"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />
  <p v-if="loading">Updating...</p>
  <p v-if="error">{{ error }}</p>
</template>
