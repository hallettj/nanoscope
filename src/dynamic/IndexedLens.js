"use strict";

var _ = require('lodash'),

    Lens = require('../Lens'),

    IndexedLens,

    get,
    over;

/**
 * Get the element at a specific index of an array
 *
 * @param index
 * @returns {Function}
 */
get = function (index) {
    return function (arr) {
        if (!(_.isArray(arr))) {
            throw new Error('Argument to indexed lens must be an array');
        }

        if (arr[index]) {
            return arr[index];
        }

        return null;
    };
};

/**
 * Map a function over the value at some index in an array
 *
 * @param index
 * @returns {Function}
 */
over = function (index) {
    return function (arr, func) {
        var newArr = _.cloneDeep(arr);

        if (!(_.isArray(newArr))) {
            throw new Error('Argument to indexed lens must be an array');
        }

        newArr[index] = func(newArr[index]);

        return newArr;
    };
};

/**
 * Construct an IndexedLens from an index
 *
 * @param index
 * @returns {Lens}
 * @constructor
 */
IndexedLens = function (index) {
    this._lens = new Lens(get(index), over(index), { _index: index });

    return this._lens;
};

/**
 * Set the index of an IndexedLens
 *
 * @param index
 * @returns {IndexedLens}
 */
IndexedLens.prototype.setIndex = function (index) {
    return new IndexedLens(index);
};

module.exports = IndexedLens;