// Currently required for the app to work.
// Can be moved to webpack config once upgraded to 4.x
import "./vendor";
import "./styles.scss";

import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";
import router from "./shared/router";

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
Vue.config.debug = true;

//import "./shared/RadListView";

import cars from "./shared/cars/car-service";

//import { android, AndroidApplication } from 'tns-core-modules/application'
//
//android.on(AndroidApplication.activityBackPressedEvent, function (args) {
// args.cancel = true;
//
// router.back();
//});
//
new Vue({

    router,

    // TODO: Look why v-if doesn't work in the ActionBar
    template: `
<Frame transition="slide">
    <router-view />
</Frame>`,

    data: {
        cars: []
    },

    created() {
        //this.$router.setPageTransition("slide");

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
    },

    computed: {
        routeName() {
            return (this.$route && this.$route.name) || "";
        },

        car() {
            return this.$route.params.id ? this.cars.find( car => car.name === this.$route.params.id ) : {};
        }
    }

}).$start();
