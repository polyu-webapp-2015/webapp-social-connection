var lang;
(function (lang) {
    var Dictionary;
    (function (Dictionary) {
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
            for (var key in dict) {
                if (dict.hasOwnProperty(key))
                    if (producer([key, dict[key]]))
                        result[key] = dict[key];
            }
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