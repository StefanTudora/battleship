"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["src_model_game-entities_human-player_js"],{

/***/ "./src/model/game-entities/human-player.js"
/*!*************************************************!*\
  !*** ./src/model/game-entities/human-player.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/model/game-entities/player.js\");\n\n\nclass HumanPlayer extends _player_js__WEBPACK_IMPORTED_MODULE_0__.Player {\n\n    constructor(gameBoard) {\n        super(gameBoard);\n        this.playerType = 'human';\n        this._solver    = undefined;\n    }\n\n    attackBoard() {\n        if (this._solver !== undefined) {\n            throw new Error('Human player is already executing')\n        }\n\n        return new Promise((resolve) => {\n            this._solver = resolve;\n        });\n    }\n\n    resolveMove(point) {\n        if (this._solver === undefined) {\n            throw new Error('No pending move for Human Player')\n        }\n\n        /*\n         *  Attack the board \n         */\n        const [state, _] = this.board.receiveAttack(point);\n\n        const solver = this._solver;\n        this._solver = undefined;\n        solver([point, state]);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HumanPlayer);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWwvZ2FtZS1lbnRpdGllcy9odW1hbi1wbGF5ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUM7O0FBRXJDLDBCQUEwQiw4Q0FBTTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kZWwvZ2FtZS1lbnRpdGllcy9odW1hbi1wbGF5ZXIuanM/ZGJmMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcblxuY2xhc3MgSHVtYW5QbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZUJvYXJkKSB7XG4gICAgICAgIHN1cGVyKGdhbWVCb2FyZCk7XG4gICAgICAgIHRoaXMucGxheWVyVHlwZSA9ICdodW1hbic7XG4gICAgICAgIHRoaXMuX3NvbHZlciAgICA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhdHRhY2tCb2FyZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NvbHZlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0h1bWFuIHBsYXllciBpcyBhbHJlYWR5IGV4ZWN1dGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NvbHZlciA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc29sdmVNb3ZlKHBvaW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9zb2x2ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwZW5kaW5nIG1vdmUgZm9yIEh1bWFuIFBsYXllcicpXG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgKiAgQXR0YWNrIHRoZSBib2FyZCBcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IFtzdGF0ZSwgX10gPSB0aGlzLmJvYXJkLnJlY2VpdmVBdHRhY2socG9pbnQpO1xuXG4gICAgICAgIGNvbnN0IHNvbHZlciA9IHRoaXMuX3NvbHZlcjtcbiAgICAgICAgdGhpcy5fc29sdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICBzb2x2ZXIoW3BvaW50LCBzdGF0ZV0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHVtYW5QbGF5ZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/model/game-entities/human-player.js\n\n}");

/***/ }

}]);