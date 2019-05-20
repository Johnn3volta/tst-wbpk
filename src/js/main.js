import Vue from 'vue'
import App from '../components/app'

require('@babel/polyfill');
require('./polyfill-foreach');

new Vue({
  el: '#app',
  data: {
    test: 'Колян Полян',
    test2: 'Vasilii Joker'
  },
  components: {App}
});

console.log('Hello man');
