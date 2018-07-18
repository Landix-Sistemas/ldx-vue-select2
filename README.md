# ldx-vue-select2
The Select2 (http://select2.org) component for VueJs.

## Install
### npm
``` bash
npm install --save ldx-vue-select2
```

## Basic Usage
``` bash
<template>
  <div>
    <Select2 
      selectId="selectOptions" 
      :initialValues="initialValue" 
      :options="options" 
      v-model="selectData"
    />
  </div>
</template>

<script>
import Select2 from 'ldx-vue-select2'

export default {
  name: 'SVN',
  components: {
    Select2
  },
  data () {
    return {
      selectData: undefined,
      initialValue: [
        {
          id: '1',
          text: 'teste options 1'
        }
      ]
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
```

## Ajax Options

### API

``` bash
API request parameters example: 

{
  name: '',
  offset: 0,
  limit: 10,
}

API response example:

{
  "count":5,
  "next":null,
  "previous":null,
  "results":[
    {
      "id":1,
      "name":"Teste 1",
      "created_date":"2018-07-18T10:33:46-03:00"
    },
    {
      "id":2,
      "name":"Teste 2",
      "created_date":"2018-07-18T10:33:46-03:00"
    },
    {
      "id":3,
      "name":"Teste 3",
      "created_date":"2018-07-18T10:33:46-03:00"
    },
    {
      "id":4,
      "name":"Teste 4",
      "created_date":"2018-07-18T10:33:46-03:00"
    },
    {
      "id":5,
      "name":"Teste 5",
      "created_date":"2018-07-18T10:33:46-03:00"
    }
  ]
}

```

### Vue file

``` bash
<template>
  <div>
    <select2
      selectId="selectAjax"
      v-model="selectData"
      :url="http://localhost/getOptions"
      responseData="results"
      dataId="id"
      dataText="description"
      dataLimit="limit"
      dataOffset="offset"
      dataTerm="description"
      placeholder="Selecione uma opção ..."
      dataTotal="count"
      ref="selectAjax"
      @onSelect="onItemSelected"
      :itemsToExclude="[1, 2]"
    />
  </div>
</template>

<script>
import Select2 from 'ldx-vue-select2'

export default {
  name: 'SVN',
  components: {
    Select2
  },
  data () {
    return {
      selectData: undefined
    }
  },
  methods: {
    onItemSelected (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="stylus">
</style>
```

## Properties

``` bash
    /**
     * Unique identifier for the select2 component
     * @default 'select2ID'
     * @type {string}
     */
    selectId: {
      type: String,
      default: 'select2ID'
    },
    /**
     * Label for select all items on select2
     * @default 'todos'
     * @type {string}
     */
    selectAllLabel: {
      type: String,
      default: 'todos'
    },
    /**
     * Label for select clean all selected items on select2
     * @default 'limpar'
     * @type {string}
     */
    cleanSelectedLabel: {
      type: String,
      default: 'limpar'
    },
    /**
    * Property to enable select all items
    * @default 'false'
    * @type {boolean}
    */
    allowFill: {
      type: Boolean,
      default: false
    },
    /**
    * Property to enable clean all selected items
    * @default 'false'
    * @type {boolean}
    */
    allowClear: {
      type: Boolean,
      default: false
    },
    /**
    * The size of the select componet
    * @default '100%'
    * @type {string}
    */
    width: {
      type: String,
      default: '100%'
    },
    /**
    * The placeholder label
    * @default 'selecione uma opção ...'
    * @type {string}
    */
    placeholder: {
      type: String,
      default: 'selecione uma opção ...'
    },
    /**
    * Property to enable close the options on select a item
    * @default 'true'
    * @type {boolean}
    */
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    /**
    * Property to enable select multiples items
    * @default 'false'
    * @type {boolean}
    */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
    * The restfull API to GET the items
    * @type {string}
    */
    url: {
      type: String
    },
    /**
    * The number of the items load per time
    * @default '10'
    * @type {number}
    */
    limitPerPage: {
      type: Number,
      default: 10
    },
    /**
    * Label for error loading options
    * @default 'não foi possível carregar os itens'
    * @type {string}
    */
    errorLoading: {
      type: String,
      default: 'não foi possível carregar os itens'
    },
    /**
    * Label for input too long, use {overChars} to display the number of over characters
    * @default 'apague {overChars} caracteres.'
    * @type {string}
    */
    inputTooLong: {
      type: String,
      default: 'apague {overChars} caracteres.'
    },
    /**
    * Label for input too short, use {remainingChars} to display the number of remaining characters
    * @default 'digite {remainingChars} ou mais caracteres.'
    * @type {string}
    */
    inputTooShort: {
      type: String,
      default: 'digite {remainingChars} ou mais caracteres.'
    },
    /**
    * Label for loading more items
    * @default 'carregando mais resultados …'
    * @type {string}
    */
    loadingMore: {
      type: String,
      default: 'carregando mais resultados …'
    },
    /**
    * Label for maximum selected items, use {maximum} to display the number of maximum characters
    * @default 'você só pode selecionar {maximum} item(s)'
    * @type {string}
    */
    maximumSelected: {
      type: String,
      default: 'você só pode selecionar {maximum} item(s)'
    },
    /**
    * Label for no items found by the term searched
    * @default 'nenhum resultado encontrado.'
    * @type {string}
    */
    noResults: {
      type: String,
      default: 'nenhum resultado encontrado.'
    },
    /**
    * Label for searching items by the term
    * @default 'buscando …'
    * @type {string}
    */
    searching: {
      type: String,
      default: 'buscando …'
    },
    /**
    * Property to disable the select
    * @default 'false'
    * @type {boolean}
    */
    disable: {
      type: Boolean,
      default: false
    },
    /**
    * Property to disable the select
    * @type {object}
    */
    queryParameters: {
      type: Object
    },
    /**
      * The initialized selected options
      * @type {Array}
      */
    initialValues: {
      type: Array
    },
    /**
     * The options
     * @type {Array}
     */
    options: {
      type: Array
    },
    /**
     * Where to find the data in the response
     * @type {String}
     */
    responseData: {
      type: String
    },
    /**
     * Where to find the data id in the response
     * @type {String}
     */
    dataId: {
      type: String,
      default: 'id'
    },
    /**
     * Where to find the data text in the response
     * @type {String}
     */
    dataText: {
      type: String,
      default: 'value'
    },
    /**
     * Enable Ajax request with credentials
     * @type {String}
     */
    withCredentials: {
      type: Boolean
    },
    /**
     * Number of results to return per page
     * @type {String}
     */
    dataLimit: {
      type: String,
      default: 'LimitPerPage'
    },
    /**
     * The initial index from which to return the results
     * @type {String}
     */
    dataOffset: {
      type: String,
      default: 'Page'
    },
    /**
     * The propertie of the search term
     * @type {String}
     */
    dataTerm: {
      type: String,
      default: 'Term'
    },
    /**
     * The propertie of the total of items
     * @type {String}
     */
    dataTotal: {
      type: String,
      defaut: 'total'
    },
    /**
     * List of items to not display
     * @type {Array}
     */
    itemsToExclude: {
      type: Array
    }
  
```

## Methods

``` bash
 /**
  * Unselect all items
  */
  cleanAll ()

 /**
  * Set selected items
  * @param {array} newValue List of options to add to the select2
  */
  setItems (newValue)

 /**
  * Update url parameters to send to API
  * Use this method to make cascading select2
  * @param {object}
  */
  updateQueryParameters (value)
```

## License & Copyright

The materials herein are all (c) 2017-2020 <a href="http://www.landix.com.br"> Landix Sistemas. </a>

<a rel="license" href="https://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://licensebuttons.net/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0 International (CC BY 4.0)</a>.
