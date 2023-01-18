<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <body class="bg-white dar:bg-grey-900">
    <aside
      class="fixed left-0 top-0 z-10 h-screen w-[calc(3.73rem)] border-r border-gray-300/40 bg-white dark:bg-gray-900 dark:border-gray-700 hover:w-56 hover:shadow-2xl"
    ></aside>
    <main class="w-[calc(100%-3.72rem)] ml-auto">
      <div class="2xl:container mx-auto space-y-6">
        <div
          class="h-16 border-b border-gray-300/40 dark:border-gray-700"
        ></div>
        <div
          class="h-96 flex justify-center items-center rounded-2xl border border-dashed border-gray-300/40 dark:border-gray-700"
        >
          <span class="text-gray-500 dark:text-gray-200">Content</span>
        </div>
      </div>
      <RouterView />
    </main>
  </body>
</template>
