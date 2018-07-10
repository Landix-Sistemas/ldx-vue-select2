<template>
  <div id="app">
    <Select2 
      selectId="selectURL" 
      url="http://xxxxxxxx/" 
      :allowFill="true" 
      :multiple="true" 
      v-model="selected1" 
      :initialValues="initialValue"
      responseData="results"
      dataId="id"
      dataText="name"
    />
    <p>data:> {{ selected1 }}</p>
    <Select2 selectId="selectOptions" :options="options" v-model="selected2"/>
    <p>data:> {{ selected2 }}</p>
  </div>
</template>

<script>
import Select2 from './components/Select2.vue'

export default {
  name: 'app',
  components: {
    Select2
  },
  data () {
    return {
      selected1: [],
      selected2: [],
      initialValue: [{
        id: 'sample string 1',
        text: 'sample string 1'
      }],
      options: [
        {
          id: '1',
          text: 'teste options 1'
        },
        {
          id: '2',
          text: 'teste options 2'
        },
        {
          id: '3',
          text: 'teste options 3'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
</style>
