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

//Vue.component("RadListView", import("./shared/RadListView"));

import cars from "./shared/cars/car-service";

new Vue({

    router,

    template: `
<Page class="page" xmlns="http://schemas.nativescript.org/tns.xsd">
    <ActionBar class="action-bar">
        <NavigationButton @tap="$router.back()" android.systemIcon="ic_menu_back" />
        <Label class="action-bar-title" text="Browse" horizontalAlignment="center" />
        <ActionItem tap="onEditButtonTap" ios.position="right" android.position="right">
            <Label text="Edit" verticalAlignment="center" class="action-item" />
        </ActionItem>
    </ActionBar>

    <Frame>
         <router-view />
    </Frame>
</Page>`,

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
    }

}).$start();
