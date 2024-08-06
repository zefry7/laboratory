import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css"
import Layout from "./Layout/Layout.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <Layout />
    </Provider>
)
