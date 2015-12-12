/* -------- Lang -------- */
function confirmThenDo(msg, func) {
    if (confirm(msg)) {
        func();
    }
}

/**
 * @return time in  millisecond
 * */
function getTime() {
    return new Date().getTime();
}

/**
 * @Define measure time used
 * @warning unsafe (key collision)
 * @func tic to start
 * @func toc to end return time elapsed in millisecond
 * @return number : time elapsed in millisecond
 *         false : if key does not exist
 * */
var _tic_toc_dict = {};
function tic(key) {
    _tic_toc_dict[key] = getTime();
}
function toc(key) {
    try {
        return getTime - _tic_toc_dict[key];
    } catch (exception) {
        return false;
    }
}

/* -------- class -------- */
/* Map */
/* key-value pair container */
var MapEntity = function (key, value) {
    this.key = key;
    this.value = value;
};
MapEntity.prototype = {
    invert: function () {
        return new MapEntity(this.value, this.key);
    }
};

/* this data structure support bi-directional lookup of key-value pair
 * consume doubled memory usage for performance
 * does not support 1 to many relationship *yet* */
var BiMap = function (keyMap, valueMap) {
    this.keyMap = (keyMap) ? keyMap : new Map();
    this.valueMap = (valueMap) ? valueMap : new Map();
    //this.size = 0;
};
BiMap.prototype = {
    setPair: function (key, value) {
        /* return the original MapEntity if any, otherwise return null */
        var mapEntity = null;
        if (this.hasKey(key)) {
            mapEntity = new MapEntity(key, this.getValue(key));
        } else if (this.hasValue(value)) {
            mapEntity = new MapEntity(this.getKey(value), value);
        }
        this.keyMap.set(key, value);
        this.valueMap.set(value, key);
        return mapEntity;
    }
    , hasKey: function (key) {
        return this.keyMap.has(key);
    }
    , hasValue: function (value) {
        return this.valueMap.has(value);
    }
    , getValue: function (key) {
        return this.keyMap.get(key);
    }
    , getKey: function (value) {
        return this.valueMap.get(value);
    }
    , removePair: function (key, value) {
        /* return the original MapEntity if any */
        if (key) {
            if (!value)
                value = this.keyMap.get(key);
            this.keyMap.delete(key);
            this.valueMap.delete(value);
            return new MapEntity(key, value);
        } else if (value) {
            key = this.valueMap.get(value);
            this.keyMap.delete(key);
            this.valueMap.delete(value);
            return new MapEntity(key, value);
        }
        return null;
    }
    , removeByKey: function (key) {
        /* return the original MapEntity if any */
        return this.removePair(key, null);
    }
    , removeByValue: function (value) {
        /* return the original MapEntity if any */
        return this.removePair(null, value);
    }, invert: function () {
        /* return an new BiMap with keyMap and valueMap swapped */
        return new BiMap(this.valueMap, this.keyMap);
    }, clear: function () {
        /* remove all MapEntity from the keyMap and valueMap */
        this.keyMap.clear();
        this.valueMap.clear();
    }
    , getSize: function () {
        /* return number of MapEntity stored in this BiMap */
        return this.keyMap.size;
    }
    , isAllUniqPair: function () {
        /* return true if the key-value pairs fulfill 1-to-1 relationship, false otherwise */
        return this.keyMap.size == this.valueMap.size;
    }
    , updateByKey: function () {
        var key_value_array = [];
        this.keyMap.forEach(function (value, key) {
            key_value_array.push([key, value]);
        });
        var o = this;
        forEach(key_value_array, function (i, e) {
            o.setPair(e[0], e[1]);
        });
    }
};

/* random generation class */
var Random = function () {
};
Random.prototype = {
    /* return [0,max] */
    nextInt: function (max) {
        return Math.round(Math.random() * max)
    }
    /* return [0,max) */
    , nextIntRestrict: function (max) {
        return Math.floor(Math.random() * max)
    }
};

/* -------- typed function -------- */
/* reverted dictionary lookup */
function getKeyByValueFromDictionary(dict, value) {
    var i;
    for (i in dict) {
        if (dict[i] == value)
            return i;
    }
    return null;
}

/* Filter */
/* input :
 ori : array
 func : filter function
 input : element from the array
 output : true to keep the element, false to discard the element
 output :
 new array
 * */
function filterArray(oriArr, filterFunc) {
    var resArr = [];
    var i, e;
    for (i in oriArr) {
        e = oriArr[i];
        if (filterFunc(e))
            resArr.push(e);
    }
    return resArr;
}

/* filter jquery dom object collection by dom class */
function filter$ArrayByClass($arr, classString) {
    return filterArray($arr, function ($e) {
        return $e.hasClass(classString);
    });
}

/* loop through the array */
/*  input :
 *    apply (func)
 *       input : index, element
 *       output : early terminate
 *    isReverse : true to loop from the tail, false to loop from head
 * */
function forEach(arr, apply, isReverse) {
    var i, e;
    if (isReverse) {
        for (i = arr.length - 1; i >= 0; i--) {
            e = arr[i];
            if (apply(i, e))
                break;
        }
    } else for (i in arr) {
        e = arr[i];
        if (apply(i, e))
            break;
    }
}

/* return random index in input array */
function randomIndexInArray(arr) {
    return Random.prototype.nextIntRestrict(arr.length);
}

/* return random element from input array */
function randomElementInArray(arr) {
    return arr[randomIndexInArray(arr)];
}

function isBetween(low, target, high) {
    return low <= target && target <= high;
}

function arrayConcat(a, b) {
    var c = [];
    var i;
    for (i in a) c.push(a[i]);
    for (i in b) c.push(b[i]);
    return c;
}

/* create and return new div */
function createDiv(parent, id, classString) {
    var $div = $('<div />').appendTo(parent);
    $div.attr('id', id);
    $div.attr('class', classString);
    return $div;
}


/* UI related*/
function getScreenWidth(padding) {
    if (!padding)
        padding = 0;
    var w = window;
    var e = document.documentElement;
    var g = document.getElementsByTagName('body')[0];
    return (w.innerWidth || e.clientWidth || g.clientWidth) - padding * 2;
}
function getScreenHeight(padding) {
    if (!padding)
        padding = 0;
    var w = window;
    var e = document.documentElement;
    var g = document.getElementsByTagName('body')[0];
    return (w.innerHeight || e.clientHeight || g.clientHeight) - padding * 2;
}
