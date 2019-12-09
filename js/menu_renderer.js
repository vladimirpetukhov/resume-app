var jsonMenu = [];

function clear_empty_items(items_array) {
	for (var i = 0; i < items_array.length; i++) {
		var currentItem = items_array[i];

		if (currentItem.hasOwnProperty('items') && currentItem.items.length != 0) {
			clear_empty_items(currentItem.items);
		} else {
			delete currentItem.items;
			delete currentItem.title;
		}
	}
}

function categorize_items(items_array) {
	for (var i = 0; i < items_array.length; i++) {
		var currentItem = items_array[i];

		if (currentItem.hasOwnProperty('title') && currentItem.hasOwnProperty('name')) {
			var temp = {
				title: currentItem.name,
				link: '#',
				items: currentItem['items'],
				id: i,
			};

			temp.path = currentItem.path;

			currentItem['items'] = [temp];
			delete currentItem.title;
			categorize_items(currentItem.items);
		} else if (currentItem.hasOwnProperty('items')) {
			categorize_items(currentItem.items);
		}
	}
}

function add_menu_item(item_name, menu_array) {
	var menu_item = {
		title: item_name,
		name: item_name,
		items: [],
		link: '#',
	};
	menu_array.push(menu_item);
}

function menu_render(items) {
	
	var layers = items;
	var tree = [];
	var all_layers_list = [];
	for (i = 0; i < layers.length; i++) {
		var path = layers[i].Title.split('/');
		jsonMenu.push(path);
		var currentLevel = tree;
		for (var j = 0; j < path.length; j++) {
			var part = path[j];
			var existingPath = findWhere(currentLevel, 'name', part);

			if (existingPath) {
				currentLevel = existingPath.items;
			} else {
				var newPart = {
					name: part,
					title: part,
					items: [],
					link: layers[i].link,
					path: layers[i].url,
					layer_id: i,
					enabled: layers[i].EnabledOnLoad,
					icon: layers[i].icon,
				};
				for (let k = 0; k <= j; k++) {
					newPart.path = newPart.path + '/' + path[k];
				}
				all_layers_list.push(newPart);
				currentLevel.push(newPart);
				currentLevel = newPart.items;
			}
		}
	}

	editable_menu_tree(all_layers_list);

	tree = [
		{
			title: 'Resume',
			id: 'menuID',
			items: tree,
			icon: 'fas fa-layer-group',
		},
	];

	clear_empty_items(tree);
	categorize_items(tree);
	console.log(tree);
	return tree;
}

function findWhere(array, key, value) {
	// Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
	t = 0; // t is used as a counter
	while (t < array.length && array[t][key] !== value) {
		t++;
	} // find the index where the id is the as the aValue

	if (t < array.length) {
		return array[t];
	} else {
		return false;
	}
}

function get_style(name) {
	var _name = name;

	$.ajax({
		method: 'GET',
		url: `http://10.1.2.206:8080/geoserver/rest/workspaces/postgis/styles/${name}`,
		headers: {
			Authorization: 'Basic ' + btoa('admin' + ':' + 'lA@EH+{|-wDT*,mBz</fi%&3 '),
			'Access-Control-Allow-Origin': '*',
			Accept: 'application/vnd.ogc.sld+xml',
			'Content-Type': 'application/vnd.ogc.sld+xml',
			'X-Frame-Options': 'ALLOW-FROM *',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
		
	});
}

function getCenterExtents(layer_id) {
	let layers = wms_caps.get_layers();
	let ex_geographic_bounding_box = layers[layer_id].EX_GeographicBoundingBox;
	layer_center = [
		10000 * (ex_geographic_bounding_box[2] - (ex_geographic_bounding_box[2] - ex_geographic_bounding_box[0]) / 2),
		100000 * (ex_geographic_bounding_box[3] - (ex_geographic_bounding_box[3] - ex_geographic_bounding_box[1]) / 2),
	];
	return layer_center;
}
function editable_menu_tree(all_layers_list) {
	return all_layers_list;
}
//Use for create json data for drag and drop editable menu
// function arrangeIntoTree(paths) {

//     var tree = [];

//     for (var i = 0; i < paths.length; i++) {

//         var path = paths[i];
//         var currentLevel = tree;
//         for (var j = 0; j < path.length; j++) {
//             var part = path[j];

//             var existingPath = finder(path, 'name', part);

//             if (existingPath) {
//                 currentLevel = existingPath.children;
//             } else {
//                 var newPart = {
//                     name: part,
//                     children: [],
//                 }

//                 currentLevel.push(newPart);
//                 currentLevel = newPart.children;
//             }
//         }
//     }
//     console.log(tree);
//     return tree;
// }

// function finder(array, key, value) {

//     t = 0;
//     while (t < array.length && array[t][key] !== value) { t++; };

//     if (t < array.length) {
//         return array[t]
//     } else {
//         return false;
//     }
// }
