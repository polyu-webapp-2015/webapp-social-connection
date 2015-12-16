var lang;
(function (lang) {
    var DictionaryHelper;
    (function (DictionaryHelper) {
        /** @deprecated the created object will have functions being looped, the consumer need to skip function items */
        function create() {
            var o = {};
            inject(o);
            return o;
        }
        DictionaryHelper.create = create;
        /** @deprecated the injected function will be looped */
        function inject(dict) {
            dict.reduce = function (producer) { return reduce(dict, producer); };
            dict.fold = function (p, initial) { return fold(dict, p, initial); };
            dict.map = function (producer) { return map(dict, producer); };
            dict.filter = function (producer) { return filter(dict, producer); };
            dict.some = function (producer) { return some(dict, producer); };
            dict.every = function (producer) { return every(dict, producer); };
            dict.forEach = function (producer) { return forEach(dict, producer); };
        }
        DictionaryHelper.inject = inject;
        function reduce(dict, producer) {
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
        DictionaryHelper.reduce = reduce;
        function fold(dict, producer, initial) {
            var result = initial;
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    result = producer([initial, [key, dict[key]]]);
            }
            return result;
        }
        DictionaryHelper.fold = fold;
        function map(dict, producer) {
            var result = [];
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    result.push(producer([key, dict[key]]));
            }
            return result;
        }
        DictionaryHelper.map = map;
        function filter(dict, producer) {
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
        DictionaryHelper.filter = filter;
        function some(dict, producer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    if (producer([key, dict[key]]))
                        return true;
            }
            return false;
        }
        DictionaryHelper.some = some;
        function every(dict, producer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    if (!producer([key, dict[key]]))
                        return false;
            }
            return true;
        }
        DictionaryHelper.every = every;
        function forEach(dict, consumer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    consumer([key, dict[key]]);
            }
        }
        DictionaryHelper.forEach = forEach;
    })(DictionaryHelper = lang.DictionaryHelper || (lang.DictionaryHelper = {}));
    var ArrayHelper;
    (function (ArrayHelper) {
        function flatten(arrays) {
            return arrays.reduce(function (a, c) { return a.concat(c); });
        }
        ArrayHelper.flatten = flatten;
    })(ArrayHelper = lang.ArrayHelper || (lang.ArrayHelper = {}));
    var async;
    (function (async) {
        /**
         * @param process_array array : async functions to execute,
         *  each 'process' should consume the loadOne exactly once when it has finish the life cycle,
         *  typical example are a bunch of http request
         * @param callback Function : this function will be called when all process has finished
         * */
        function fork_and_join(process_array, callback) {
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
                process_array.forEach(function (process) { return process(doneOne); });
        }
        async.fork_and_join = fork_and_join;
    })(async = lang.async || (lang.async = {}));
})(lang || (lang = {}));
//# sourceMappingURL=lang.js.map