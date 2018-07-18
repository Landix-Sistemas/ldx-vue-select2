<template>
  <div class="select2Father">
    <select :ref="selectId" :id="selectId" class="select2-data-ajax"></select>
    <div class="select2Buttons">
      <div v-if="multiple && allowFill" @click="fillAll">{{ selectAllLabel }}</div>
      <div v-if="multiple && allowFill && !allowClear" @click="cleanAll">{{ cleanSelectedLabel }}</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'select2'
import 'select2/dist/css/select2.css'
import axios from 'axios'

export default {
  props: {
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
  },
  data () {
    return {
      /**
       * Modifier query parameters
       * @type {object}
       */
      mutableQueryParameters: this.queryParameters,
      /**
       * Setting the AJAX Options
       * @type {AjaxOptions}
       */
      ajax: {
        url: this.customizeUrl(false),
        dataType: 'json',
        type: 'GET',
        delay: 500,
        cache: true,
        xhrFields: {
          withCredentials: this.withCredentials || false
        },
        data: (params) => {
          let dataReturn = {}
          dataReturn[this.dataTerm] = params.term || ''
          dataReturn[this.dataOffset] = (params.page - 1 || 0) * (this.limitPerPage || 10)
          dataReturn[this.dataLimit] = this.limitPerPage || 10

          return dataReturn
        },
        beforeSend () {
          // Loading.show()
        },
        error (error) {
          if (error.statusText !== 'abort') {
            // Toast.create.negative(vue.$i18n.t('message.errorFetchingDataFromServer').capitalize())
            // Loading.hide()
          }
        },
        processResults: (data, params) => {
          params.page = params.page || 1

          // Hide the loading
          // Loading.hide()

          let options = []

          if (this.responseData && this.dataId && this.dataText) {
            data['results'].forEach((item) =>{
              if (!this.itemsToExclude || (this.itemsToExclude && !this.itemsToExclude.includes(item[this.dataId].toString()))) {
                options.push({
                  id: item[this.dataId],
                  text: item[this.dataText]
                })
              }
            })
          }

          return {
            results: options || data.items || [],
            pagination: {
              more: (params.page * (this.limitPerPage || 10)) < data[this.dataTotal]
            }
          }
        }
      }
    }
  },
  mounted () {
    this.customMessages()
    this.setSelect2()
    this.setEvents()
  },
  updated () {
    this.setSelect2()
  },
  methods: {
    updateQueryParameters (value) {
      this.mutableQueryParameters = value
      this.setSelect2()
    },
    /**
     * Set the select2 to the given element identification.
     */
    setSelect2 () {
      this.customizeUrl(false)

      // Set the select2 to the given identifier object
      $(`#${this.selectId}`).select2({
        placeholder: this.placeholder,
        data: this.options,
        closeOnSelect: this.closeOnSelect,
        allowClear: this.allowClear,
        multiple: this.multiple,
        escapeMarkup (markup) { return markup }, // let our custom formatter work
        minimumInputLength: 0,
        width: this.width,
        language: 'custom',
        ajax: !this.url ? undefined : this.ajax
      })

      // Enable or disable the select2 element
      if (this.disable) {
        $(`#${this.selectId}`).prop('disabled', true)
      }

      if (this.initialValues) {
        this.setItems(this.initialValues)
      }

      if (this.options) {
        this.$emit('input', $(`#${this.selectId}`).select2('data'))
      }
    },

    /**
    * Custom internationalization messages.
    */
    customMessages () {
      // Set the labels of the select2 component
      $.fn.select2.amd.define('select2/i18n/custom', [], () => {
        return {
          // Error Loading
          errorLoading: () => this.errorLoading,

          // Input too Long
          inputTooLong: (args) => {
            const overChars = args.input.length - args.maximum
            let message = this.inputTooLong.replace('{overChars}', overChars.toString())
            if (overChars !== 1) {
              message += 's'
            }

            return message
          },

          // Input too Short
          inputTooShort: (args) =>
            this.inputTooShort.replace('{remainingChars}', (args.minimum - args.input.length).toString()),

          // Loading More
          loadingMore: () => this.loadingMore,

          // Maximum Selected
          maximumSelected: (args) => {
            let message = this.maximumSelected.replace('{maximum}', args.maximum)
            if (args.maximum !== 1) {
              message += 's'
            }
            return message
          },

          // No Results
          noResults: () => this.noResults,

          // Searching
          searching: () => this.searching
        }
      })
    },

    /**
    * Emit events to the father component.
    */
    setEvents () {
      // On select a item
      $(`#${this.selectId}`).on('select2:select', (evt) => {
        // Emit the selected ids
        this.$emit('onSelect', $(`#${this.selectId}`).val())

        // Update the model
        this.$emit('input', $(`#${this.selectId}`).select2('data'))

        // Emit the full object selected
        if (evt.params) {
          this.$emit('onSelectItem', (evt).params.data)
        }
      })

      $('#' + this.selectId).on('select2:unselect', (evt) => {
        const value = this.multiple ? $(`#${this.selectId}`).val() : []

        // Emit the selected ids
        this.$emit('onSelect', value)

        // Update the model
        this.$emit('input', $(`#${this.selectId}`).select2('data'))

        // Emit the full object unselected
        if (evt.params) {
          this.$emit('onUnselect', evt.params.data.id)
        }
      })

      // Remove the select2 options dropdown on page change or refresh
      window.onpopstate = () => $('.select2-dropdown').remove()
      window.onhashchange = () => $('.select2-dropdown').remove()
    },

    /**
    * Select all items
    */
    fillAll () {
      if (!this.url) {
        $(`#${this.selectId}`).find('option')
          .prop('selected', true)
          .trigger('select2:select')
          .trigger('change')
      } else {
        $(`#${this.selectId}`).val('').trigger('change') // clean selected items
        $(`#${this.selectId}`).html('') // delete all the options

        const data = []

        // Call api
        axios.get(this.customizeUrl(true)).then((response) => {
          for (const item of response.data.items) {
            $(`#${this.selectId}`).append({
              text: item.text,
              value: item.id,
              defaultSelected: true,
              selected: true
            })
            data.push(item.id)
          }
          $(`#${this.selectId}`).val(data)
            .trigger('select2:select')
            .trigger('change')
        })
      }

      this.$emit('input', $(`#${this.selectId}`).select2('data'))
    },

    /**
    * Unselect all items
    */
    cleanAll () {
      $(`#${this.selectId}`).val('')
        .trigger('select2:select')
        .trigger('change')

      this.$emit('input', $(`#${this.selectId}`).select2('data'))
    },

    /**
    * Customize URL with the query parameters
    */
    customizeUrl (fillAll) {
      const queryParam = {
        Page: 1,
        LimitPerPage: -1
      }
      let customUrl = this.url
      let urlParameters = ''

      if(this.mutableQueryParameters === null || this.mutableQueryParameters === undefined) {
        this.mutableQueryParameters = this.queryParameters
      }

      if (this.mutableQueryParameters !== undefined && this.mutableQueryParameters !== null) {
        urlParameters = $.param(this.mutableQueryParameters)
        if (fillAll) {
          urlParameters += '&' + $.param(queryParam)
          customUrl = this.url + '?' + urlParameters
        } else {
          customUrl = this.url + '?' + urlParameters
        }
      } else {
        if (fillAll) {
          urlParameters = $.param(queryParam)
          customUrl = this.url + '?' + urlParameters
        }
      }

      if (this.ajax) {
        this.ajax.url = customUrl
      }

      return customUrl
    },

    /**
    * Set selected items
    */
    setItems (newValue) {
      $(`#${this.selectId}`).val('').trigger('change') // clean selected items
      $(`#${this.selectId}`).html('') // delete all the options

      const data = []

      if (newValue && newValue.length) {
        for (const item of newValue) {
          $(`#${this.selectId}`).append(new Option(item.text, item.id, true, true))
          data.push(item.id)
        }
      }

      $(`#${this.selectId}`).val(data)
        .trigger('select2:select')
        .trigger('change')

      this.$emit('input', $(`#${this.selectId}`).select2('data'))
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../themes/app.variables.styl'

.select2Buttons
  text-align right
  div
    padding $select2ButtonsPadding
    cursor pointer
    text-transform capitalize
    display inline-block
    border $select2ButtonsBorder
    margin $select2ButtonsMargin
    background $select2ButtonsBackground
    color $select2ButtonsColor
    border-radius $select2ButtonsBorderRadius
    font-size $select2ButtonsFontSize
    font-weight $select2ButtonsFontWeight

.select2-container--default
.select2-selection--multiple
  border-radius $select2ElementBorderRadius !important
  border $select2ElementBoder !important
  background-color $select2ElementBackgroundColor !important
  font-size $select2ElementFontSize !important
  font-weight $select2ElementFontWeight !important

.select2-selection__choice
  background-color $select2TagBackgroundColor !important
  color $select2TagColor !important
  font-size $select2TagFontSize !important
  font-weight $select2TagFontWeight !important
  border-radius $select2TagBorderRadius !important
  border $select2TagBorder !important
  cursor default !important
  .select2-selection__choice__remove
    color $select2TagUnselectColor !important
    font-size $select2TagUnselecFontSize !important
    font-weight $select2TagUnselecFontWeight !important

.select2-dropdown
  border-radius $select2DropdownBorderRadius !important
  border $select2DropdownBorder !important
  background-color $select2DropdownBackgroundColor !important
  .select2-results__option
    color $select2DropdownOptionsColor !important
    font-size $select2DropdownOptionsFontSize
    &[aria-selected=true]
      background-color $select2DropdownOptionsSelectedBackgroundColor !important
      color $select2DropdownOptionsSelectedColor !important
  .select2-results__option--highlighted[aria-selected]
    background-color $select2DropdownOptionsHighlightedBackgroundColor !important
    color $select2DropdownOptionsHighlightedColor !important
</style>
