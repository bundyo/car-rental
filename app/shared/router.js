import Vue from "nativescript-vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import CarList from "../components/CarList";
import CarDetails from "../components/CarDetails";

const router = new VueRouter({
    routes: [
        {
            path: "/car-list",
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
        {path: "*", redirect: "/car-list"},
    ],
});

router.push("/car-list");

export default router;
