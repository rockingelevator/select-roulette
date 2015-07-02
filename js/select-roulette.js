(function($, undefined_) {
	var defaults = {
		//TODO
	};
 	$.fn.selectRoulette = function(settings){

 		settings = $.extend({}, defaults, settings);

 		return this.each(function(){
 			$(this).css('opacity', '0');
 			$("<div class='select-roulette-wrapper'><ul></ul><div class='fader'></div></div>")
 			.insertAfter(this);

 			var wrapper = $(this).next('.select-roulette-wrapper'),
				list = wrapper.children('ul'),
	
				WRAPPER_TOP = wrapper.offset().top,
				WRAPPER_MIDDLE = wrapper.outerHeight()/2,
				MIDDLE_FROM_TOP = WRAPPER_TOP + WRAPPER_MIDDLE,
				LIST_HEIGHT = list.outerHeight(),
				MOUSE_OVER = false,
				input = $(this);

			for(i in settings.data){
				list.append("<li>" + settings.data[i] + "</li>");
			}

			var item = list.children('li'),
				itemInnerHeight = item.innerHeight();
			

			//scrolling to default value
			var defaultValue, defItemInList = {};
			if(input.val()){
				defaultValue = input.val();
			}
			else if(data && data.length > 0){
				defaultValue = data[0];
			}
			//detecting default value in list
			var dItems = wrapper.find('li').filter(function(){
				return $(this).text() == defaultValue;
			});
			//selecting first one if there more than one
			if(dItems && dItems.length > 0)
				defItemInList = {
					element: dItems[0]
				};

			defItemInList.top = $(defItemInList.element).offset().top;
			list.css('margin-top', MIDDLE_FROM_TOP - defItemInList.top - itemInnerHeight/2);

			$('body').bind('mousewheel', function(e){
			  if(MOUSE_OVER){
			    if(e.preventDefault) { e.preventDefault(); } 
			    e.returnValue = false; 
			    return false; 
			  }
			});

			wrapper.mouseenter(function(){ MOUSE_OVER=true; });
			wrapper.mouseleave(function(){ MOUSE_OVER=false; });

			var scrollItems = function(direction){
					var position = 0;
					if(direction){
						//go up
						if((list.offset().top + list.height()) <= (MIDDLE_FROM_TOP + itemInnerHeight)){
							wrapper.on('mousewheel.transition', mousewheelTrigger);
							return;
						} else {
							position = list.offset().top - WRAPPER_TOP - itemInnerHeight - 1;	
						}
					}
					else {
						//go down
						if(list.offset().top >= (MIDDLE_FROM_TOP - itemInnerHeight)){
							wrapper.on('mousewheel.transition', mousewheelTrigger);
							return;
						} else {
							position = list.offset().top - WRAPPER_TOP + itemInnerHeight - 1;
						}
					}
					list.css('margin-top', position);
			};

			var mousewheelTrigger = function(e){
				wrapper.off('mousewheel.transition');
				var delta = e.originalEvent.deltaY;
				if(delta > 0){
					//go up
					scrollItems(1);
				}
				else{
					//go down
					scrollItems(0);
				}	
			};

			var setValue = function(){
				item.removeClass('selected');
				var selectedItem;
				var fItems = list.find('li').filter(function(){
					return $(this).offset().top >= (MIDDLE_FROM_TOP - itemInnerHeight - 1);
				});
				if(fItems && fItems.length > 0){
					selectedItem = fItems[0];
				}
				input.val($(selectedItem).text());
				$(selectedItem).addClass('selected');
			}

			list.on('webkitTransitionEnd transitionend', function (e) {
				setValue();
				wrapper.on('mousewheel.transition', mousewheelTrigger);
			});

			wrapper.on('mousewheel.transition', mousewheelTrigger);

 		});
 	};
 })(jQuery);

