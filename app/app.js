// Currently required for the app to work.
// Can be moved to webpack config once upgraded to 4.x
import "./vendor";
import "./styles.scss";
//import Frame from "tns-core-modules/ui/frame";

import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";
import router from "./shared/router";

// router.history.listen((route) => {
//
// });

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
Vue.config.debug = true;

//Vue.component("RadListView", import("./shared/RadListView"));

Vue.registerElement(
  'Frame',
  () => require("tns-core-modules/ui/frame").Frame
);

import cars from "./shared/cars/car-service";

new Vue({

    template: `
<Frame>
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
</Frame>`,

    router,

    data: {
        cars: [],
        transitionName: "slide-right"
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
