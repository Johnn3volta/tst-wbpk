import '../styles/style.scss'

import Vue from 'vue'
import App from '../components/app'


new Vue({
  el: '#app',
  data: {
    test: 'Колян Полян',
    test2: 'Vasilii Joker'
  },
  components: {App}
});

console.log('Hello man');
