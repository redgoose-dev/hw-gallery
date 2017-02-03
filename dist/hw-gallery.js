/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _preference = __webpack_require__(1);\n\nvar _preference2 = _interopRequireDefault(_preference);\n\nvar _jquery = __webpack_require__(2);\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nvar _Images = __webpack_require__(3);\n\nvar _Images2 = _interopRequireDefault(_Images);\n\nvar _Loading = __webpack_require__(4);\n\nvar _Loading2 = _interopRequireDefault(_Loading);\n\nvar _ImagesController = __webpack_require__(6);\n\nvar _ImagesController2 = _interopRequireDefault(_ImagesController);\n\nvar _Typography = __webpack_require__(8);\n\nvar _Typography2 = _interopRequireDefault(_Typography);\n\nvar _ThumbnailImages = __webpack_require__(10);\n\nvar _ThumbnailImages2 = _interopRequireDefault(_ThumbnailImages);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction HWGallery() {\n\tvar _this = this;\n\n\tvar address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\tvar model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n\n\tthis.el = document.querySelector('.viewport');\n\tthis.images = null;\n\tthis.model = model || null;\n\tthis.loading = new _Loading2.default();\n\tthis.sideController = new _ImagesController2.default(this);\n\tthis.typography = new _Typography2.default(this);\n\tthis.thumbnailImages = new _ThumbnailImages2.default(this);\n\n\tthis.images = new _Images2.default(this, {\n\t\tdone: function done() {\n\t\t\t_this.sideController.controlVisible(_this.images.current);\n\t\t\t// off loading\n\t\t\t_this.loading.off(function () {\n\t\t\t\tconsole.log('complete loading off');\n\t\t\t});\n\t\t},\n\t\tfail: function fail(msg) {\n\t\t\treturn console.log(msg);\n\t\t},\n\t\tslideBefore: function slideBefore(before, after) {\n\t\t\t// update side control buttons\n\t\t\t_this.sideController.controlVisible(after);\n\n\t\t\t// update typography\n\t\t\t_this.typography.update(after);\n\n\t\t\t// update thumbnail images select\n\t\t\t_this.thumbnailImages.select(after);\n\t\t},\n\t\tslideAfter: function slideAfter(after) {},\n\t\tstartSlide: 0\n\t});\n\n\t/**\n  * Load api data\n  *\n  * @param {String} address\n  * @return {Object}\n  */\n\tthis.load = function (address) {\n\t\tvar defer = _jquery2.default.Deferred();\n\n\t\t_jquery2.default.getJSON(address, {}, function (res) {\n\t\t\tif (res.success) {\n\t\t\t\tdefer.resolve(res);\n\t\t\t} else {\n\t\t\t\tdefer.reject('API Error');\n\t\t\t}\n\t\t}).fail(function () {\n\t\t\tdefer.reject('API Error22');\n\t\t});\n\n\t\treturn defer.promise();\n\t};\n\n\t/**\n  * Complete api load\n  *\n  * @param {Array} res\n  */\n\tthis.completeLoad = function (res) {\n\t\t// set model\n\t\tthis.model = this.correction(res);\n\n\t\t// init images slide\n\t\tthis.images.init(this.model);\n\n\t\t// init thumbnail images\n\t\tthis.thumbnailImages.init(this.model);\n\t};\n\n\t/**\n  * Start\n  */\n\tthis.start = function () {\n\t\t// load api data\n\t\tthis.load(_preference2.default.api).done(this.completeLoad.bind(this)).fail(function (error) {\n\t\t\tconsole.log('ERROR:', error);\n\t\t});\n\t};\n}\n\n/**\n * Correction\n * 얻어온 API 데이터는 다른 형태일 수 있기 때문에 외부에서 모델 구조를 변경 할 수 있도록 prototype으로 사용.\n * `window.prototype.correction = function() {}` 형식으로 오버라이딩으로 커스터마이즈 할 수 있다.\n *\n * @param {Object} res\n * @return {Array}\n */\nHWGallery.prototype.correction = function (res) {\n\treturn res.data.map(function (o) {\n\t\tvar croppedImage = o.croppedImage,\n\t\t    feedback = o.feedback,\n\t\t    work = o.work;\n\n\t\treturn {\n\t\t\timage: croppedImage,\n\t\t\ttitle: work.title,\n\t\t\tdescription: feedback,\n\t\t\tdate: work.createdDate\n\t\t};\n\t});\n};\n\nwindow.HWGallery = HWGallery;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/App.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/App.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = {\n\tapi: 'https://api4.bbuzzart.com/picks'\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/preference.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/preference.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = $;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"$\"\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///external_%22$%22?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _jquery = __webpack_require__(2);\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nvar _LoadImage = __webpack_require__(7);\n\nvar _LoadImage2 = _interopRequireDefault(_LoadImage);\n\nvar _CSS = __webpack_require__(5);\n\nvar _CSS2 = _interopRequireDefault(_CSS);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction Images(root, options) {\n\tvar _this = this;\n\n\tvar self = this;\n\n\tthis.$el = (0, _jquery2.default)(root.el).find('.images');\n\tthis.$ul = null;\n\tthis.current = options.startSlide || 0;\n\tthis.total = 0;\n\n\tthis.positions = [];\n\n\t/**\n  * Create elements\n  *\n  * @param {Array} src\n  * @return {Object}\n  */\n\tvar create = function create(src) {\n\t\tvar $ul = (0, _jquery2.default)('<ul>');\n\t\t$ul.css('width', _this.total * 100 + '%');\n\n\t\tsrc.forEach(function (o) {\n\t\t\t$ul.append('<li data-image=\"' + o.image + '\"><figure></figure></li>');\n\t\t});\n\n\t\treturn $ul;\n\t};\n\n\t/**\n  * Save position\n  */\n\tvar savePosition = function savePosition() {\n\t\t_this.$ul.children('li').each(function (k) {\n\t\t\tself.positions[k] = self.$el.width() * k;\n\t\t});\n\t};\n\n\t/**\n  * Init keyboard event\n  */\n\tvar initKeyboardEvent = function initKeyboardEvent() {\n\t\t(0, _jquery2.default)(window).on('keydown', function (e) {\n\t\t\tswitch (e.keyCode) {\n\t\t\t\tcase 37:\n\t\t\t\t\t_this.prev();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 39:\n\t\t\t\t\t_this.next();\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t});\n\t};\n\n\t/**\n  * On resize event\n  */\n\tvar onResize = function onResize() {\n\t\t_this.$el.removeClass('animation');\n\t\tsavePosition();\n\t\t_this.changePosition(_this.positions[_this.current]);\n\t};\n\n\t/**\n  * Go slide\n  *\n  * @param {Number} n\n  */\n\tthis.go = function (n) {\n\t\tvar $currentElement = this.$el.find('li').eq(n);\n\t\tvar src = $currentElement.data('image');\n\n\t\tif (!this.$el.hasClass('animation')) {\n\t\t\tthis.$el.addClass('animation');\n\t\t}\n\n\t\t// callback slideBefore\n\t\tif (options.slideBefore) {\n\t\t\toptions.slideBefore(this.current, n);\n\t\t}\n\n\t\t// set current number\n\t\tthis.current = n;\n\n\t\t// loading image\n\t\tif (!$currentElement.hasClass('loaded')) {\n\t\t\t(0, _LoadImage2.default)(src).done(function () {\n\t\t\t\t$currentElement.addClass('loaded').children().css('background-image', 'url(\\'' + src + '\\')').addClass('show');\n\t\t\t}).fail(function (msg) {\n\t\t\t\tconsole.log('ERROR:', msg);\n\t\t\t});\n\t\t}\n\n\t\t// change position\n\t\tthis.changePosition(this.positions[n]);\n\t};\n\n\tthis.changePosition = function (pos) {\n\t\tthis.$ul.css({\n\t\t\t'-webkit-transform': 'translateX(-' + pos + 'px)',\n\t\t\t'transform': 'translateX(-' + pos + 'px)'\n\t\t});\n\t};\n\n\t/**\n  * Prev slide\n  */\n\tthis.prev = function () {\n\t\tif (this.current === 0) return;\n\t\tthis.go(this.current - 1);\n\t};\n\n\t/**\n  * Next slide\n  */\n\tthis.next = function () {\n\t\tif (this.current === this.total - 1) return;\n\t\tthis.go(this.current + 1);\n\t};\n\n\t/**\n  * init\n  *\n  * @param {Array} src\n  */\n\tthis.init = function (src) {\n\t\tvar _this2 = this;\n\n\t\tif (!src || !src.length) {\n\t\t\tif (options.fail) options.fail('not found data');\n\t\t}\n\n\t\t// set total slide\n\t\tthis.total = src.length;\n\n\t\t// create element\n\t\tthis.$ul = create(src);\n\t\tthis.$el.append(this.$ul);\n\n\t\t// init resize event\n\t\t(0, _jquery2.default)(window).on('resize.hwGallery', onResize).trigger('resize.hwGallery');\n\n\t\t// init transitionEnd event\n\t\tthis.$ul.on(_CSS2.default.isSupport(), function (e) {\n\t\t\tif (e.target !== _this2.$ul.get(0)) return;\n\n\t\t\tif (options.slideAfter) {\n\t\t\t\toptions.slideAfter(_this2.current);\n\t\t\t}\n\t\t});\n\n\t\t// init keyboard event\n\t\tinitKeyboardEvent();\n\n\t\t// go to 0\n\t\tthis.go(this.current);\n\n\t\t// set animation class\n\t\tthis.$el.addClass('animation');\n\n\t\t// done\n\t\toptions.done(this);\n\t};\n}\n\nexports.default = Images;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Images/index.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Images/index.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _jquery = __webpack_require__(2);\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nvar _CSS = __webpack_require__(5);\n\nvar _CSS2 = _interopRequireDefault(_CSS);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Create loading element\n *\n * @return {Object}\n */\nfunction createLoadingElement() {\n\tvar el = document.createElement('div');\n\tel.className = 'loading';\n\n\tvar message = document.createElement('span');\n\tmessage.className = 'message';\n\tmessage.innerText = 'Loading...';\n\n\tel.appendChild(message);\n\tdocument.querySelector('main').appendChild(el);\n}\n\nfunction Loading() {\n\n\tthis.el = document.querySelector('.loading');\n\n\tthis.on = function () {\n\t\tconsole.log('on loading');\n\t};\n\n\tthis.off = function (callback) {\n\t\tvar $el = (0, _jquery2.default)(this.el);\n\t\t$el.addClass('out');\n\t\t_CSS2.default.transitionEnd(this.el, function () {\n\t\t\t$el.remove();\n\t\t\tif (callback) {\n\t\t\t\tcallback();\n\t\t\t}\n\t\t});\n\t};\n\n\tif (!this.el) {\n\t\tcreateLoadingElement();\n\t}\n}\n\nexports.default = Loading;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Loading/index.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Loading/index.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _jquery = __webpack_require__(2);\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * CSS3\n */\nexports.default = {\n\n\teventNames: {\n\t\tWebkitTransition: 'webkitTransitionEnd',\n\t\tMozTransition: 'transitionend',\n\t\tOTransition: 'oTransitionEnd otransitionend',\n\t\ttransition: 'transitionend'\n\t},\n\n\tisSupport: function isSupport() {\n\t\tvar el = document.createElement('div');\n\t\tfor (var name in this.eventNames) {\n\t\t\tif (el.style[name] !== undefined) {\n\t\t\t\treturn this.eventNames[name];\n\t\t\t}\n\t\t}\n\t\tel = null;\n\t\treturn false;\n\t},\n\n\ttransitionEnd: function transitionEnd(el, callback) {\n\t\tif (this.isSupport()) {\n\t\t\tif (callback) {\n\t\t\t\t(0, _jquery2.default)(el).one(this.isSupport(), callback);\n\t\t\t}\n\t\t} else {\n\t\t\tif (callback) callback();\n\t\t}\n\t}\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/CSS3.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/util/CSS3.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction ImagesController(root) {\n\n\tthis.$el = $(root.el).find('.slide-controller');\n\tthis.$prev = this.$el.children('.btn-prev');\n\tthis.$next = this.$el.children('.btn-next');\n\n\t/**\n  * prev\n  */\n\tthis.prev = function () {\n\t\troot.images.prev();\n\t};\n\n\t/**\n  * next\n  */\n\tthis.next = function () {\n\t\troot.images.next();\n\t};\n\n\t/**\n  * Control visible buttons\n  *\n  * @param {Number} current\n  */\n\tthis.controlVisible = function (current) {\n\t\tif (current === 0) {\n\t\t\tthis.$prev.addClass('hide');\n\t\t} else {\n\t\t\tthis.$prev.removeClass('hide');\n\t\t}\n\n\t\tif (root.images.total - 1 === current) {\n\t\t\tthis.$next.addClass('hide');\n\t\t} else {\n\t\t\tthis.$next.removeClass('hide');\n\t\t}\n\t};\n\n\t// initial events\n\tthis.$prev.on('click', this.prev.bind(this));\n\tthis.$next.on('click', this.next.bind(this));\n}\n\nexports.default = ImagesController;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/ImagesController/index.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/ImagesController/index.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _jquery = __webpack_require__(2);\n\nvar _jquery2 = _interopRequireDefault(_jquery);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Load Image\n *\n * @param {String} src\n * @return {Object}\n */\nfunction LoadImage(src) {\n\tvar defer = _jquery2.default.Deferred();\n\tvar image = new Image();\n\n\timage.addEventListener('load', function () {\n\t\treturn defer.resolve();\n\t});\n\timage.addEventListener('error', function () {\n\t\treturn defer.reject('image load error');\n\t});\n\timage.src = src;\n\n\treturn defer.promise();\n}\n\nexports.default = LoadImage;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/LoadImage.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/util/LoadImage.js?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nfunction Typography(root) {\n\n\tthis.$el = $(root.el).find('.typography');\n\tthis.$title = this.$el.children('h1');\n\tthis.$description = this.$el.children('.description');\n\tthis.$date = this.$el.children('.date');\n\n\t/**\n  * Update text\n  *\n  * @param {Number} current\n  */\n\tthis.update = function () {\n\t\tvar current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\t\tvar _root$model$current = root.model[current],\n\t\t    title = _root$model$current.title,\n\t\t    description = _root$model$current.description;\n\n\t\tvar date = new Date(root.model[current].date);\n\n\t\tthis.$title.text(title);\n\t\tthis.$description.text(description);\n\t\tthis.$date.text(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());\n\t};\n}\n\nexports.default = Typography;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Typography/index.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Typography/index.js?");

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nfunction ThumbnailImages(root) {\n\n\tthis.$el = $(root.el).find('.thumbnail-images');\n\tthis.$index = this.$el.children('.index');\n\tthis.$buttons = this.$el.children('.button-area');\n\n\tvar create = function create(src) {\n\t\tvar $ul = $('<ul>');\n\n\t\tsrc.forEach(function (o, k) {\n\t\t\t$ul.append('<li><button type=\"button\" data-key=\"' + k + '\" style=\"background-image: url(\\'' + o.image + '\\')\"></button></li>');\n\t\t});\n\n\t\treturn $ul;\n\t};\n\n\t/**\n  * Show\n  */\n\tthis.show = function () {\n\t\tthis.$el.addClass('active');\n\t};\n\n\t/**\n  * Hide\n  */\n\tthis.hide = function () {\n\t\tthis.$el.removeClass('active');\n\t};\n\n\t/**\n  * Select item\n  *\n  * @param {Number} n\n  */\n\tthis.select = function (n) {\n\t\tvar $items = this.$index.find('button');\n\n\t\t$items.removeClass('active');\n\t\t$items.eq(n).addClass('active');\n\t};\n\n\t/**\n  * Init\n  *\n  * @param {Array} model\n  */\n\tthis.init = function (model) {\n\t\tvar _this = this;\n\n\t\tthis.$buttons.find('.btn-toggle').on('click', function () {\n\t\t\tsetTimeout(function () {\n\t\t\t\t_this.$el.toggleClass('active');\n\t\t\t}, 100);\n\t\t});\n\n\t\t// create index items element\n\t\tthis.$index.append(create(model));\n\n\t\t// init items event\n\t\tthis.$index.find('button').on('click', function (e) {\n\t\t\troot.images.go(parseInt($(e.currentTarget).data('key')));\n\t\t});\n\n\t\t// update thumbnail images select\n\t\tthis.select(root.images.current);\n\t};\n}\n\nexports.default = ThumbnailImages;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/ThumbnailImages/index.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/ThumbnailImages/index.js?");

/***/ }
/******/ ]);