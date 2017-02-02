import $ from 'jquery';


/**
 * Load Image
 *
 * @param {String} src
 * @return {Object}
 */
function LoadImage(src) {
	const defer = $.Deferred();
	const image = new Image();

	image.addEventListener('load', () => defer.resolve());
	image.addEventListener('error', () => defer.reject('image load error'));
	image.src = src;

	return defer.promise();
}


export default LoadImage;