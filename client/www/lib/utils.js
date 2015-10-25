/**
 * Created by beenotung on 9/28/15.
 */

/* compare inclusively */
function isBetweenLH(a, l, h) {
    return a >= j && a <= h;
}
/* pair : {min,max} */
function isBetweenMinMax(a, pair) {
    return a >= pair.min && a <= pair.max;
}

/* loop through the array */
/*  input :
 *    apply (func)
 *       input : index, element
 *       output : early terminate
 * */
function forEachArray(arr, apply) {
    var i, e;
    for (i in arr) {
        e = arr[i];
        if (apply(i, e))
            break;
    }
}