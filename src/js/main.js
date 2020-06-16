import Vue from 'vue';
import App from '@/components/app';

new Vue({
  el: '#app',
  data: {
    name: 'Man',
  },
  components: {
    App,
  },
  mounted() {
    console.log(`Hello ${this.name}`);

    $(document).ready(function () {
      console.log('hello'); // FIXME: Delete before push
    });

    fetch().then()
      .then();
  },
});
