import Vue from "nativescript-vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import CarList from "../components/CarList";
import CarDetails from "../components/CarDetails";

const router = new VueRouter({
    //pageRouting: true,
    mode: "abstract",
    routes: [
        {
            name: "car-list",
            path: "/car-list",
            component: CarList,
            meta: {
                title: "Car List",
            },
        },
        {
            name: "car-details",
            path: "/car-details/:car",
            component: CarDetails,
            props: (route) => {
                console.log(route.query, route.params);

            },
            meta: {
                title: "Car Details",
            },
        },
        {path: "*", redirect: "/car-list"},
    ],
});

//router.setPageTransition("slide")

router.replace("car-list");

export default router;
