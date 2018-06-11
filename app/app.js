// Currently required for the app to work.
// Can be moved to webpack config once upgraded to 4.x
import "./vendor";
import "./styles.scss";
//import Frame from "tns-core-modules/ui/frame";

import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";
import router from "./shared/router";

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
Vue.config.debug = true;

//Vue.component("RadListView", import("./shared/RadListView"));

import cars from "./shared/cars/car-service";

new Vue({

    router,

    data: {
        cars: []
    },

    created() {
        this.$router.setPageTransition("slide");

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
