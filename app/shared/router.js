import Vue from "nativescript-vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import CarList from "../components/CarList";
import CarDetails from "../components/CarDetails";

const router = new VueRouter({
    mode: "abstract",
    routes: [
        {
            path: "/",
            component: CarList,
            meta: {
                title: "Car List",
            },
        },
        {
            path: "/car-details/:id",
            component: CarDetails,
            meta: {
                title: "Car Details",
            },
        },
        {path: "*", redirect: "/"},
    ],
});

router.push("/");

export default router;
