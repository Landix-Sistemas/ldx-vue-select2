<template>
  <div id="app">
    <Select2 selectId="selectURL" url="http://localhost:3000/select2" :allowFill="true" :multiple="true" v-model="selected1" :initialValues="initialValue"/>
    <p>data:> {{ selected1 }}</p>
    <Select2 selectId="selectOptions" :options="options" v-model="selected2"/>
    <p>data:> {{ selected2 }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch, Provide, Emit } from 'vue-property-decorator';
import Select2 from './components/Select2.vue';

@Component({
  components: {
    Select2,
  },
})
export default class App extends Vue {
  @Provide() public selected1: object[] = [];
  @Provide() public selected2: object[] = [];

  private initialValue: object[] = [{
    id: 'sample string 1',
    text: 'sample string 1',
  }];

  private options: IdTextPair[] = [
    {
      id: '1',
      text: 'teste options 1',
    },
    {
      id: '2',
      text: 'teste options 2',
    },
    {
      id: '3',
      text: 'teste options 3',
    },
  ];
}
</script>
