<template>
  <div class="select2Father">
    <select :ref="selectId" :id="selectId" class="select2-data-ajax"></select>
    <div class="select2Buttons">
      <div v-if="multiple && allowFill" @click="fillAll">{{ selectAllLabel }}</div>
      <div v-if="multiple && allowFill && !allowClear" @click="cleanAll">{{ cleanSelectedLabel }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

@Component
export default class Select2 extends Vue {
  /**
   * Unique identifier for the select2 component
   * @default 'select2ID'
   * @type {string}
   */
  @Prop({ default: 'select2ID' }) private selectId: string;
  /**
   * Label for select all items on select2
   * @default 'todos'
   * @type {string}
   */
  @Prop({ default: 'todos' }) private selectAllLabel: string;
  /**
   * Label for select clean all selected items on select2
   * @default 'limpar'
   * @type {string}
   */
  @Prop({ default: 'limpar' }) private cleanSelectedLabel: string;
  /**
   * Property to enable select all items
   * @default 'false'
   * @type {boolean}
   */
  @Prop({ default: false }) private allowFill: boolean;
  /**
   * Property to enable clean all selected items
   * @default 'false'
   * @type {boolean}
   */
  @Prop({ default: false }) private allowClear: boolean;
  /**
   * The size of the select componet
   * @default '100%'
   * @type {string}
   */
  @Prop({ default: '100%' }) private width: string;
  /**
   * The placeholder label
   * @default 'selecione uma opção ...'
   * @type {string}
   */
  @Prop({ default: 'selecione uma opção ...' }) private placeholder: string;
  /**
   * Property to enable close the options on select a item
   * @default 'true'
   * @type {boolean}
   */
  @Prop({ default: true }) private closeOnSelect: boolean;
  /**
   * Property to enable select multiples items
   * @default 'false'
   * @type {boolean}
   */
  @Prop({ default: false }) private multiple: boolean;
  /**
   * The restfull API to GET the items
   * @type {string}
   */
  @Prop() private url: string;
  /**
   * The number of the items load per time
   * @default '10'
   * @type {number}
   */
  @Prop({ default: 10 }) private limitPerPage: number;
  /**
   * Label for error loading options
   * @default 'não foi possível carregar os itens'
   * @type {string}
   */
  @Prop({ default: 'não foi possível carregar os itens' }) private errorLoading: string;
  /**
   * Label for input too long, use {overChars} to display the number of over characters
   * @default 'apague {overChars} caracteres.'
   * @type {string}
   */
  @Prop({ default: 'apague {overChars} caracteres.' }) private inputTooLong: string;
  /**
   * Label for input too short, use {remainingChars} to display the number of remaining characters
   * @default 'digite {remainingChars} ou mais caracteres.'
   * @type {string}
   */
  @Prop({ default: 'digite {remainingChars} ou mais caracteres.' }) private inputTooShort: string;
  /**
   * Label for loading more items
   * @default 'carregando mais resultados …'
   * @type {string}
   */
  @Prop({ default: 'carregando mais resultados …' }) private loadingMore: string;
  /**
   * Label for maximum selected items, use {maximum} to display the number of maximum characters
   * @default 'você só pode selecionar {maximum} item(s)'
   * @type {string}
   */
  @Prop({ default: 'você só pode selecionar {maximum} item(s)' }) private maximumSelected: string;
  /**
   * Label for no items found by the term searched
   * @default 'nenhum resultado encontrado.'
   * @type {string}
   */
  @Prop({ default: 'nenhum resultado encontrado.' }) private noResults: string;
  /**
   * Label for searching items by the term
   * @default 'buscando …'
   * @type {string}
   */
  @Prop({ default: 'buscando …' }) private searching: string;
  /**
   * Property to disable the select
   * @default 'false'
   * @type {boolean}
   */
  @Prop({ default: false }) private disable: boolean;
  /**
   * Property to disable the select
   * @type {object}
   */
  @Prop() private queryParameters: object;
   /**
    * The initialized selected options
    * @type {IdTextPair[]}
    */
  @Prop() private initialValues: IdTextPair[];
  /**
   * The options
   * @type {IdTextPair[]}
   */
  @Prop() private options: IdTextPair[];
  /**
   * Modifier query parameters
   * @type {object}
   */
  private mutableQueryParameters: object;
  /**
   * Setting the AJAX Options
   * @type {Select2AjaxOptions}
   */
  private ajax: Select2AjaxOptions = {
    url: this.customizeUrl(false),
    dataType: 'json',
    type: 'GET',
    delay: 500,
    cache: true,
    xhrFields: {
      withCredentials: true,
    },
    data: (params) => {
      return {
        Term: params.term || '', // search term
        Page: params.page || 1,
        LimitPerPage: this.limitPerPage || 10,
      };
    },
    beforeSend() {
      // Loading.show()
    },
    error(error) {
      if (error.statusText !== 'abort') {
        // Toast.create.negative(vue.$i18n.t('message.errorFetchingDataFromServer').capitalize())
        // Loading.hide()
      }
    },
    processResults: (data, params) => {
      params.page = params.page || 1;

      // Hide the loading
      // Loading.hide()

      return {
        results: data.items || [],
        pagination: {
          more: (params.page * (this.limitPerPage || 10)) < data.total,
        },
      };
    },
  };

  public updateQueryParameters(value: object) {
    this.mutableQueryParameters = value;
    this.setSelect2();
  }

  /**
   * On elements loaded.
   */
  private mounted() {
    this.customMessages();
    this.setSelect2();
    this.setEvents();
  }

  /**
   * On elements updated.
   */
  private updated() {
    this.setSelect2();
  }

  /**
   * Set the select2 to the given element identification.
   */
  private setSelect2() {
    // Set the select2 to the given identifier object
    $(`#${this.selectId}`).select2({
      placeholder: this.placeholder,
      data: this.options,
      closeOnSelect: this.closeOnSelect,
      allowClear: this.allowClear,
      multiple: this.multiple,
      escapeMarkup(markup: string) { return markup; }, // let our custom formatter work
      minimumInputLength: 0,
      width: this.width,
      language: 'custom',
      ajax: !this.url ? undefined : this.ajax,
    });

    // Enable or disable the select2 element
    if (this.disable) {
      $(`#${this.selectId}`).prop('disabled', true);
    }

    if (this.initialValues) {
      this.setItems(this.initialValues);
    }

    if (this.options) {
      this.$emit('input', $(`#${this.selectId}`).select2('data'));
    }
  }

  /**
   * Custom internationalization messages.
   */
  private customMessages() {
    // Set the labels of the select2 component
    $.fn.select2.amd.define('select2/i18n/custom', [], () => {
      return {
        // Error Loading
        errorLoading: () => this.errorLoading,

        // Input too Long
        inputTooLong: (args: any): string => {
          const overChars = args.input.length - args.maximum;
          let message = this.inputTooLong.replace('{overChars}', overChars.toString());
          if (overChars !== 1) {
            message += 's';
          }

          return message;
        },

        // Input too Short
        inputTooShort: (args: any): string =>
          this.inputTooShort.replace('{remainingChars}', (args.minimum - args.input.length).toString()),

        // Loading More
        loadingMore: () => this.loadingMore,

        // Maximum Selected
        maximumSelected: (args: any): string => {
          let message = this.maximumSelected.replace('{maximum}', args.maximum);
          if (args.maximum !== 1) {
            message += 's';
          }
          return message;
        },

        // No Results
        noResults: () => this.noResults,

        // Searching
        searching: () => this.searching,
      };
    });
  }

  /**
   * Emit events to the father component.
   */
  private setEvents() {
    // On select a item
    $(`#${this.selectId}`).on('select2:select', (evt) => {
      // Emit the selected ids
      this.$emit('onSelect', $(`#${this.selectId}`).val());

      // Update the model
      this.$emit('input', $(`#${this.selectId}`).select2('data'));

      // Emit the full object selected
      if ((evt as any).params) {
        this.$emit('onSelectItem', (evt as any).params.data);
      }
    });

    $('#' + this.selectId).on('select2:unselect', (evt) => {
      const value = this.multiple ? $(`#${this.selectId}`).val() : [];

      // Emit the selected ids
      this.$emit('onSelect', value);

      // Update the model
      this.$emit('input', $(`#${this.selectId}`).select2('data'));

      // Emit the full object unselected
      if ((evt as any).params) {
        this.$emit('onUnselect', (evt as any).params.data.id);
      }
    });

    // Remove the select2 options dropdown on page change or refresh
    window.onpopstate = () => $('.select2-dropdown').remove();
    window.onhashchange = () => $('.select2-dropdown').remove();
  }

  /**
   * Select all items
   */
  private fillAll() {
    if (!this.url) {
      $(`#${this.selectId}`).find('option')
                            .prop('selected', true)
                            .trigger('select2:select')
                            .trigger('change');
    } else {
      $(`#${this.selectId}`).val('').trigger('change'); // clean selected items
      $(`#${this.selectId}`).html(''); // delete all the options

      const data: string[] = [];

      // Call api
      this.$http.get(this.customizeUrl(true)).then((response: any) => {
        for (const item of response.data.items) {
          $(`#${this.selectId}`).append(new Option(item.text, item.id, true, true));
          data.push(item.id);
        }
        $(`#${this.selectId}`).val(data)
                              .trigger('select2:select')
                              .trigger('change');
      });
    }

    this.$emit('input', $(`#${this.selectId}`).select2('data'));
  }

  /**
   * Unselect all items
   */
  private cleanAll() {
    $(`#${this.selectId}`).val('')
                          .trigger('select2:select')
                          .trigger('change');

    this.$emit('input', $(`#${this.selectId}`).select2('data'));
  }

  /**
   * Customize URL with the query parameters
   */
  private customizeUrl(fillAll: boolean): string {
    const queryParam = {
      Page: 1,
      LimitPerPage: -1,
    };
    let customUrl: string = this.url;
    let urlParameters: string = '';

    if (this.mutableQueryParameters !== undefined && this.mutableQueryParameters !== null) {
      urlParameters = $.param(this.mutableQueryParameters);
      if (fillAll) {
        urlParameters += '&' + $.param(queryParam);
        customUrl = this.url + '?' + urlParameters;
      } else {
        customUrl = this.url + '?' + urlParameters;
      }
    } else {
      if (fillAll) {
        urlParameters = $.param(queryParam);
        customUrl = this.url + '?' + urlParameters;
      }
    }
    return customUrl;
  }

  /**
   * Set selected items
   */
  private setItems(newValue: IdTextPair[]) {
    $(`#${this.selectId}`).val('').trigger('change'); // clean selected items
    $(`#${this.selectId}`).html(''); // delete all the options

    const data: string[] = [];

    if (newValue && newValue.length) {
      for (const item of newValue) {
        $(`#${this.selectId}`).append(new Option(item.text, item.id, true, true));
        data.push(item.id);
      }
    }

    $(`#${this.selectId}`).val(data)
                          .trigger('select2:select')
                          .trigger('change');

    this.$emit('input', $(`#${this.selectId}`).select2('data'));
  }

  @Watch('initialValues')
  private onInitialValuesChanged(newValue: IdTextPair[]) {
    this.setItems(newValue);
  }

  @Watch('disable')
  private onDisableChanged(newValue: boolean) {
    $(`#${this.selectId}`).prop('disabled', newValue);
  }

  @Watch('queryParameters')
  private onQueryParametersChanged(newValue: object) {
    this.mutableQueryParameters = newValue;
  }

  @Watch('options')
  private onOptionsChanged(newValue: IdTextPair[]) {
    $(`#${this.selectId}`).val('').trigger('change'); // clean selected items
    $(`#${this.selectId}`).html(''); // delete all the options

    $(`#${this.selectId}`).select2({
      data: newValue,
    }).trigger('change');
  }
}
</script>

<style lang="stylus">
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
