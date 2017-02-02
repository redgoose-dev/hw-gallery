import preference from '../preference.js';
import $ from 'jquery';

import Images from './Images';
import Loading from './Loading';
import ImagesController from './ImagesController';


function HWGallery(address='', model=null) {

	this.el = document.querySelector('.viewport');
	this.images = null;
	this.model = model || null;
	this.loading = new Loading();
	this.sideController = new ImagesController(this);

	this.images = new Images(this, {
		done: () => {
			// off loading
			this.loading.off(() => {
				console.log('complete loading off');
			});
		},
		fail: (msg) => console.log(msg),
		slideBefore: (before, after) => {
			//console.log(before, after);
		},
		slideAfter: (after) => {
			console.log('after');
		},
		startSlide: 0,
	});

	/**
	 * Load api data
	 *
	 * @param {String} address
	 * @return {Object}
	 */
	this.load = function(address)
	{
		const defer = $.Deferred();

		$.getJSON(address, {}, (res) => {
			if (res.success)
			{
				defer.resolve(res)
			}
			else
			{
				defer.reject('API Error');
			}
		}).fail(function() {
			defer.reject('API Error22');
		});

		return defer.promise();
	};

	/**
	 * Complete api load
	 *
	 * @param {Array} res
	 */
	this.completeLoad = function(res)
	{
		// set model
		this.model = this.correction(res);

		// init images slide
		this.images.init(this.model);
	};

	/**
	 * Start
	 */
	this.start = function()
	{
		// load api data
		this.load(preference.api)
			.done(this.completeLoad.bind(this))
			.fail((error) => {
				console.log('ERROR:', error);
			});
	};

}

/**
 * Correction
 * 얻어온 API 데이터는 다른 형태일 수 있기 때문에 외부에서 모델 구조를 변경 할 수 있도록 prototype으로 사용.
 * `window.prototype.correction = function() {}` 형식으로 오버라이딩
 *
 * @param {Object} res
 * @return {Array}
 */
HWGallery.prototype.correction = function(res)
{
	return res.data.map((o) => {
		const { croppedImage, feedback, work } = o;
		return {
			image: croppedImage,
			title: work.title,
			description: feedback,
			date: work.createdDate,
		}
	});
};


window.HWGallery = HWGallery;