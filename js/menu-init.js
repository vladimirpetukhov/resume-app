function menu_init() {
	let base_url = window.location.pathname;
	let file_path = 'js/myjson.json';
	this._url = `${base_url}${file_path}`;

	menu_items = null;
	$.ajax({
		url: this._url,
		async: false,
		method: 'GET',
		dataType: 'json',
		success: res => {
			menu_items = res;
		},
	});
	this.menu = menu_items;
}

menu_init.prototype.get_file = function() {
	return this.menu;
};
