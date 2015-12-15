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
  export interface Function {
    ();
  }
  export type KeyValue<K,V> = [K,V];
  export module Dictionary {
    /** @deprecated does not work */
    export function create() {
      var o = {};
      inject(o);
      return o;
    }

    /** @deprecated does not work */
    export function inject(dict:any) {
      //dict.reduce = (producer)=>reduce(dict, producer);
      //dict.fold = (p, initial)=>fold(dict, p, initial);
      //dict.map = (producer)=>map(dict, producer);
      //dict.filter = (producer)=>filter(dict, producer);
      //dict.some = (producer)=>some(dict, producer);
      //dict.every = (producer)=>every(dict, producer);
      //dict.forEach = (producer)=>forEach(dict, producer);
      dict.reduce = function (producer) {
        return reduce(dict, producer);
      };
      dict.fold = function (p, initial) {
        return fold(dict, p, initial);
      };
      dict.map = function (producer) {
        return map(dict, producer);
      };
      dict.filter = function (producer) {
        return filter(dict, producer);
      };
      dict.some = function (producer) {
        return some(dict, producer);
      };
      dict.every = function (producer) {
        return every(dict, producer);
      };
      dict.forEach = function (producer) {
        return forEach(dict, producer);
      };
    }

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
      //var result = create();
      for (var key in dict) {
        if (dict.hasOwnProperty(key))
          if (producer([key, dict[key]]))
            result[key] = dict[key];
      }
      //inject(result);
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
  export module async {
    /**
     * @param process_array array : async functions to execute,
     *  each 'process' should consume the loadOne exactly once when it has finish the life cycle,
     *  typical example are a bunch of http request
     * @param callback Function : this function will be called when all process has finished
     * */
    export function fork_and_join(process_array:Consumer<Function>[], callback:Function) {
      var done = 0;
      var total = process_array.length;

      function doneOne() {
        done++;
        if (done == total)
          callback();
      }

      if (total == 0)
        callback();
      else
        process_array.forEach(process=>process(doneOne));
    }
  }
}
