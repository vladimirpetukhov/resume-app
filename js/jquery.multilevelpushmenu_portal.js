
(function ($) {
	$.fn.multilevelpushmenu = function (options) {
		return this.each(function () {
			var $this = $(this),
				$container = ($this.context != undefined) ? $this : $('body'),
				menusCounter = 0,
				menu = (options.menu != undefined) ? options.menu : $this.find('nav');

			var methods = function fun() { }

			// Settings
			var settings = $.extend({
				container: $container,
				containersToPush: null,
				direction: 'rtl',
				menuID: (($container.prop('id') != undefined && $container.prop('id') != '') ? $container.prop('id') : this.nodeName.toLowerCase()) + "_multilevelpushmenu",
				wrapperClass: 'multilevelpushmenu_wrapper ',
				menuInactiveClass: 'multilevelpushmenu_inactive',
				menu: menu,
				menuWidth: 350,
				menuHeight: 0,
				collapsed: false,
				backText: 'BACK',
				backItemClass: 'backItemClass d-flex justify-content-between',
				backItemIcon: '',
				groupIcon: 'fa fa-reorder',
				mode: 'overlap',
				overlapWidth: 60,
				backItemClassLegend: 'backItemClass d-flex justify-content-end'

			}, options);
console.log(settings.menu);

			function createSessionStoragebutton($mainWrapper) {
				var $toggler = $('<button />')
					.attr({ "class": "btn btn-primary p-0", "title": "Изчисти всички слоеве!" })
					.text('Изчисти всички')
					.css('width', '100%')
					.prependTo($mainWrapper);
				$toggler.click(() => {
					sessionStorage.clear();
					window.location.reload();
				})

			}


			// IE 8 and modern browsers, prevent event propagation
			function stopEventPropagation(e) {
				if (e.stopPropagation && e.preventDefault) {
					e.stopPropagation();
					e.preventDefault();
				}
				else {
					e.cancelBubble = true;
					e.returnValue = false;
				}
			}

			// Create DOM structure if it does not already exist within the container (input: array)
			function createDOMStructure() {
				var $mainWrapper = $("<nav />")
					.prop({ "id": settings.menuID, "className": settings.wrapperClass })
					.appendTo(settings.container);

				createNestedDOMStructure(settings.menu, $mainWrapper);
			}

			function createNestedDOMStructure(menus, $wrapper) {
				
				if (menus.level == undefined) menus.level = 0;
				var $levelHolder;
				$.each(menus, function () {
					
					$levelHolder = $("<div />")
						.attr({ "class": "levelHolderClass", "data-level": menus.level, "style": "left: " + ((menus.level == 0 && !settings.collapsed) ? 0 : "-200%") })
						.attr('data-title', this.title)
						.appendTo($wrapper);
					var extWidth = (isValidDim(settings.menuWidth) || (isInt(settings.menuWidth) && settings.menuWidth > 0));
					if (extWidth) $levelHolder.width(settings.menuWidth);
					var $title = $("<h2 />")
						.text(this.title)
						.appendTo($levelHolder);
					if (this.title === 'Resume') {
						var $titleAnchor = $("<a />")
							.prop({ "class": "floatRight cursorPointer tooltips" + ' ' + 'fa fa-reorder' })
							.prependTo($title);
						var $span = $('<span />')
							.text(this.title)
							.appendTo($titleAnchor);
						$titleAnchor.click(function (e) {
							titleIconClick(e, $levelHolder, menus);
						});
					}

					if (menus.level > 0) createBackItem($levelHolder, this.path, this.enabled);
					var $itemGroup = $("<ul />")
						.appendTo($levelHolder);
					$.each(this.items, function () {
						var $item = $("<li />")
							.attr({ 'class': 'd-flex justify-content-arround' })
							.appendTo($itemGroup);

						var $itemAnchor = $("<a />")
							.prop({ "href": this.link })
							.html(`\&nbsp;\&nbsp;\&nbsp;${this.name}`)
							.addClass(this.icon)
							.appendTo($item);
						
						//$titleIcon.click((e) => { zoom_to(e) });

						if (this.items) {
							$itemAnchor.click(function (e) {
								itemAnchorClick(e, $levelHolder, $item);
							});
							this.items.level = menus.level + 1;
							createNestedDOMStructure(this.items, $item);
						}
					})
				});


			}

			// Update DOM structure if it already exists in container (input: HTML markup)
			function updateDOMStructure() {
				var $mainWrapper = settings.menu;
				if ($mainWrapper.length == 0) return false;
				$mainWrapper.prop({ "id": settings.menuID, "className": settings.wrapperClass });
				updateNestedDOMStructure($mainWrapper);
			}

			function updateNestedDOMStructure($wrapper) {
				if ($wrapper.level == undefined) $wrapper.level = 0;
				$.each($wrapper, function () {
					var $levelHolder = $("<div />")
						.attr({ "class": "levelHolderClass", "data-level": $wrapper.level, "style": "left: " + (($wrapper.level == 0 && !settings.collapsed) ? 0 : "-200%") })
						.attr('data-title', this.title)
						.appendTo($wrapper);
					var extWidth = (isValidDim(settings.menuWidth) || (isInt(settings.menuWidth) && settings.menuWidth > 0));
					if (extWidth) $levelHolder.width(settings.menuWidth);
					var $title = $wrapper.children('h2');
					$title.appendTo($levelHolder);
					var $titleIcon = $title.children('i');
					$titleIcon.addClass("floatRight cursorPointer");
					$titleIcon.click(function (e) {
						titleIconClick(e, $levelHolder, $wrapper);
					});
					if ($wrapper.level > 0) createBackItem($levelHolder);
					var $itemGroup = $wrapper.children('ul');
					$itemGroup.appendTo($levelHolder);
					$.each($itemGroup.children('li'), function () {
						var $item = $(this);
						var $itemAnchor = $item.children('a');
						var $itemIcon = $itemAnchor.children('i');
						var $lableCheckBoxes = $itemAnchor.children('label');
						var $checkBoxes = $lableCheckBoxes.children('input');
						$itemIcon.addClass('floatRight');
						if ($item.children('ul').length > 0) {
							$itemAnchor.click(function (e) {
								itemAnchorClick(e, $levelHolder, $item);
							});
							createItemGroupIcon($itemAnchor);
							$item.level = $wrapper.level + 1;
							updateNestedDOMStructure($item);
						}
					})
				});
			}

			// Click event for title icon
			function titleIconClick(e, $levelHolder, menus) {

				if ($('.levelHolderClass').is(':animated')) return false;
				
				var ieShadowFilterDistortion;
				stopEventPropagation(e);
				if (menus.level == 0 && $levelHolder.position().left < 0) {
					settings.overlapWidth = 0;
					$levelHolder.removeClass(settings.menuInactiveClass);
					$levelHolder.animate({
						left: 0,
					}, function () {
						$levelHolder.find('ul').show(200);
					});
					pushContainers($levelHolder.width() - settings.overlapWidth);
					$levelHolder.css('visibility', 'visible');
					$levelHolder.find('.' + settings.backItemClass).css('visibility', 'visible');
					$levelHolder.find('ul').css('visibility', 'visible');
					$levelHolder.children('span').text('Затвори');
					$levelHolder.removeClass(settings.menuInactiveClass);
					$('h2#legend-table').css('visibility', 'hidden')
				}

				else {
					
					settings.overlapWidth = 40;
					var $nextLevelHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return (($(this).attr('data-level') > $levelHolder.attr('data-level')) && ($(this).position().left >= 0));
						});
					var $prevLevelHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return (($(this).attr('data-level') <= $levelHolder.attr('data-level')) && ($(this).position().left >= 0));
						});
					if ($nextLevelHolders.length == 0) {
						if (menus.level == 0) {
							$levelHolder.stop().animate({
								//40 if menu.colapssed is false
								left: ((-1) * $levelHolder.width() + settings.overlapWidth),

							}, function () {
								$levelHolder.find('ul').hide(400, function () {
									$levelHolder.addClass(settings.menuInactiveClass);
									
								});
							});
							pushContainers((-1) * $levelHolder.width() + settings.overlapWidth);
						}

					}
					else {
						$nextLevelHolders.each(function (key, val) {
							ieShadowFilterDistortion = ($(val).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $(val).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
							$(val).stop().animate({
								left: "-100%",
								width: $(val).width() - ($nextLevelHolders.length + $prevLevelHolders.length - $(val).attr('data-level') - 1) * (settings.overlapWidth + ieShadowFilterDistortion) - ieShadowFilterDistortion
							});
						});
						$prevLevelHolders.each(function (key, val) {
							ieShadowFilterDistortion = ($(val).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $(val).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
							$(val).stop().animate({
								width: $(val).width() - $nextLevelHolders.length * (settings.overlapWidth + ieShadowFilterDistortion) - ieShadowFilterDistortion
							});
							pushContainers((-1) * ($nextLevelHolders.length * (settings.overlapWidth + ieShadowFilterDistortion)));
						});

					}

					$levelHolder.css('visibility', 'visible');
					$levelHolder.find('.' + settings.backItemClass).css('visibility', 'visible');
					$levelHolder.find('ul').css('visibility', 'visible');

					$levelHolder.removeClass(settings.menuInactiveClass);
					if ($levelHolder.position().left = -260)
						setTimeout(() => {
							$('h2#legend-table').css('visibility', 'visible');
						}, 300);

				}

			}

			// Create Back item DOM elements
			function createBackItem($levelHolder, checkbox_path, enabled) {
				var $backItem = $("<div />")
					.attr({ "class": settings.backItemClass })
					.appendTo($levelHolder);
				var $backItemAnchor = $("<a />")
					.prop({ "href": "#" })
					.text(settings.backText)
					.appendTo($backItem);
				var $backItemcheckBoxes = $("<input />")
					.prop({ "value": "false" })
					.prop({ "class": "floatLeft " + this })
					.prop({ "checked": enabled })
					.prop({ "type": "checkbox" })
					.attr({ 'back-item': true });

				if (checkbox_path !== '') {
					$backItemcheckBoxes.attr('path', checkbox_path);
				}
				var $backItemlableCheckBoxes = $("<label />")
					.prop({ "class": "checkbox" })
					.prop({ "type": "checkbox" })
					.prependTo($backItem);

				var $backItemIcon = $("<i />")
					.prop({ "class": "floatRight " + settings.backItemIcon })
					.prependTo($backItemAnchor);
				$backItemAnchor.click(function (e) {
					backItemAnchorClick(e, $levelHolder);

				});
			}




			// Click event for back item
			function backItemAnchorClick(e, $levelHolder) {
				if ($('.levelHolderClass').is(':animated')) return false;
				var ieShadowFilterDistortion;
				stopEventPropagation(e);
				if (settings.mode == 'overlap') {
					var $visibleHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).position().left >= 0 && $(this) != $levelHolder);
						});
					$visibleHolders.each(function (key, val) {
						ieShadowFilterDistortion = ($(val).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $(val).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
						$(val).stop().animate({
							width: $(val).width() - settings.overlapWidth - (ieShadowFilterDistortion * 2)
						}, function () {
							$(val).removeClass(settings.menuInactiveClass)
						});
						pushContainers((-1) * (settings.overlapWidth + ieShadowFilterDistortion));
					});
					var $prevLevelHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).attr('data-level') == $levelHolder.attr('data-level') - 1);
						});
					$prevLevelHolders.css('visibility', 'visible');
					$prevLevelHolders.find('.' + settings.backItemClass).css('visibility', 'visible');
					$prevLevelHolders.find('ul').css('visibility', 'visible');
				}
				$levelHolder.stop().animate({
					left: "-100%",
					width: $levelHolder.width() - (ieShadowFilterDistortion * 2)
				});
			}

			// Click event for items
			function itemAnchorClick(e, $levelHolder, $item) {
				if ($('.levelHolderClass').is(':animated')) return false;

				if ($($levelHolder).children('#legend-table').has('.levelHolder')) {
					var $visibleHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).position().left >= 0 && $(this) != $levelHolder);
						});
					$visibleHolders.each(function (key, val) {
						ieShadowFilterDistortion = ($(val).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $(val).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
						$(val).stop().animate({
							width: $(val).width() + settings.overlapWidth
						}, function () {
							$(val).addClass(settings.menuInactiveClass);
						});
						pushContainers(settings.overlapWidth + ieShadowFilterDistortion);
					});
					var $nextLevelHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).attr('data-level') > $levelHolder.attr('data-level'));
						});
					$item.find('div:first')
						.removeClass(settings.menuInactiveClass)
						.stop().animate({
							left: 0,

						});
					let $ul = $item.find('div:first').find('ul');
					$($ul).css({ 'display': 'block' });
					return;
				}
				var ieShadowFilterDistortion;
				stopEventPropagation(e);

				if (settings.mode == 'overlap') {

					var $visibleHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).position().left >= 0 && $(this) != $levelHolder);
						});
					$visibleHolders.each(function (key, val) {
						ieShadowFilterDistortion = ($(val).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $(val).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
						$(val).stop().animate({
							width: $(val).width() + settings.overlapWidth
						}, function () {
							$(val).addClass(settings.menuInactiveClass);
						});
						pushContainers(settings.overlapWidth + ieShadowFilterDistortion);
					});
					var $nextLevelHolders = settings.container
						.find('#' + settings.menuID + ' div.levelHolderClass')
						.filter(function () {
							return ($(this).attr('data-level') > $levelHolder.attr('data-level'));
						});

					$visibleHolders.find('ul').css('visibility', 'hidden');
					$visibleHolders.find('.' + settings.backItemClass).css('visibility', 'hidden');
					$nextLevelHolders.css('visibility', 'visible');
					$nextLevelHolders.find('.' + settings.backItemClass).css('visibility', 'visible');
					$nextLevelHolders.find('ul').css('visibility', 'visible');

				}
				$item.find('div:first')
					.removeClass(settings.menuInactiveClass)
					.stop().animate({
						left: 0
					});
			}

			//Click group item
			function checkboxGroupItemOnclick(e) {
				let $clicked = $(e.target);

				if ($($clicked).is('input')) {
					e.stopPropagation();

					let state = $clicked.is(':checked');
					let current_path = $($clicked).attr('path');

					let layer_id = $clicked.attr('layer_id');
					if (layer_id) {
						$($clicked).prop('checked', state);
						update_clicked_state($clicked, current_path, state);
						map_layer_visibility(layer_id, state);
					} else {
						let same_path_chk = $(`input`).filter((i, element) => {

							if ($(element).attr('path')) {
								return $(element).attr('path').startsWith(current_path)
							}
						});
						$(same_path_chk).each((i, element) => {

							$(element).prop('checked', state);
							if ($(element).attr('layer_id')) {
								layer_id = $(element).attr('layer_id');
								update_clicked_state(element, $(element).attr('path'), state);
								map_layer_visibility(layer_id, state);
							} else {
								update_clicked_state(element, $(element).attr('path'), state);
							}

						});

						//let $child_chk = $clicked.context.parentNode.parentNode.parentNode.childNodes[1].childNodes[2].childNodes;
						//toggleCheckboxGroup($child_chk, $clicked, state);
					}
				}
			}

			//Click back item
			$(document).ready(() => {
				$('div.backItemClass').find('label[class=checkbox]').change((e) => {
					checkboxGroupItemOnclick(e);
				});
			});

			// Create item group DOM element
			function createItemGroupIcon($itemAnchor) {
				var $itemGroupIcon = $("<i />")
					.prop({ "class": "iconSpacing " + settings.groupIcon })
					.prependTo($itemAnchor);
			}

			// Sizing DOM elements per creation/update
			function sizeDOMelements() {
				var maxWidth = Math.max.apply(null,
					$('#' + settings.menuID + ' div.levelHolderClass').map(function () { return $(this).width(); }).get()),
					maxLevel = Math.max.apply(null,
						$('#' + settings.menuID + ' div.levelHolderClass').map(function () { return $(this).attr('data-level'); }).get()),
					maxExtWidth = maxWidth + maxLevel * settings.overlapWidth,
					maxHeight = Math.max.apply(null,
						$('#' + settings.menuID + ' div.levelHolderClass').map(function () { return $(this).height(); }).get());
				var extWidth = (isValidDim(settings.menuWidth) || (isInt(settings.menuWidth) && settings.menuWidth > 0)),
					extHeight = (isValidDim(settings.menuHeight) || (isInt(settings.menuHeight) && settings.menuHeight > 0));
				(extWidth) ? $('#' + settings.menuID + ' div.levelHolderClass').width(settings.menuWidth) : $('#' + settings.menuID + ' div.levelHolderClass').width(maxWidth);
				(extHeight) ? $('#' + settings.menuID).height(settings.menuHeight) : $('#' + settings.menuID).height(maxHeight);
				$container.width(maxExtWidth);
				$container.height(maxHeight);
			}

			// Initialize menu in collapsed/expanded mode 
			function startMode(mode) {

				if (mode) {
					$('#' + settings.menuID + ' div.levelHolderClass:first').find('ul').hide();
					$('#' + settings.menuID + ' div.levelHolderClass:first').addClass(settings.menuInactiveClass);
					$('#' + settings.menuID + ' div.levelHolderClass:first').stop().animate({
						left: ((-1) * $('#' + settings.menuID + ' div.levelHolderClass:first').width() + settings.overlapWidth)
					});
				}
			}

			// Push container(s) of choice
			function pushContainers(absMove) {

				if (settings.containersToPush == null) return false;
				$.each(settings.containersToPush, function () {
					$(this).stop().animate({
						marginLeft: $(this).offset().left - $(this).position().left + absMove
					});
				});
			}

			// Is integer
			function isInt(n) {
				return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
			}

			// Is Valid CSS dimension
			function isValidDim(s) {
				return typeof s === 'string' && (s.indexOf('%') != -1 || s.indexOf('px') != -1 || s.indexOf('em') != -1);
			}

			// Initialize menu level push menu
			var execute = (options.menu != undefined) ? createDOMStructure() : updateDOMStructure();
			var sizeElements = sizeDOMelements();
			var startMode = startMode(settings.collapsed);
		});

		function zoom_to(e) {

			var layer_id = [$(e.target).parent('li').find('input').attr('layer_id')];
			let isGroup = $(e.target).parent('li').find('a label input').first().attr('group_checkbox');

			if (isGroup === 'true') {
				layer_id = [];
				let childs_input = $(e.target).parent('li').children('div.levelHolderClass').find($('input'));

				for (var input of $(childs_input)) {
					if ($(input).attr('layer_id') != undefined && $(input).attr('layer_id') != null) {
						layer_id.push($(input).attr('layer_id'));
					}
				}


			}
			zoom_to_layer(layer_id);
		}

		//Update checkboxes state after page refresh
		function update_clicked_state($checkBoxes, current_path, state) {
			let dom = sessionStorage.getItem('jsonMenu');
			let dom_items = JSON.parse(dom);

			findDeep(dom_items[0].items, current_path, state);

			sessionStorage.setItem('jsonMenu', JSON.stringify(dom_items));

		}

		function findDeep(dom_items, current_path, state) {
			for (var e of dom_items) {
				if (e.path == current_path) {
					e.enabled = state;
				}
				else if (e.items) {
					findDeep(e.items, current_path, state);
				}
			}
		}

	}

}(jQuery));

