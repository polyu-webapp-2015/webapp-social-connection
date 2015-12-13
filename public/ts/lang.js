var lang;
(function (lang) {
    var Dictionary;
    (function (Dictionary) {
        /** @deprecated does not work */
        function create() {
            var o = {};
            inject(o);
            return o;
        }
        Dictionary.create = create;
        /** @deprecated does not work */
        function inject(dict) {
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
        Dictionary.inject = inject;
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
        Dictionary.reduce = reduce;
        function fold(dict, producer, initial) {
            var result = initial;
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    result = producer([initial, [key, dict[key]]]);
            }
            return result;
        }
        Dictionary.fold = fold;
        function map(dict, producer) {
            var result = [];
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    result.push(producer([key, dict[key]]));
            }
            return result;
        }
        Dictionary.map = map;
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
        Dictionary.filter = filter;
        function some(dict, producer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    if (producer([key, dict[key]]))
                        return true;
            }
            return false;
        }
        Dictionary.some = some;
        function every(dict, producer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    if (!producer([key, dict[key]]))
                        return false;
            }
            return true;
        }
        Dictionary.every = every;
        function forEach(dict, consumer) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    consumer([key, dict[key]]);
            }
        }
        Dictionary.forEach = forEach;
    })(Dictionary = lang.Dictionary || (lang.Dictionary = {}));
})(lang || (lang = {}));
//# sourceMappingURL=lang.js.map