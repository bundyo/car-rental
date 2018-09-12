import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";
import router from "./shared/router";

import "./styles.scss";

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = true;
Vue.config.debug = true;

import "./shared/RadListView";

import cars from "./shared/cars/car-service";

new Vue({

    router,

    template: `
        <Frame>
            <router-view @select="car = $event"/>
        </Frame>`,

    data: {
        car: [],
        cars: []
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
