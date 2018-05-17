"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.updateIndex = functions.firestore.document('movies/{movieId}').onCreate(function (event) {
    var movieId = event.params.movieId;
    var movie = event.data.data();
    var searchableIndex = createIndex(movie.title);
    var indexedMovie = __assign({}, movie, { searchableIndex: searchableIndex });
    var db = admin.firestore();
    return db.collection('movies').doc(movieId).set(indexedMovie, { merge: true });
});
function createIndex(title) {
    var arr = title.toLowerCase().split('');
    var searchableIndex = {};
    var prevKey = '';
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var char = arr_1[_i];
        var key = prevKey + char;
        searchableIndex[key] = true;
        prevKey = key;
    }
    return searchableIndex;
}
//# sourceMappingURL=index.js.map