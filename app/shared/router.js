import { Vue, Router, History } from "nativescript-vue";

Vue.use(Router);

import CarList from "../components/CarList";
import CarDetails from "../components/CarDetails";
import CarDetailsEdit from "../components/CarDetailsEdit";

const router = new Router({
    mode: { History },
    routes: [
        {
            name: "root",
            path: "/",
            component: CarList,
            meta: {
                title: "Car List",
            },
        },
        {
            name: "car-details",
            path: "/car-details",
            component: CarDetails,
            meta: {
                title: "Car Details",
            },
        },
        {
            name: "car-details-edit",
            path: "/car-details-edit/:id",
            component: CarDetailsEdit,
            meta: {
                title: "Car Details Edit",
            },
        },
        {path: "*", redirect: "/"},
    ],
});

router.push("/");

export default router;
