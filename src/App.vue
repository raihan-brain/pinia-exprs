<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <body class="bg-white dar:bg-grey-900">
    <aside class="test"></aside>
    <main class="w-[calc(100%-3.72rem)] ml-auto">
      <div class="2xl:container mx-auto space-y-6">
        <div
          class="h-16 border-b border-gray-300/40 dark:border-gray-700"
        ></div>
        <div class="px-6 lg:px-12">
          <div
            class="h-96 flex justify-center items-center rounded-2xl border border-dashed border-gray-300/40 dark:border-gray-700"
          >
            <!--            <span class="text-gray-500 dark:text-gray-200"> Content </span>-->
            <RouterView />
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
