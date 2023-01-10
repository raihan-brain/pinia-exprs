import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "https://graphqlzero.almansi.me/api",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp(App);
app.provide(DefaultApolloClient, apolloClient);
app.use(createPinia());
app.use(router);

app.mount("#app");
