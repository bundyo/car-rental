// Currently required for the app to work.
// Can be moved to webpack config once upgraded to 4.x
import "./vendor";

import Vue from "nativescript-vue";
import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import cars from "./shared/cars/car-service";

import CarList from "./components/CarList";

import "./styles.scss";

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

    render: h => h(CarList),

    data: {
        cars: null
    },

    provide() {
        const store = {};

        Object.defineProperty(store, "cars", {
           enumerable: true,
           get: () => this.cars,
        });

        return { store };
    },

    created() {
        firebase.init(config).then(
            instance => {
                console.log("firebase.init done");

                cars.load().then((data) => {
                    this.cars = Object.values(data);
                })
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

}).$start();
