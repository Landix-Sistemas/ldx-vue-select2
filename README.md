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
    <Select2 v-model="selectData"/>
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
export default class App extends Vue {
  @Provide() public selectData: object[] = [];
}
</script>

<style lang="stylus">
@import '../../node_modules/ldx-vue-select2/src/themes/app.variables.styl'
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
    }
  
```

## Stylus Variables

``` bash
/* Select All and Unselect All butons style */
$select2ButtonsBorder = 1px solid #AAA // Border
$select2ButtonsBorderRadius = 2px // Border radius
$select2ButtonsColor = #FFFFFF // Text color
$select2ButtonsBackground = #A8061E // Background color
$select2ButtonsMargin = 3px // Margin 
$select2ButtonsPadding = 5px // Padding
$select2ButtonsFontSize = 15px // Font Size
$select2ButtonsFontWeight = normal // Font Weight

/* Select Element */
$select2ElementBoder = 1px solid #A8061E // Border
$select2ElementBorderRadius = 2px // Border radius
$select2ElementBackgroundColor = #FFFFFF // Background color
$select2ElementFontSize = 15px // Font Size
$select2ElementFontWeight = normal // Font Weight

/* Selected item on multiple selection */
$select2TagBackgroundColor = #b5b5b5 // Background color
$select2TagColor = #FFFFFF // Text color
$select2TagFontSize = 15px // Font Size
$select2TagFontWeight = normal // Font Weight
$select2TagBorderRadius = 2px // Border radius
$select2TagBorder = 1px solid #A8061E // Border

/* The X on Selected item on multiple selection */
$select2TagUnselectColor = #A8061E
$select2TagUnselecFontSize = 20px // Font Size
$select2TagUnselecFontWeight = bolder // Font Weight

/* Select Dropdown */
$select2DropdownBorderRadius = 2px // Border radius
$select2DropdownBorder = 2px solid #A8061E // Border
$select2DropdownBackgroundColor = #f0f0f0 // Background color

/* Select Dropdown Options */
$select2DropdownOptionsColor = #b5b5b5 // Text color
$select2DropdownOptionsFontSize = 15px // Font size

/* Select Dropdown Options Selected */
$select2DropdownOptionsSelectedBackgroundColor = #A8061E // Background color
$select2DropdownOptionsSelectedColor = #FFFFFF // Text color

/* Select Dropdown Options Highlighted */
$select2DropdownOptionsHighlightedBackgroundColor = #b5b5b5 // Background color
$select2DropdownOptionsHighlightedColor = #FFFFFF // Text color

```

## License & Copyright

The materials herein are all (c) 2017-2020 <a href="http://www.landix.com.br"> Landix Sistemas. </a>

<a rel="license" href="https://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://licensebuttons.net/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0 International (CC BY 4.0)</a>.
