
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

	// initial events
	this.$prev.on('click', this.prev.bind(this));
	this.$next.on('click', this.next.bind(this));
}


export default ImagesController;