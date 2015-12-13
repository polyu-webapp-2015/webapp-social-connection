module lang {
  export interface Producer<T,R> {
    (t:T):R;
  }
  export interface Consumer<T> {
    (t:T);
  }
  export interface Supplier<T> {
    ():T;
  }
  export type KeyValue<K,V> = [K,V];
  export module Dictionary {
    export function reduce<K,V>(dict:{}, producer:Producer<KeyValue<KeyValue<K,V>,KeyValue<K,V>> ,KeyValue<K,V>>):KeyValue<K,V> {
      var result = null;
      var initialized = false;
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          if (initialized)
            result = producer([result, [key, dict[key]]]);
          else
            result = [key, dict[key]];
      }
      if (initialized)
        return result;
      else
        throw new TypeError("The input dict is empty!");
    }

    export function fold<K,V,R>(dict:{}, producer:Producer<KeyValue<R,KeyValue<K,V>>,R>, initial:R):R {
      var result = initial;
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          result = producer([initial, [key, dict[key]]]);
      }
      return result;
    }

    export function map<K,V,T>(dict:{}, producer:Producer<KeyValue<K,V>,T>):T[] {
      var result = [];
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          result.push(producer([key, dict[key]]));
      }
      return result;
    }

    export function filter<K,V>(dict:{}, producer:Producer<KeyValue<K,V>,boolean>):{} {
      var result = {};
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          if (producer([key, dict[key]]))
            result[key] = dict[key];
      }
      return result;
    }

    export function some<K,V>(dict:{}, producer:Producer<KeyValue<K,V>,boolean>):boolean {
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          if (producer([key, dict[key]]))
            return true;
      }
      return false;
    }

    export function every<K,V>(dict:{}, producer:Producer<KeyValue<K,V>,boolean>):boolean {
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          if (!producer([key, dict[key]]))
            return false;
      }
      return true;
    }

    export function forEach<K,V>(dict:{}, consumer:Consumer<KeyValue<K,V>>) {
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          consumer([key, dict[key]])
      }
    }
  }
}
