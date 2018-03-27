# ldx-vue-select2
The Select2 (http://select2.org) component for VueJs.

## Properties

``` bash

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
  @Prop() private select: IdTextPair[];
  
```

## License & Copyright

The materials herein are all (c) 2017-2020 <a href="http://www.landix.com.br"> Landix Sistemas. </a>

<a rel="license" href="https://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://licensebuttons.net/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0 International (CC BY 4.0)</a>.
