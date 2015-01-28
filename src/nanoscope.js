"use strict";

var _ = require('lodash'),

    Lens = require('./base/Lens'),

    // Predefined Lenses
    IndexedLens = require('./array/IndexedLens'),
    SliceLens = require('./array/SliceLens'),
    PathLens = require('./object/PathLens'),
    FilterLens = require('./array/FilterLens'),
    PluckLens = require('./object/PluckLens'),

    // Composite Lenses
    Compose = require('./combinator/Compose'),
    Optional = require('./combinator/Optional'),
    MultiLens = require('./combinator/MultiLens'),

    // Special Cases
    Getter = require('./base/Getter'),
    Setter = require('./base/Setter'),

    nanoscope,
    unsafe;

nanoscope = function (view) {

    // nanoscope shouldn't be thought of as a class, but is one.
    // So, don't require `new` keyword on construction.
    if (!(this instanceof nanoscope)) {
        return new nanoscope(view);
    }

    this._view = view;
};

/**
 * Add the nanoscope view to an options object
 *
 * @param options
 * @returns {*}
 */
nanoscope.prototype.addView = function (options) {
    return _.extend({ _view: this._view }, options);
};

/**
 * Construct a FilterLens
 *
 * @param filter
 * @param options
 * @returns {FilterLens}
 */
nanoscope.prototype.filter = function (filter, options) {
    return new FilterLens(filter, this.addView(options));
};

/**
 * Construct an IndexedLens
 *
 * @param index
 * @param options
 * @returns {IndexedLens}
 */
nanoscope.prototype.index = function (index, options) {
    return new IndexedLens(index, this.addView(options));
};

/**
 * Construct an unsafe IndexedLens
 *
 * @param index
 * @param options
 * @returns {IndexedLens}
 */
nanoscope.prototype.unsafeIndex = function (index, options) {
    return new IndexedLens.Unsafe(index, this.addView(options));
};

/**
 * Construct a SliceLens
 *
 * @param i
 * @param j
 * @param options
 * @returns {SliceLens}
 */
nanoscope.prototype.slice = function (i, j, options) {
    return new SliceLens(i, j, this.addView(options));
};

/**
 * Construct a PathLens
 *
 * @param path
 * @param options
 * @returns {PathLens}
 */
nanoscope.prototype.path = function (path, options) {
    return new PathLens(path, this.addView(options));
};

/**
 * Construct an unsafe PathLens
 *
 * @param path
 * @param options
 * @returns {PathLens.Unsafe}
 */
nanoscope.prototype.unsafePath = function (path, options) {
    return new PathLens.Unsafe(path, this.addView(options));
};

/**
 * Construct a PluckLens
 *
 * @param pluck
 * @param options
 * @returns {PluckLens}
 */
nanoscope.prototype.pluck = function (pluck, options) {
    return new PluckLens(pluck, this.addView(options));
};

/**
 * Construct a recursive PluckLens
 *
 * @param pluck
 * @param options
 * @returns {PluckLens.Recursive}
 */
nanoscope.prototype.recursivePluck = function (pluck, options) {
    return new PluckLens.Recursive(pluck, this.addView(options));
};

module.exports = nanoscope;