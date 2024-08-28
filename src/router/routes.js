
const routes = [
  {
    path: "/",
    component: () => import("layouts/WelcomePage.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/invoice",
        component: () => import("pages/InvoicePage.vue"),
        children: [
          {
            path: "/invoice",
            component: () => import("components/InvoiceTable.vue"),
          },
          {
            path: "/draft/:id",
            name: "draft",
            component: () => import("components/DraftPage.vue"),
          },
        ],
      },
      {
        path: "/product",
        component: () => import("pages/ProductPage.vue"),
        children: [
          {
            path: "/product",
            component: () => import("components/ProductTable.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
