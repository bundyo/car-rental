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
<Frame>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton v-show="routeName !== 'root'" @tap="$router.back()" android.systemIcon="ic_menu_back" 
                :visibility="routeName === 'car-details-edit' ? 'collapse' : 'visible'" />
            <Label class="action-bar-title" :text="$route.meta.title" horizontalAlignment="center" />
            <ActionItem v-show="routeName === 'car-details'" @tap="onEditButtonTap" ios.position="right" android.position="right">
                <Label text="Edit" verticalAlignment="center" class="action-item" />
            </ActionItem>
           <ActionItem v-show="routeName === 'car-details-edit'" @tap="$router.back()" ios.position="left" android.position="left">
               <Label text="Cancel" verticalAlignment="center" class="action-item" />
           </ActionItem>
           <ActionItem v-show="routeName === 'car-details-edit'" ios.position="right" android.position="right">
               <Label text="Done" class="action-item" verticalAlignment="center" @tap="onDoneButtonTap"
                   :isEnabled="car.isModelValid"
                   :isUserInteractionEnabled="car.isModelValid" />
           </ActionItem>
        </ActionBar>
    
        <Frame transition="slide">
            <router-view actionBarHidden="true"/>
        </Frame>
    </Page>
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
    },

    methods: {
        onCancelButtonTap() {

        },

        onDoneButtonTap() {

        },

        onEditButtonTap() {
            this.$router.push(`/car-details-edit/${this.car.name}`, {
                animated: true,
                transition: {
                    name: "slideUp",
                    duration: 200,
                    curve: "ease"
                }
            });
        }
    }

}).$start();
