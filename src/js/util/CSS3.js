import $ from 'jquery';


/**
 * CSS3
 */
export default {

	eventNames : {
		WebkitTransition : 'webkitTransitionEnd',
		MozTransition    : 'transitionend',
		OTransition      : 'oTransitionEnd otransitionend',
		transition       : 'transitionend'
	},

	isSupport : function()
	{
		let el = document.createElement('div');
		for (let name in this.eventNames) {
			if (el.style[name] !== undefined) {
				return this.eventNames[name];
			}
		}
		el = null;
		return false;
	},

	transitionEnd : function(el, callback)
	{
		if (this.isSupport())
		{
			if (callback)
			{
				$(el).one(this.isSupport(), callback);
			}
		}
		else
		{
			if (callback) callback();
		}
	}
};