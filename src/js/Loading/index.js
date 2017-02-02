import $ from 'jquery';
import CSS3 from '../util/CSS3';


/**
 * Create loading element
 *
 * @return {Object}
 */
function createLoadingElement()
{
	const el = document.createElement('div');
	el.className = 'loading';

	const message = document.createElement('span');
	message.className = 'message';
	message.innerText = 'Loading...';

	el.appendChild(message);
	document.querySelector('main').appendChild(el);
}

function Loading() {

	this.el = document.querySelector('.loading');

	this.on = function()
	{
		console.log('on loading');
	};

	this.off = function(callback)
	{
		const $el = $(this.el);
		$el.addClass('out');
		CSS3.transitionEnd(this.el, () => {
			$el.remove();
			if (callback)
			{
				callback();
			}
		});
	};

	if (!this.el)
	{
		createLoadingElement();
	}
}


export default Loading;