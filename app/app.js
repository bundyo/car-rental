// Currently required for the app to work.
// Can be moved to webpack config once upgraded to 4.x
import "./vendor";

import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';

import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

    render: h => h(HelloWorld)

}).$start();
