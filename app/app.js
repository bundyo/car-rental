import "./vendor";

import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';


import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

    render: h => h(HelloWorld)


}).$start();
