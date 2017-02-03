
function ImagesController(root) {

	this.$el = $(root.el).find('.slide-controller');
	this.$prev = this.$el.children('.btn-prev');
	this.$next = this.$el.children('.btn-next');

	/**
	 * prev
	 */
	this.prev = function()
	{
		root.images.prev();
	};

	/**
	 * next
	 */
	this.next = function()
	{
		root.images.next();
	};

	/**
	 * Control visible buttons
	 *
	 * @param {Number} current
	 */
	this.controlVisible = function(current)
	{
		if (current === 0)
		{
			this.$prev.addClass('hide');
		}
		else
		{
			this.$prev.removeClass('hide');
		}

		if (root.images.total-1 === current)
		{
			this.$next.addClass('hide');
		}
		else
		{
			this.$next.removeClass('hide');
		}
	};


	// initial events
	this.$prev.on('click', this.prev.bind(this));
	this.$next.on('click', this.next.bind(this));
}


export default ImagesController;