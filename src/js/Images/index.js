import $ from 'jquery';
import loadImage from '../util/LoadImage';
import CSS3 from '../util/CSS3';


function Images(root, options) {

	const self = this;

	this.$el = $(root.el).find('.images');
	this.$ul = null;
	this.current = options.startSlide || 0;
	this.total = 0;

	this.positions = [];

	/**
	 * Create elements
	 *
	 * @param {Array} src
	 * @return {Object}
	 */
	const create = (src) => {
		const $ul = $('<ul>');
		$ul.css('width', `${this.total * 100}%`);

		src.forEach((o) => {
			$ul.append(`<li data-image="${o.image}"><figure></figure></li>`);
		});

		return $ul;
	};

	/**
	 * Save position
	 */
	const savePosition = () => {
		this.$ul.children('li').each(function(k){
			self.positions[k] = self.$el.width() * k;
		});
	};

	/**
	 * Init keyboard event
	 */
	const initKeyboardEvent = () => {
		$(window).on('keydown', (e) => {
			switch(e.keyCode) {
				case 37:
					this.prev();
					break;
				case 39:
					this.next();
					break;
			}
		});
	};

	/**
	 * On resize event
	 */
	const onResize = () => {
		this.$el.removeClass('animation');
		savePosition();
		this.changePosition(this.positions[this.current]);
	};

	/**
	 * Go slide
	 *
	 * @param {Number} n
	 */
	this.go = function(n)
	{
		const $currentElement = this.$el.find('li').eq(n);
		const src = $currentElement.data('image');

		if (!this.$el.hasClass('animation'))
		{
			this.$el.addClass('animation');
		}

		// callback slideBefore
		if (options.slideBefore)
		{
			options.slideBefore(this.current, n);
		}

		// set current number
		this.current = n;

		// loading image
		if (!$currentElement.hasClass('loaded'))
		{
			loadImage(src)
				.done(() => {
					$currentElement
						.addClass('loaded')
						.children().css('background-image', `url('${src}')`).addClass('show');
				})
				.fail((msg) => {
					console.log('ERROR:', msg);
				});
		}

		// change position
		this.changePosition(this.positions[n]);
	};

	this.changePosition = function(pos)
	{
		this.$ul.css({
			'-webkit-transform': 'translateX(-' + pos + 'px)',
			'transform': 'translateX(-' + pos + 'px)',
		});
	};

	/**
	 * Prev slide
	 */
	this.prev = function()
	{
		if (this.current === 0) return;
		this.go(this.current - 1);
	};

	/**
	 * Next slide
	 */
	this.next = function()
	{
		if (this.current === this.total - 1) return;
		this.go(this.current + 1);
	};

	/**
	 * init
	 *
	 * @param {Array} src
	 */
	this.init = function (src)
	{
		if (!src || !src.length)
		{
			if (options.fail) options.fail('not found data');
		}

		// set total slide
		this.total = src.length;

		// create element
		this.$ul = create(src);
		this.$el.append(this.$ul);

		// init resize event
		$(window)
			.on('resize.hwGallery', onResize)
			.trigger('resize.hwGallery');

		// init transitionEnd event
		this.$ul.on(CSS3.isSupport(), (e) => {
			if (e.target !== this.$ul.get(0)) return;

			if (options.slideAfter)
			{
				options.slideAfter(this.current);
			}
		});

		// init keyboard event
		initKeyboardEvent();

		// go to 0
		this.go(this.current);

		// set animation class
		this.$el.addClass('animation');

		// done
		options.done(this);
	}
}


export default Images;