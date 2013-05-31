/// BEGIN #MESSAGES
Messages = function(){

	this.settings = new Object();
	this.settings.defaultMessageSelector = '#messages';
	var m = this;

	this.message = function(properties){
		var c = this;
		var type = properties['type'] || 'info',
		time = properties['time'] || -1,
		group = properties['group'] || '',
		text = properties['text'] || '',
		$container = properties['container'] || $(m.settings.defaultMessageSelector),
		useBootStrap = properties['useBootStrap'] || true;
		hideCloseButton = properties['hideCloseButton'] || false,
		this.hideSiblings = properties['hideSiblings'] || true,
		this.removeWhenHidden = properties['removeWhenHidden'] || false;
		var i = '<div class="item ' + (useBootStrap ? 'alert' : '') + '"><div class="message"></div><span id="options"><span style="display: none; margin: 0px 5px;" id="button" class="btn"></span><span> </span><span style="display: table-cell; margin: 0px 5px;" class="btn" id="close"><i class="icon-remove"></i></span></span></div>';
		var obj = $(i).data('msgObj', this); //jQuery object
		var timeout; //timeout object, not an integer!
		var closeButton = obj.find('#close');
		if (hideCloseButton)
			closeButton.css('display', 'none');

		closeButton.click(function(){
			c.hide();
		});

		if (properties.hasOwnProperty('button')){
			var b = obj.find('#button');
			try {
				b.text(properties.button.text);
			} catch (e) {

			}
			b.css('display', 'table-cell').click(function(){
				properties.button.do();
				c.hide(true);
			});
		}

		this.show = function(isUpdate){
			if (isUpdate === undefined) isUpdate = false;
			obj.hide().prependTo($container);
			if (this.hideSiblings){
				$container.find('.item').each(function(){
					if (!$(this).is(obj) && group !== '' && $(this).data('group') === group){
						var sib = $(this).data('msgObj');
						sib.hide(undefined, true);
					}
				});
			}		
			if (isUpdate)
				obj.show();
			else			
				obj.slideDown();

			if (time !== -1){
				timeout = setTimeout(function(){				
					c.hide();
				}, time);
			}
		};
		
		this.hide = function(noTriggers, noAnimation){
			var a = 'fast';
			if (noAnimation) a = 0;
			obj.slideUp(a, function(){
				if (c.removeWhenHidden)
					c.remove();
				if (noTriggers !== true) c.onhide();
			});
		};

		this.onhide = function(){};

		this.remove = function(){
			obj.remove();
			c.onremove();
		};

		this.onremove = function(){};

		this.setType = function(newType){
			if (newType !== undefined){
				newType = (useBootStrap ? 'alert-' : '') + newType;
				obj.removeClass(type).addClass(newType);
				if (type !== newType){
					type = newType;
					updated();
				}	
			}
		};

		this.setText = function(newText){
			if (newText !== undefined){	
				obj.find('.message').html(newText);
				if (typeof(setProperDirection) === "function") setProperDirection(obj, newText);
				if (text !== newText){
					text = newText;			
					updated();
				}
			}
		};

		this.setGroup = function(newGroup){
			if (newGroup !== undefined){
				if (group !== newGroup){
					group = newGroup;
					updated();
				}
				obj.data('group', group);
			}
		};

		this.setTime = function(newTime){
			if (newTime !== undefined){
				if (time !== newTime){
					time = newTime;			
					updated();
				}
			}
		};

		this.cancelHiding = function(){
			clearTimeout(timeout);
		}

		function updated(){
			c.cancelHiding();
			c.show(true);
			c.onupdate();
		} // called when any property is truely changed

		this.onupdate = function(){
			//for event handling
		};

		var initialize = function(){
			//excutes property-specific events
			c.update({text:text, type:type, group:group, time:time});
		}

		this.update = function(properties){
			//excutes property-specific events
			c.setText(properties['text']);
			c.setGroup(properties['group']);
			c.setType(properties['type']);
			c.setTime(properties['time']);
		}


		initialize();
	}; //message class

	this.showMessage = function(text_, type_, time_, group_, hideCloseButton_, container_) {
		var msg = new m.message({text:text_, type:type_, group:group_, time:time_, hideCloseButton:hideCloseButton_, container:container_});
		msg.show();
		return msg;
	}; //create a new message and show it


	this.updateMessage = function(item, properties) {
		var msg = $item.data('msgObj');
		msg.update(properties);
	}; //update message by DOM element

	this.hideMessages = function(group, $container) {
		if ($container === undefined) $container = $(m.settings.defaultMessageSelector);
		$container.find('.item').each(function() {
			var that = $(this);
			if (that.data('group') === group || group === '' || group === null){
				var msg = that.data('msgObj');
				msg.hide();
			}
		});
	}; //hide all messages belonging to a group or all messages if group is ''

	this.hideMessage = function($item) {		
		var msg = $item.data('msgObj');
		msg.hide();
	} // hide specific message

	$(document).ready(function(){
		$(m.settings.defaultMessageSelector).addClass('msgContainer');
	});}
var MessageViewer = new Messages();
/// END #MESSAGES