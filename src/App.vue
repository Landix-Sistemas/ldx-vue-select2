<template>
  <div id="app">
    <Select2 url="http://localhost:3000/select2" :allowFill="true" :multiple="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Select2 from './components/Select2.vue';

@Component({
  components: {
    Select2,
  },
})
export default class App extends Vue {}
</script>
