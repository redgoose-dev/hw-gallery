function Typography(root) {

	this.$el = $(root.el).find('.typography');
	this.$title = this.$el.children('h1');
	this.$description = this.$el.children('.description');
	this.$date = this.$el.children('.date');

	/**
	 * Update text
	 *
	 * @param {Number} current
	 */
	this.update = function(current=0)
	{
		const { title, description } = root.model[current];
		const date = new Date(root.model[current].date);

		this.$title.text(title);
		this.$description.text(description);
		this.$date.text(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
	};

}


export default Typography;