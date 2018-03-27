import Vue, { PluginFunction, PluginObject } from 'vue';
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue {
    axios: AxiosInstance;
    $http: AxiosInstance;
  }
}

declare class VueAxios {
  public static install: PluginFunction<AxiosInstance>;
}

export = VueAxios;
