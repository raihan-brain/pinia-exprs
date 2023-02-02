import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./style/app.css";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createAuth0 } from "@auth0/auth0-vue";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

// const app = createApp(App);
// app.provide(DefaultApolloClient, apolloClient);
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(createPinia());
app.use(router);
app.use(
  createAuth0({
    domain: "ferdia.eu.auth0.com",
    clientId: "7KY8WMfAWpHLDp85HIpY0LroDaOa1XLe",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

app.mount("#app");
