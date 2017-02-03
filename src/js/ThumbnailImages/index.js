function ThumbnailImages(root) {

	this.$el = $(root.el).find('.thumbnail-images');
	this.$index = this.$el.children('.index');
	this.$buttons = this.$el.children('.button-area');


	const create = (src) => {
		const $ul = $('<ul>');

		src.forEach((o, k) => {
			$ul.append(`<li><button type="button" data-key="${k}" style="background-image: url('${o.image}')"></button></li>`);
		});

		return $ul;
	};

	/**
	 * Show
	 */
	this.show = function()
	{
		this.$el.addClass('active');
	};

	/**
	 * Hide
	 */
	this.hide = function()
	{
		this.$el.removeClass('active');
	};

	/**
	 * Select item
	 *
	 * @param {Number} n
	 */
	this.select = function(n)
	{
		const $items = this.$index.find('button');

		$items.removeClass('active');
		$items.eq(n).addClass('active');
	};

	/**
	 * Init
	 *
	 * @param {Array} model
	 */
	this.init = function(model)
	{
		this.$buttons.find('.btn-toggle').on('click', () => {
			setTimeout(() => {
				this.$el.toggleClass('active');
			}, 100);
		});

		// create index items element
		this.$index.append(create(model));

		// init items event
		this.$index.find('button').on('click', (e) => {
			root.images.go(parseInt($(e.currentTarget).data('key')));
		});

		// update thumbnail images select
		this.select(root.images.current);
	}
}


export default ThumbnailImages;