import Vue from 'vue'
import App from '../components/app'

import '@babel/polyfill';
import './polyfill-foreach';

new Vue({
    el: '#app',
    data: {
        test: 'Колян Полян',
        test2: 'Vasilii Joker'
    },
    components: {App}
});

console.log('Hello man');
