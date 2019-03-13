(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Select = factory());
}(this, (function () { 'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	function noop$1() {}

	function assign$1(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue$1(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function append$1(target, node) {
		target.appendChild(node);
	}

	function insert$1(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode$1(node) {
		node.parentNode.removeChild(node);
	}

	function createElement$1(name) {
		return document.createElement(name);
	}

	function createText$1(data) {
		return document.createTextNode(data);
	}

	function addListener$1(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener$1(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setStyle$1(node, key, value) {
		node.style.setProperty(key, value);
	}

	function addResizeListener$1(element, fn) {
		if (getComputedStyle(element).position === 'static') {
			element.style.position = 'relative';
		}

		const object = document.createElement('object');
		object.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
		object.type = 'text/html';

		let win;

		object.onload = () => {
			win = object.contentDocument.defaultView;
			win.addEventListener('resize', fn);
		};

		if (/Trident/.test(navigator.userAgent)) {
			element.appendChild(object);
			object.data = 'about:blank';
		} else {
			object.data = 'about:blank';
			element.appendChild(object);
		}

		return {
			cancel: () => {
				win && win.removeEventListener && win.removeEventListener('resize', fn);
				element.removeChild(object);
			}
		};
	}

	function destroyBlock$1(block, lookup) {
		block.d(1);
		lookup[block.key] = null;
	}

	function updateKeyedEach$1(old_blocks, component, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, intro_method, next, get_context) {
		var o = old_blocks.length;
		var n = list.length;

		var i = o;
		var old_indexes = {};
		while (i--) old_indexes[old_blocks[i].key] = i;

		var new_blocks = [];
		var new_lookup = {};
		var deltas = {};

		var i = n;
		while (i--) {
			var child_ctx = get_context(ctx, list, i);
			var key = get_key(child_ctx);
			var block = lookup[key];

			if (!block) {
				block = create_each_block(component, key, child_ctx);
				block.c();
			} else if (dynamic) {
				block.p(changed, child_ctx);
			}

			new_blocks[i] = new_lookup[key] = block;

			if (key in old_indexes) deltas[key] = Math.abs(i - old_indexes[key]);
		}

		var will_move = {};
		var did_move = {};

		function insert(block) {
			block[intro_method](node, next);
			lookup[block.key] = block;
			next = block.first;
			n--;
		}

		while (o && n) {
			var new_block = new_blocks[n - 1];
			var old_block = old_blocks[o - 1];
			var new_key = new_block.key;
			var old_key = old_block.key;

			if (new_block === old_block) {
				// do nothing
				next = new_block.first;
				o--;
				n--;
			}

			else if (!new_lookup[old_key]) {
				// remove old block
				destroy(old_block, lookup);
				o--;
			}

			else if (!lookup[new_key] || will_move[new_key]) {
				insert(new_block);
			}

			else if (did_move[old_key]) {
				o--;

			} else if (deltas[new_key] > deltas[old_key]) {
				did_move[new_key] = true;
				insert(new_block);

			} else {
				will_move[old_key] = true;
				o--;
			}
		}

		while (o--) {
			var old_block = old_blocks[o];
			if (!new_lookup[old_block.key]) destroy(old_block, lookup);
		}

		while (n) insert(new_blocks[n - 1]);

		return new_blocks;
	}

	function getSpreadUpdate$1(levels, updates) {
		var update = {};

		var to_null_out = {};
		var accounted_for = {};

		var i = levels.length;
		while (i--) {
			var o = levels[i];
			var n = updates[i];

			if (n) {
				for (var key in o) {
					if (!(key in n)) to_null_out[key] = 1;
				}

				for (var key in n) {
					if (!accounted_for[key]) {
						update[key] = n[key];
						accounted_for[key] = 1;
					}
				}

				levels[i] = n;
			} else {
				for (var key in o) {
					accounted_for[key] = 1;
				}
			}
		}

		for (var key in to_null_out) {
			if (!(key in update)) update[key] = undefined;
		}

		return update;
	}

	function blankObject$1() {
		return Object.create(null);
	}

	function destroy$1(detach) {
		this.destroy = noop$1;
		this.fire('destroy');
		this.set = noop$1;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs$1(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire$1(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush$1(component) {
		component._lock = true;
		callAll$1(component._beforecreate);
		callAll$1(component._oncreate);
		callAll$1(component._aftercreate);
		component._lock = false;
	}

	function get$1() {
		return this._state;
	}

	function init$1(component, options) {
		component._handlers = blankObject$1();
		component._slots = blankObject$1();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on$1(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set$1(newState) {
		this._set(assign$1({}, newState));
		if (this.root._lock) return;
		flush$1(this.root);
	}

	function _set$1(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign$1(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign$1(assign$1({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage$1(newState) {
		assign$1(this._staged, newState);
	}

	function callAll$1(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount$1(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto$1 = {
		destroy: destroy$1,
		get: get$1,
		fire: fire$1,
		on: on$1,
		set: set$1,
		_recompute: noop$1,
		_set: _set$1,
		_stage: _stage$1,
		_mount: _mount$1,
		_differs: _differs$1
	};

	/* src/VirtualList.html generated by Svelte v2.16.1 */

	function visible({ items, start, end }) {
		return items.slice(start, end).map((data, i) => {
			return { index: i + start, data };
		});
	}

	function data() {
		return {
			start: 0,
			end: 0,
			height: '100%',
			itemHeight: 0,
			_viewportHeight: 0,
			_top: 0,
			_bottom: 0,
			_props: {}
		};
	}
	var methods = {
		initialise() {
			const { items, itemHeight, _viewportHeight } = this.get();

			if (itemHeight) {
				this.heightMap = items.map(item => itemHeight);
				this.set({
					end: Math.min(items.length, Math.ceil(_viewportHeight / itemHeight)),
					_bottom: items.length * itemHeight
				});
			} else {
				let height = 0;
				let i = 0;

				while (height < _viewportHeight && i < items.length) {
					this.set({ end: i + 1 });
					
					if (this.rows.length === 0) return;

					const rowHeight = this.heightMap[i] = this.rows[i].offsetHeight;
					height += rowHeight;

					i += 1;
				}

				const end = i;
				const avg = Math.round(height / i);

				for (; i < items.length; i += 1) this.heightMap[i] = avg;

				this.set({
					_bottom: (items.length - end) * avg
				});
			}
		},

		refresh() {
			const { items, start, end, itemHeight, _viewportHeight } = this.get();
			const { scrollTop } = this.refs.viewport;

			let paddingTop = 0;
			let offset = 0;
			let i = 0;

			if (!itemHeight) {
				for (let v = 0; v < this.rows.length; v += 1) {
					this.heightMap[start + v] = this.rows[v].offsetHeight;
				}
			}

			for (; i < items.length; i += 1) {
				if (!(i in this.heightMap)) break;

				offset += this.heightMap[i];
				if (offset > scrollTop) break;

				paddingTop = offset;
			}

			const newStart = i++;

			for (; i < items.length; i += 1) {
				if (offset >= scrollTop + _viewportHeight) break;
				offset += this.heightMap[i];
			}

			const newEnd = i;

			if (newStart === start && newEnd === end) return;

			let paddingBottom = 0;
			for (; i < items.length; i += 1) paddingBottom += this.heightMap[i];

			this.set({
				_top: paddingTop,
				_bottom: paddingBottom,
				start: newStart,
				end: newEnd
			});

			if (newStart < start) {
				let d = 0;

				for (let i = newStart; i < start; i += 1) {
					const expectedHeight = this.heightMap[i];
					const actualHeight = this.rows[i - newStart].offsetHeight;

					d += actualHeight - expectedHeight;
				}

				this.refs.viewport.scrollTo(0, this.refs.viewport.scrollTop + d);
			}
		}
	};

	function oncreate() {
		const { items, _props } = this.get();
		const { container } = this.refs;

		const keys = Object.keys(this.options.data).filter(key => key !== 'items' && key !== 'component' && key !== 'height' && key !== 'itemHeight');
		if (keys.length) {
			const state = this.get();
			keys.forEach(key => {
				_props[key] = state[key];
			});
			this.set({ _props });
		}

		this.heightMap = [];
		this.rows = container.getElementsByClassName('row');

		if (items.length > 0) {
			this.initialise();
		}

		this.on('state', ({ changed, previous, current }) => {
			if (changed.items || changed.height || changed.itemHeight || changed._viewportHeight) {
				if (current.itemHeight && (changed.itemHeight || current.items.length > this.heightMap.length)) {
					this.heightMap = current.items.map(() => current.itemHeight);
				}

				else if (current.items.length > this.heightMap.length) {
					if (this.heightMap.length === 0) {
						this.initialise();
					} else {
						let height = 0;
						let i = 0;
						for (; i < this.heightMap.length; i += 1) height += this.heightMap[i];
						const avg = height / this.heightMap.length;
						for (; i < current.items.length; i += 1) this.heightMap[i] = avg;
					}
				}

				this.refresh();
			}

			if (keys.some(key => changed[key])) {
				const _props = {};
				keys.forEach(key => {
					_props[key] = current[key];
				});
				this.set({ _props });
			}
		});
	}
	function add_css() {
		var style = createElement$1("style");
		style.id = 'svelte-1xu8vv3-style';
		style.textContent = ".svelte-ref-viewport.svelte-1xu8vv3{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch}.row.svelte-1xu8vv3{overflow:hidden}";
		append$1(document.head, style);
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.item = list[i];
		return child_ctx;
	}

	function create_main_fragment(component, ctx) {
		var div1, div0, each_blocks_1 = [], each_lookup = blankObject$1(), div1_resize_listener;

		var each_value = ctx.visible;

		const get_key = ctx => ctx.item.index;

		for (var i = 0; i < each_value.length; i += 1) {
			let child_ctx = get_each_context(ctx, each_value, i);
			let key = get_key(child_ctx);
			each_blocks_1[i] = each_lookup[key] = create_each_block(component, key, child_ctx);
		}

		function div1_resize_handler() {
			component.set({ _viewportHeight: div1.offsetHeight });
		}

		function scroll_handler(event) {
			component.refresh();
		}

		return {
			c() {
				div1 = createElement$1("div");
				div0 = createElement$1("div");

				for (i = 0; i < each_blocks_1.length; i += 1) each_blocks_1[i].c();
				setStyle$1(div0, "padding-top", "" + ctx._top + "px");
				setStyle$1(div0, "padding-bottom", "" + ctx._bottom + "px");
				component.root._aftercreate.push(div1_resize_handler);
				addListener$1(div1, "scroll", scroll_handler);
				setStyle$1(div1, "height", ctx.height);
				div1.className = "svelte-1xu8vv3 svelte-ref-viewport";
			},

			m(target, anchor) {
				insert$1(target, div1, anchor);
				append$1(div1, div0);

				for (i = 0; i < each_blocks_1.length; i += 1) each_blocks_1[i].m(div0, null);

				component.refs.container = div0;
				div1_resize_listener = addResizeListener$1(div1, div1_resize_handler);
				component.refs.viewport = div1;
			},

			p(changed, ctx) {
				const each_value = ctx.visible;
				each_blocks_1 = updateKeyedEach$1(each_blocks_1, component, changed, get_key, 1, ctx, each_value, each_lookup, div0, destroyBlock$1, create_each_block, "m", null, get_each_context);

				if (changed._top) {
					setStyle$1(div0, "padding-top", "" + ctx._top + "px");
				}

				if (changed._bottom) {
					setStyle$1(div0, "padding-bottom", "" + ctx._bottom + "px");
				}

				if (changed.height) {
					setStyle$1(div1, "height", ctx.height);
				}
			},

			d(detach) {
				if (detach) {
					detachNode$1(div1);
				}

				for (i = 0; i < each_blocks_1.length; i += 1) each_blocks_1[i].d();

				if (component.refs.container === div0) component.refs.container = null;
				div1_resize_listener.cancel();
				removeListener$1(div1, "scroll", scroll_handler);
				if (component.refs.viewport === div1) component.refs.viewport = null;
			}
		};
	}

	// (3:2) {#each visible as item (item.index)}
	function create_each_block(component, key_1, ctx) {
		var div, text;

		var switch_instance_spread_levels = [
			ctx._props,
			ctx.item.data,
			{ item: ctx.item.data },
			{ items: ctx.items },
			{ i: ctx.item.index }
		];

		var switch_value = ctx.component;

		function switch_props(ctx) {
			var switch_instance_initial_data = {};
			for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
				switch_instance_initial_data = assign$1(switch_instance_initial_data, switch_instance_spread_levels[i]);
			}
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		function switch_instance_hover(event) {
			component.fire("hover", event);
		}

		if (switch_instance) switch_instance.on("hover", switch_instance_hover);
		function switch_instance_click(event) {
			component.fire("click", event);
		}

		if (switch_instance) switch_instance.on("click", switch_instance_click);

		return {
			key: key_1,

			first: null,

			c() {
				div = createElement$1("div");
				if (switch_instance) switch_instance._fragment.c();
				text = createText$1("\n\t\t\t");
				div.className = "row svelte-1xu8vv3";
				this.first = div;
			},

			m(target, anchor) {
				insert$1(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}

				append$1(div, text);
			},

			p(changed, ctx) {
				var switch_instance_changes = (changed._props || changed.visible || changed.items) ? getSpreadUpdate$1(switch_instance_spread_levels, [
					(changed._props) && ctx._props,
					(changed.visible) && ctx.item.data,
					(changed.visible) && { item: ctx.item.data },
					(changed.items) && { items: ctx.items },
					(changed.visible) && { i: ctx.item.index }
				]) : {};

				if (switch_value !== (switch_value = ctx.component)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, text);

						switch_instance.on("hover", switch_instance_hover);
						switch_instance.on("click", switch_instance_click);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}
			},

			d(detach) {
				if (detach) {
					detachNode$1(div);
				}

				if (switch_instance) switch_instance.destroy();
			}
		};
	}

	function VirtualList(options) {
		init$1(this, options);
		this.refs = {};
		this._state = assign$1(data(), options.data);

		this._recompute({ items: 1, start: 1, end: 1 }, this._state);
		this._intro = true;

		if (!document.getElementById("svelte-1xu8vv3-style")) add_css();

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(() => {
			oncreate.call(this);
			this.fire("update", { changed: assignTrue$1({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush$1(this);
		}
	}

	assign$1(VirtualList.prototype, proto$1);
	assign$1(VirtualList.prototype, methods);

	VirtualList.prototype._recompute = function _recompute(changed, state) {
		if (changed.items || changed.start || changed.end) {
			if (this._differs(state.visible, (state.visible = visible(state)))) changed.visible = true;
		}
	};

	/* src/Item.svelte generated by Svelte v2.15.3 */

	function create_main_fragment$1(component, ctx) {
		var div, raw_value = ctx.getOptionLabel(ctx.item);

		return {
			c() {
				div = createElement("div");
				div.className = "item";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				div.innerHTML = raw_value;
			},

			p(changed, ctx) {
				if ((changed.getOptionLabel || changed.item) && raw_value !== (raw_value = ctx.getOptionLabel(ctx.item))) {
					div.innerHTML = raw_value;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Item(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._fragment = create_main_fragment$1(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Item.prototype, proto);

	/* src/VirtualListItem.svelte generated by Svelte v2.15.3 */

	function itemClasses(hoverItemIndex, selectedValue, i, item) {
	    let isActive;
	    if (selectedValue) isActive = selectedValue.value === item.value;
	    const isHover = hoverItemIndex === i;
	    return `${isActive ? 'active' : ''} ${isHover ? 'hover' : ''}`
	}
	var methods$1 = {
	    handleHover(i) {
	        this.fire('hover', i);
	    },
	    handleClick(item, i, event) {
	        this.fire('click', { item, i, event });
	    }
	};

	function oncreate$1() {
	    // console.log('this.get() :', this.get());
	}
	function add_css$1() {
		var style = createElement("style");
		style.id = 'svelte-11husjc-style';
		style.textContent = ".listItem.svelte-11husjc{cursor:default;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.listItem.hover.svelte-11husjc{background:#e7f2ff}.listItem.svelte-11husjc:active{background:#b9daff}.listItem.svelte-11husjc:first-child{border-radius:4px 4px 0 0}.listItem.active.svelte-11husjc{background:#007aff;color:#fff}";
		append(document.head, style);
	}

	function create_main_fragment$2(component, ctx) {
		var div1, div0, raw_value = ctx.getOptionLabel(ctx.item), div1_class_value;

		function mouseover_handler(event) {
			component.handleHover(ctx.i);
		}

		function click_handler(event) {
			component.handleClick(ctx.item, ctx.i, event);
		}

		return {
			c() {
				div1 = createElement("div");
				div0 = createElement("div");
				div0.className = "item";
				addListener(div1, "mouseover", mouseover_handler);
				addListener(div1, "click", click_handler);
				div1.className = div1_class_value = "listItem " + itemClasses(ctx.hoverItemIndex, ctx.selectedValue, ctx.i, ctx.item) + " svelte-11husjc";
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				div0.innerHTML = raw_value;
			},

			p(changed, _ctx) {
				ctx = _ctx;
				if ((changed.getOptionLabel || changed.item) && raw_value !== (raw_value = ctx.getOptionLabel(ctx.item))) {
					div0.innerHTML = raw_value;
				}

				if ((changed.hoverItemIndex || changed.selectedValue || changed.i || changed.item) && div1_class_value !== (div1_class_value = "listItem " + itemClasses(ctx.hoverItemIndex, ctx.selectedValue, ctx.i, ctx.item) + " svelte-11husjc")) {
					div1.className = div1_class_value;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div1);
				}

				removeListener(div1, "mouseover", mouseover_handler);
				removeListener(div1, "click", click_handler);
			}
		};
	}

	function VirtualListItem(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-11husjc-style")) add_css$1();

		this._fragment = create_main_fragment$2(this, this._state);

		this.root._oncreate.push(() => {
			oncreate$1.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(VirtualListItem.prototype, proto);
	assign(VirtualListItem.prototype, methods$1);

	/* src/List.svelte generated by Svelte v2.15.3 */



	function data$1() {
	  return {
	    isVirtualList: false,
	    hoverItemIndex: 0,
	    optionIdentifier: 'value',
	    items: [],
	    Item,
	    VirtualListItem,
	    selectedValue: undefined,
	    getOptionLabel: (option) => { if (option) return option.label },
	    noOptionsMessage: 'No options',
	    getOptionString: (option) => option,
	    itemHeight: 40,
	    start: 0,
	    end: 0,
	  }
	}
	function itemClasses$1(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier) {
	  return `${selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
	}
	var methods$2 = {
	  handleSelect(item) {
	    this.fire('itemSelected', item);
	  },
	  handleHover(i) {
	    if(this.get().isScrolling) return;
	    this.set({hoverItemIndex: i});
	  },
	  handleClick(args) {
	    const {item, i, event} = args;
	    event.stopPropagation();
	    const {optionIdentifier, selectedValue} = this.get();
	    if(selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier]) return;
	    this.set({activeItemIndex: i, hoverItemIndex: i});
	    this.handleSelect(item);
	  },
	  updateHoverItem(increment) {
	    let {items, hoverItemIndex, isVirtualList} = this.get();
	    
	    if (isVirtualList) return;

	    if (increment > 0 && hoverItemIndex === (items.length - 1)) {
	      hoverItemIndex = 0;
	    }
	    else if (increment < 0 && hoverItemIndex === 0) {
	      hoverItemIndex = items.length - 1;
	    }
	    else {
	      hoverItemIndex = hoverItemIndex + increment;
	    }

	    this.set({hoverItemIndex});
	    this.scrollToActiveItem('hover', increment);
	  },
	  handleKeyDown(e) {
	    const {items, hoverItemIndex, optionIdentifier, selectedValue} = this.get();

	    switch (e.key) {
	      case 'ArrowDown':
	        e.preventDefault();
	        items.length && this.updateHoverItem(1);
	        break;
	      case 'ArrowUp':
	        e.preventDefault();
	        items.length && this.updateHoverItem(-1);
	        break;
	      case 'Enter':
	        e.preventDefault();
	        if(selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;
	        this.set({activeItemIndex: hoverItemIndex});
	        this.handleSelect(items[hoverItemIndex]);
	        break;
	      case 'Tab':
	        e.preventDefault();

	        this.set({activeItemIndex: hoverItemIndex});
	        this.handleSelect(items[hoverItemIndex]);
	        break;
	    }
	  },
	  scrollToActiveItem(className, increment) {
	    const {container} = this.refs;
	    let {isVirtualList, start, end, hoverItemIndex, items} = this.get();
	    
	    if (isVirtualList) return;

	    let offsetBounding;
	    const focusedElemBounding = container.querySelector(`.listItem.${className}`);

	    if (focusedElemBounding) {
	      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
	    }

	    container.scrollTop -= offsetBounding;

	    // isVirtualList and scrollToActiveItem WIP...
	    // if (isVirtualList & !focusedElemBounding) {
	    //   const virtualContainer = container.querySelector('div').querySelector('div');

	    //   if (increment > 0 && end < items.length ) {
	    //     start += 1;
	    //     end = start + 5;
	    //   }

	    //   if (end > hoverItemIndex && increment === -1) {
	    //     start -= 1;
	    //     end = start + 5;
	    //   }

	    //   if (end < hoverItemIndex && increment === -1) {
	    //     start = items.length - 5;
	    //     end = items.length;
	    //   }

	    //   if (hoverItemIndex === 0) {
	    //     start = 0;
	    //     end = 5;
	    //   }

	    //   this.set({
	    //     start,
	    //     end
	    //   })
	    // } else {
	    //  container.scrollTop -= offsetBounding;
	    // }
	  }
	};

	function oncreate$2() {
	  this.isScrollingTimer = 0;

	  this.refs.container.addEventListener('scroll', () => {
	    clearTimeout(this.isScrollingTimer);

	    this.set({
	      isScrolling: true
	    });

	    this.isScrollingTimer = setTimeout(() => {
	      this.set({
	        isScrolling: false
	      });
	    }, 100);
	  }, false);
	}
	function ondestroy() {
	  clearTimeout(this.isScrollingTimer);
	}
	function onupdate({changed, current}) {
	  if (changed.items && current.items.length > 0) {
	    this.set({
	        hoverItemIndex: 0
	    });
	  }
	  if (changed.activeItemIndex && current.activeItemIndex > -1) {
	    this.set({
	      hoverItemIndex: current.activeItemIndex,
	    });

	    this.scrollToActiveItem('active');
	  }
	  if (changed.selectedValue && current.selectedValue) {
	    this.scrollToActiveItem('active');

	    if (current.items && !current.isMulti) {
	      const hoverItemIndex = current.items.findIndex((item) => item[current.optionIdentifier] === current.selectedValue[current.optionIdentifier]);

	      if (hoverItemIndex) {
	        this.set({hoverItemIndex});
	      }
	    }
	  }
	}
	function add_css$2() {
		var style = createElement("style");
		style.id = 'svelte-1kpjgba-style';
		style.textContent = ".listContainer.svelte-1kpjgba{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;max-height:250px;min-height:100px;overflow-y:auto;background:#fff}.virtualList.svelte-1kpjgba{height:200px}.listGroupTitle.svelte-1kpjgba{color:#8f8f8f;cursor:default;font-size:12px;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:uppercase}.listItem.svelte-1kpjgba{cursor:default;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.listItem.hover.svelte-1kpjgba{background:#e7f2ff}.listItem.svelte-1kpjgba:active{background:#b9daff}.listItem.svelte-1kpjgba:first-child{border-radius:4px 4px 0 0}.listItem.active.svelte-1kpjgba{background:#007aff;color:#fff}.empty.svelte-1kpjgba{text-align:center;padding:20px 0;color:#78848F}";
		append(document.head, style);
	}

	function click_handler(event) {
		const { component, ctx } = this._svelte;

		component.handleClick({item: ctx.item, i: ctx.i, event});
	}

	function mouseover_handler(event) {
		const { component, ctx } = this._svelte;

		component.handleHover(ctx.i);
	}

	function get_each_context$1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.item = list[i];
		child_ctx.i = i;
		return child_ctx;
	}

	function create_main_fragment$3(component, ctx) {
		var text, if_block1_anchor;

		function onwindowkeydown(event) {
			component.handleKeyDown(event);	}
		window.addEventListener("keydown", onwindowkeydown);

		var if_block0 = (ctx.isVirtualList) && create_if_block_3(component, ctx);

		var if_block1 = (!ctx.isVirtualList) && create_if_block(component, ctx);

		return {
			c() {
				if (if_block0) if_block0.c();
				text = createText("\n\n");
				if (if_block1) if_block1.c();
				if_block1_anchor = createComment();
			},

			m(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert(target, if_block1_anchor, anchor);
			},

			p(changed, ctx) {
				if (ctx.isVirtualList) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_3(component, ctx);
						if_block0.c();
						if_block0.m(text.parentNode, text);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (!ctx.isVirtualList) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block(component, ctx);
						if_block1.c();
						if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}
			},

			d(detach) {
				window.removeEventListener("keydown", onwindowkeydown);

				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text);
				}

				if (if_block1) if_block1.d(detach);
				if (detach) {
					detachNode(if_block1_anchor);
				}
			}
		};
	}

	// (3:0) {#if isVirtualList}
	function create_if_block_3(component, ctx) {
		var div, virtuallist_updating = {};

		var virtuallist_initial_data = {
		 	items: ctx.items,
		 	component: ctx.VirtualListItem,
		 	getOptionLabel: ctx.getOptionLabel,
		 	itemHeight: ctx.itemHeight,
		 	hoverItemIndex: ctx.hoverItemIndex,
		 	selectedValue: ctx.selectedValue
		 };
		if (ctx.start 
	     !== void 0) {
			virtuallist_initial_data.start = ctx.start 
	    ;
			virtuallist_updating.start = true;
		}
		if (ctx.end
	   !== void 0) {
			virtuallist_initial_data.end = ctx.end
	  ;
			virtuallist_updating.end = true;
		}
		var virtuallist = new VirtualList({
			root: component.root,
			store: component.store,
			data: virtuallist_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!virtuallist_updating.start && changed.start) {
					newState.start = childState.start;
				}

				if (!virtuallist_updating.end && changed.end) {
					newState.end = childState.end;
				}
				component._set(newState);
				virtuallist_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			virtuallist._bind({ start: 1, end: 1 }, virtuallist.get());
		});

		virtuallist.on("hover", function(event) {
			component.handleHover(event);
		});
		virtuallist.on("click", function(event) {
			component.handleClick(event);
		});

		return {
			c() {
				div = createElement("div");
				virtuallist._fragment.c();
				div.className = "listContainer virtualList svelte-1kpjgba";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				virtuallist._mount(div, null);
				component.refs.container = div;
			},

			p(changed, _ctx) {
				ctx = _ctx;
				var virtuallist_changes = {};
				if (changed.items) virtuallist_changes.items = ctx.items;
				if (changed.VirtualListItem) virtuallist_changes.component = ctx.VirtualListItem;
				if (changed.getOptionLabel) virtuallist_changes.getOptionLabel = ctx.getOptionLabel;
				if (changed.itemHeight) virtuallist_changes.itemHeight = ctx.itemHeight;
				if (changed.hoverItemIndex) virtuallist_changes.hoverItemIndex = ctx.hoverItemIndex;
				if (changed.selectedValue) virtuallist_changes.selectedValue = ctx.selectedValue;
				if (!virtuallist_updating.start && changed.start) {
					virtuallist_changes.start = ctx.start 
	    ;
					virtuallist_updating.start = ctx.start 
	     !== void 0;
				}
				if (!virtuallist_updating.end && changed.end) {
					virtuallist_changes.end = ctx.end
	  ;
					virtuallist_updating.end = ctx.end
	   !== void 0;
				}
				virtuallist._set(virtuallist_changes);
				virtuallist_updating = {};
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				virtuallist.destroy();
				if (component.refs.container === div) component.refs.container = null;
			}
		};
	}

	// (20:0) {#if !isVirtualList}
	function create_if_block(component, ctx) {
		var div;

		var each_value = ctx.items;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$1(component, get_each_context$1(ctx, each_value, i));
		}

		var each_else = null;

		if (!each_value.length) {
			each_else = create_else_block(component, ctx);
			each_else.c();
		}

		return {
			c() {
				div = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				div.className = "listContainer svelte-1kpjgba";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}

				if (each_else) {
					each_else.m(div, null);
				}

				component.refs.container = div;
			},

			p(changed, ctx) {
				if (changed.hoverItemIndex || changed.items || changed.selectedValue || changed.optionIdentifier || changed.Item || changed.getOptionLabel || changed.hideEmptyState || changed.noOptionsMessage) {
					each_value = ctx.items;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$1(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$1(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}

				if (!each_value.length && each_else) {
					each_else.p(changed, ctx);
				} else if (!each_value.length) {
					each_else = create_else_block(component, ctx);
					each_else.c();
					each_else.m(div, null);
				} else if (each_else) {
					each_else.d(1);
					each_else = null;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				destroyEach(each_blocks, detach);

				if (each_else) each_else.d();

				if (component.refs.container === div) component.refs.container = null;
			}
		};
	}

	// (33:2) {:else}
	function create_else_block(component, ctx) {
		var if_block_anchor;

		var if_block = (!ctx.hideEmptyState) && create_if_block_2(component, ctx);

		return {
			c() {
				if (if_block) if_block.c();
				if_block_anchor = createComment();
			},

			m(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
			},

			p(changed, ctx) {
				if (!ctx.hideEmptyState) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_2(component, ctx);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},

			d(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(if_block_anchor);
				}
			}
		};
	}

	// (34:4) {#if !hideEmptyState}
	function create_if_block_2(component, ctx) {
		var div, text;

		return {
			c() {
				div = createElement("div");
				text = createText(ctx.noOptionsMessage);
				div.className = "empty svelte-1kpjgba";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
			},

			p(changed, ctx) {
				if (changed.noOptionsMessage) {
					setData(text, ctx.noOptionsMessage);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (23:4) {#if item.groupValue}
	function create_if_block_1(component, ctx) {
		var div, text_value = ctx.item.groupValue, text;

		return {
			c() {
				div = createElement("div");
				text = createText(text_value);
				div.className = "listGroupTitle svelte-1kpjgba";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
			},

			p(changed, ctx) {
				if ((changed.items) && text_value !== (text_value = ctx.item.groupValue)) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (22:2) {#each items as item, i}
	function create_each_block$1(component, ctx) {
		var text0, div, text1, div_class_value;

		var if_block = (ctx.item.groupValue) && create_if_block_1(component, ctx);

		var switch_value = ctx.Item;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	item: ctx.item,
			 	getOptionLabel: ctx.getOptionLabel
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		return {
			c() {
				if (if_block) if_block.c();
				text0 = createText("\n\n    ");
				div = createElement("div");
				if (switch_instance) switch_instance._fragment.c();
				text1 = createText("\n    ");
				div._svelte = { component, ctx };

				addListener(div, "mouseover", mouseover_handler);
				addListener(div, "click", click_handler);
				div.className = div_class_value = "listItem " + itemClasses$1(ctx.hoverItemIndex, ctx.item, ctx.i, ctx.items, ctx.selectedValue, ctx.optionIdentifier) + " svelte-1kpjgba";
			},

			m(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, text0, anchor);
				insert(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}

				append(div, text1);
			},

			p(changed, _ctx) {
				ctx = _ctx;
				if (ctx.item.groupValue) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_1(component, ctx);
						if_block.c();
						if_block.m(text0.parentNode, text0);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				var switch_instance_changes = {};
				if (changed.items) switch_instance_changes.item = ctx.item;
				if (changed.getOptionLabel) switch_instance_changes.getOptionLabel = ctx.getOptionLabel;

				if (switch_value !== (switch_value = ctx.Item)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, text1);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}

				div._svelte.ctx = ctx;
				if ((changed.hoverItemIndex || changed.items || changed.selectedValue || changed.optionIdentifier) && div_class_value !== (div_class_value = "listItem " + itemClasses$1(ctx.hoverItemIndex, ctx.item, ctx.i, ctx.items, ctx.selectedValue, ctx.optionIdentifier) + " svelte-1kpjgba")) {
					div.className = div_class_value;
				}
			},

			d(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(text0);
					detachNode(div);
				}

				if (switch_instance) switch_instance.destroy();
				removeListener(div, "mouseover", mouseover_handler);
				removeListener(div, "click", click_handler);
			}
		};
	}

	function List(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data$1(), options.data);
		this._intro = true;
		this._handlers.update = [onupdate];

		this._handlers.destroy = [ondestroy];

		if (!document.getElementById("svelte-1kpjgba-style")) add_css$2();

		this._fragment = create_main_fragment$3(this, this._state);

		this.root._oncreate.push(() => {
			oncreate$2.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(List.prototype, proto);
	assign(List.prototype, methods$2);

	/* src/Selection.svelte generated by Svelte v2.15.3 */

	function create_main_fragment$4(component, ctx) {
		var div, raw_value = ctx.getSelectionLabel(ctx.item);

		return {
			c() {
				div = createElement("div");
				div.className = "selection";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				div.innerHTML = raw_value;
			},

			p(changed, ctx) {
				if ((changed.getSelectionLabel || changed.item) && raw_value !== (raw_value = ctx.getSelectionLabel(ctx.item))) {
					div.innerHTML = raw_value;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Selection(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._fragment = create_main_fragment$4(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Selection.prototype, proto);

	/* src/MultiSelection.svelte generated by Svelte v2.15.3 */

	var methods$3 = {
	  handleClear(i, event) {
	    event.stopPropagation();
	    this.fire('multiItemClear', {i});
	  }
	};

	function add_css$3() {
		var style = createElement("style");
		style.id = 'svelte-hjmdgm-style';
		style.textContent = ".multiSelectItem.svelte-hjmdgm{background:#EBEDEF;margin-right:5px;border-radius:16px;line-height:32px;display:flex;cursor:default;height:32px;margin-top:5px;padding:0 10px 0 15px}.multiSelectItem_label.svelte-hjmdgm{margin-right:5px}.multiSelectItem_clear.svelte-hjmdgm{border-radius:0 4px 4px 0;width:20px;text-align:center}.multiSelectItem.svelte-hjmdgm:hover,.multiSelectItem.active.svelte-hjmdgm{background-color:#006FFF;color:#fff}.multiSelectItem.disabled.svelte-hjmdgm:hover{background:#EBEDEF;color:#C1C6CC}.multiSelectItem_clear.svelte-hjmdgm{border-radius:50%;background:#52616F;width:16px;height:16px;position:relative;top:8px;text-align:center;padding:1px}.multiSelectItem_clear.svelte-hjmdgm:hover,.active.svelte-hjmdgm .multiSelectItem_clear.svelte-hjmdgm{background:#fff}.multiSelectItem_clear.svelte-hjmdgm:hover svg.svelte-hjmdgm,.active.svelte-hjmdgm .multiSelectItem_clear svg.svelte-hjmdgm{fill:#006FFF}.multiSelectItem_clear.svelte-hjmdgm svg.svelte-hjmdgm{fill:#EBEDEF;vertical-align:top}";
		append(document.head, style);
	}

	function click_handler$1(event) {
		const { component, ctx } = this._svelte;

		component.handleClear(ctx.i, event);
	}

	function get_each_context$2(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.value = list[i];
		child_ctx.i = i;
		return child_ctx;
	}

	function create_main_fragment$5(component, ctx) {
		var each_anchor;

		var each_value = ctx.selectedValue;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$2(component, get_each_context$2(ctx, each_value, i));
		}

		return {
			c() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insert(target, each_anchor, anchor);
			},

			p(changed, ctx) {
				if (changed.activeSelectedValue || changed.isDisabled || changed.getSelectionLabel || changed.selectedValue) {
					each_value = ctx.selectedValue;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$2(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$2(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d(detach) {
				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}
			}
		};
	}

	// (6:2) {#if !isDisabled}
	function create_if_block$1(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-hjmdgm"><path d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
				div._svelte = { component, ctx };

				addListener(div, "click", click_handler$1);
				div.className = "multiSelectItem_clear svelte-hjmdgm";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			p(changed, _ctx) {
				ctx = _ctx;
				div._svelte.ctx = ctx;
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler$1);
			}
		};
	}

	// (1:0) {#each selectedValue as value, i}
	function create_each_block$2(component, ctx) {
		var div1, div0, text0_value = ctx.getSelectionLabel(ctx.value), text0, text1, text2, div1_class_value;

		var if_block = (!ctx.isDisabled) && create_if_block$1(component, ctx);

		return {
			c() {
				div1 = createElement("div");
				div0 = createElement("div");
				text0 = createText(text0_value);
				text1 = createText("\n  ");
				if (if_block) if_block.c();
				text2 = createText("\n");
				div0.className = "multiSelectItem_label svelte-hjmdgm";
				div1.className = div1_class_value = "multiSelectItem " + (ctx.activeSelectedValue === ctx.i ? 'active' : '') + " " + (ctx.isDisabled ? 'disabled' : '') + " svelte-hjmdgm";
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				append(div0, text0);
				append(div1, text1);
				if (if_block) if_block.m(div1, null);
				append(div1, text2);
			},

			p(changed, ctx) {
				if ((changed.getSelectionLabel || changed.selectedValue) && text0_value !== (text0_value = ctx.getSelectionLabel(ctx.value))) {
					setData(text0, text0_value);
				}

				if (!ctx.isDisabled) {
					if (!if_block) {
						if_block = create_if_block$1(component, ctx);
						if_block.c();
						if_block.m(div1, text2);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if ((changed.activeSelectedValue || changed.isDisabled) && div1_class_value !== (div1_class_value = "multiSelectItem " + (ctx.activeSelectedValue === ctx.i ? 'active' : '') + " " + (ctx.isDisabled ? 'disabled' : '') + " svelte-hjmdgm")) {
					div1.className = div1_class_value;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div1);
				}

				if (if_block) if_block.d();
			}
		};
	}

	function MultiSelection(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-hjmdgm-style")) add_css$3();

		this._fragment = create_main_fragment$5(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(MultiSelection.prototype, proto);
	assign(MultiSelection.prototype, methods$3);

	function isOutOfViewport(elem) {
	  const bounding = elem.getBoundingClientRect();
	  const out = {};

	  out.top = bounding.top < 0;
	  out.left = bounding.left < 0;
	  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	  out.any = out.top || out.left || out.bottom || out.right;

	  return out;
	}

	/* src/Select.svelte generated by Svelte v2.15.3 */



	function containerClasses({isMulti, isDisabled, isFocused}) {
	  let classes = `selectContainer`;
	  classes += isMulti ? ' multiSelect' : '';
	  classes += isDisabled ? ' disabled' : '';
	  classes += isFocused ? ' focused' : '';

	  return classes;
	}
	function showSelectedItem({selectedValue, filterText}) {
	  return selectedValue && filterText.length === 0;
	}
	function placeholderText({selectedValue, placeholder}) {
	  return selectedValue ? '' : placeholder
	}
	function filteredItems({items, filterText, groupBy, groupFilter, getOptionLabel, isMulti, selectedValue, optionIdentifier, loadOptions}) {
	  

	  if (items && items.length > 0 && typeof items[0] !== 'object') {
	    items = items.map((item, index) => {
	      return {
	        index,
	        value: item,
	        label: item
	      }
	    });
	  }


	  const filteredItems = loadOptions ? items : items.filter(item => {
	    let keepItem = true;

	    if (isMulti && selectedValue) {
	      keepItem = !selectedValue.find(({value}) => {
	        return value === item[optionIdentifier]
	      });
	    }

	    if (keepItem && filterText.length < 1) return true;
	    return keepItem && getOptionLabel(item).toLowerCase().includes(filterText.toLowerCase());
	  });

	  if (groupBy) {
	    const groupValues = [];
	    const groups = {};

	    filteredItems.forEach((item) => {
	      const groupValue = groupBy(item);

	      if (!groupValues.includes(groupValue)) {
	        groupValues.push(groupValue);
	        groups[groupValue] = [];
	        groups[groupValue].push(Object.assign({groupValue}, item));
	      } else {
	        groups[groupValue].push(Object.assign({}, item));
	      }

	      groups[groupValue].push();
	    });

	    const sortedGroupedItems = [];

	    groupFilter(groupValues).forEach((groupValue) => {
	      sortedGroupedItems.push(...groups[groupValue]);
	    });

	    return sortedGroupedItems;
	  }

	  return filteredItems;
	}
	function data$2() {
	  return {
	    containerStyles: undefined,
	    Item,
	    Selection,
	    MultiSelection,
	    items: [],
	    filterText: '',
	    placeholder: 'Select...',
	    listPlacement: 'auto',
	    listOpen: false,
	    list: undefined,
	    target: undefined,
	    selectedValue: undefined,
	    activeSelectedValue: undefined,
	    isClearable: true,
	    isMulti: false,
	    isSearchable: true,
	    isDisabled: false,
	    isVirtualList: false,
	    optionIdentifier: 'value',
	    groupBy: undefined,
	    loadOptions: undefined,
	    loadOptionsInterval: 200,
	    noOptionsMessage: 'No options',
	    hideEmptyState: false,
	    groupFilter: (groups) => groups,
	    getOptionLabel: (option) => {
	      if (option) return option.label
	     },
	    getSelectionLabel: (option) => option.label,
	  }
	}
	var methods$4 = {
	  handleMultiItemClear(i) {
	    const {selectedValue} = this.get();
	    selectedValue.splice(i, 1);
	    this.set({selectedValue: selectedValue.length > 0 ? selectedValue : undefined});
	    this.getPosition();
	  },
	  getPosition() {
	    const {listPlacement, target} = this.get();

	    if (!target) return;
	    const {top, height, width} = this.refs.container.getBoundingClientRect();

	    target.style['min-width'] = `${width}px`;
	    target.style.width = `auto`;
	    target.style.left = '0';

	    if(listPlacement === 'top') {
	      target.style.bottom = `${height + 5}px`;
	    } else {
	      target.style.top = `${height + 5}px`;
	    }

	    this.set({target});

	    if(listPlacement === 'auto' && isOutOfViewport(target).bottom) {
	      target.style.top = ``;
	      target.style.bottom = `${height + 5}px`;
	    }

	    target.style.visibility = '';
	  },
	  handleKeyDown(e) {
	    let {isFocused, listOpen, selectedValue, filterText, isMulti, activeSelectedValue, list} = this.get();
	    if (!isFocused) return;

	    switch (e.key) {
	      case 'ArrowDown':
	        e.preventDefault();
	        this.set({listOpen: true, activeSelectedValue: undefined});
	        break;
	      case 'ArrowUp':
	        e.preventDefault();
	        this.set({listOpen: true, activeSelectedValue: undefined});
	        break;
	      case 'Tab':
	        if (!listOpen) this.set({isFocused: false});
	        break;
	      case 'Backspace':
	        if (!isMulti || filterText.length > 0) return;
	        this.handleMultiItemClear(activeSelectedValue !== undefined ? activeSelectedValue : selectedValue.length - 1);
	        if (activeSelectedValue === 0) break;
	        this.set({activeSelectedValue: selectedValue.length > activeSelectedValue ? activeSelectedValue - 1 : undefined });
	        break;
	      case 'ArrowLeft':
	        if (list) list.set({ hoverItemIndex: -1});  
	        if (!isMulti || filterText.length > 0) return;

	        if (activeSelectedValue === undefined) {
	          activeSelectedValue = selectedValue.length - 1;
	        } else if (selectedValue.length > activeSelectedValue && activeSelectedValue !== 0) {
	          activeSelectedValue -= 1;
	        }
	        this.set({activeSelectedValue});
	        break;
	      case 'ArrowRight':
	        if (list) list.set({ hoverItemIndex: -1});
	        if (!isMulti || filterText.length > 0 || activeSelectedValue === undefined) return;
	        if (activeSelectedValue === selectedValue.length - 1) {
	          activeSelectedValue = undefined;
	        } else if (activeSelectedValue < selectedValue.length - 1) {
	          activeSelectedValue += 1;
	        }
	        this.set({activeSelectedValue});
	        break;
	    }
	  },
	  handleFocus() {
	    this.set({isFocused: true});
	    if (this.refs.input) this.refs.input.focus();
	  },
	  removeList() {
	    let {list, target} = this.get();
	    this.set({filterText: '', activeSelectedValue: undefined});

	    if (!list) return;
	    list.destroy();
	    list = undefined;

	    if (!target) return;
	    target.parentNode.removeChild(target);
	    target = undefined;

	    this.set({list, target});
	  },
	  handleWindowClick(event) {
	    if (!this.refs.container) return;
	    if (this.refs.container.contains(event.target)) return;
	    this.set({isFocused: false, listOpen: false, activeSelectedValue: undefined});
	    if (this.refs.input) this.refs.input.blur();
	  },
	  handleClick() {
	    const {isDisabled, listOpen} = this.get();
	    if (isDisabled) return;
	    this.set({isFocused: true, listOpen: !listOpen});
	  },
	  handleClear(e) {
	    e.stopPropagation();
	    this.set({selectedValue: undefined, listOpen: false});
	    this.handleFocus();
	    this.fire('clear');
	  },
	  loadList() {
	    let {
	      target,
	      list, 
	      Item: Item$$1, 
	      getOptionLabel,
	      optionIdentifier,
	      noOptionsMessage, 
	      hideEmptyState,
	      items,
	      selectedValue,
	      filteredItems,
	      isMulti,
	      isVirtualList } = this.get();
	    if (target && list) return;

	    const data = {Item: Item$$1, optionIdentifier, noOptionsMessage, hideEmptyState, isVirtualList};

	    if (getOptionLabel) {
	      data.getOptionLabel = getOptionLabel;
	    }

	    target = document.createElement('div');

	    Object.assign(target.style, {
	      position: 'absolute',
	      'z-index': 2,
	      'visibility': 'hidden'
	    });

	    this.set({list, target});
	    this.refs.container.appendChild(target);

	    list = new List({
	      target,
	      data
	    });

	    if (items) {
	      list.set({items: filteredItems, selectedValue, isMulti});
	    }

	    list.on('itemSelected', (newSelection) => {          
	      if (newSelection) {
	        const item = Object.assign({}, newSelection);

	        if (isMulti) {
	          selectedValue = selectedValue ? selectedValue.concat([item]) : [item];
	        } else {
	          selectedValue = item;
	        }

	        this.set({
	          selectedValue,
	          listOpen: false,
	          activeSelectedValue: undefined
	        });
	      }
	    });

	    this.set({list, target});
	    this.getPosition();
	  }
	};

	function oncreate$3() {
	  const {isFocused,listOpen} = this.get();
	  this.loadOptionsTimeout = undefined;

	  if (isFocused) this.refs.input.focus();
	  if (listOpen) this.loadList();
	}
	function ondestroy$1() {
	  this.removeList();
	}
	function onstate({changed, current, previous}) {
	  if (!previous) return;

	  if (!current.isMulti && changed.selectedValue && current.selectedValue) {    
	    if (!previous.selectedValue || JSON.stringify(current.selectedValue[current.optionIdentifier]) != JSON.stringify(previous.selectedValue[current.optionIdentifier])) {
	      this.fire('select', current.selectedValue);
	    }
	  }

	  if (current.isMulti && JSON.stringify(current.selectedValue) != JSON.stringify(previous.selectedValue)) {
	    this.fire('select', current.selectedValue);
	  }

	  if (changed.listOpen) {
	    if (current.listOpen) {
	      this.loadList();
	    } else {
	      this.removeList();
	    }
	  }
	  if (changed.filterText) {
	    if(current.loadOptions) {
	      clearTimeout(this.loadOptionsTimeout);
	      this.set({isWaiting:true});

	      this.loadOptionsTimeout = setTimeout(() => {
	          current.loadOptions(current.filterText).then((response) => {
	            this.set({ items: response });
	          }, () => {
	            this.set({ items: [] });
	          })
				  .catch(() => {  this.set({ items: [] }); });
	        this.set({isWaiting:false});
	        this.set({listOpen: true});
	      }, current.loadOptionsInterval);
	    } else {
	      this.loadList();
	      this.set({listOpen: true});

	      if (current.isMulti) {
	        this.set({activeSelectedValue: undefined});
	      }
	    }
	  }

	  if (changed.isFocused) {
	    const {isFocused} = current;
	    if (isFocused) {
	      this.handleFocus();
	    } else {
	      this.set({filterText: ''});
	      if (this.refs.input) this.refs.input.blur();
	    }
	  }

	  if (changed.filteredItems && current.list) {
	    current.list.set({items: current.filteredItems});
	  }
	}
	function add_css$4() {
		var style = createElement("style");
		style.id = 'svelte-hw8jyz-style';
		style.textContent = ".selectContainer.svelte-hw8jyz{border:1px solid #D8DBDF;border-radius:3px;height:44px;position:relative;display:flex;padding:0 16px;background:#fff}.selectContainer.svelte-hw8jyz input.svelte-hw8jyz{cursor:default;border:none;color:#3F4F5F;height:42px;line-height:42px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px;position:absolute;left:0}.selectContainer.svelte-hw8jyz input.svelte-hw8jyz::placeholder{color:#78848F}.selectContainer.svelte-hw8jyz input.svelte-hw8jyz:focus{outline:none}.selectContainer.svelte-hw8jyz:hover{border-color:#b2b8bf}.selectContainer.focused.svelte-hw8jyz{border-color:#006FE8}.selectContainer.disabled.svelte-hw8jyz{background:#F6F7F8;border-color:#F6F7F8;color:#C1C6CC}.selectContainer.disabled.svelte-hw8jyz input.svelte-hw8jyz::placeholder{color:#C1C6CC}.selectedItem.svelte-hw8jyz{line-height:42px;height:42px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;padding-right:20px}.selectedItem.svelte-hw8jyz:focus{outline:none}.clearSelect.svelte-hw8jyz{position:absolute;right:10px;top:11px;bottom:11px;width:20px;color:#c5cacf;flex:none !important}.clearSelect.svelte-hw8jyz:hover{color:#2c3e50}.selectContainer.focused.svelte-hw8jyz .clearSelect.svelte-hw8jyz{color:#3F4F5F}.indicator.svelte-hw8jyz{position:absolute;right:10px;top:11px;width:20px;height:20px;color:#c5cacf}.indicator.svelte-hw8jyz svg.svelte-hw8jyz{display:inline-block;fill:currentcolor;line-height:1;stroke:currentcolor;stroke-width:0}.spinner.svelte-hw8jyz{position:absolute;right:10px;top:11px;width:20px;height:20px;color:#51ce6c;animation:svelte-hw8jyz-rotate 0.75s linear infinite}.spinner_icon.svelte-hw8jyz{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-hw8jyz{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-hw8jyz{display:flex;padding:0 35px 0 16px;height:auto;flex-wrap:wrap}.multiSelect.svelte-hw8jyz>.svelte-hw8jyz{flex:1 1 50px}.selectContainer.multiSelect.svelte-hw8jyz input.svelte-hw8jyz{padding:0;position:relative}@keyframes svelte-hw8jyz-rotate{100%{transform:rotate(360deg)}}";
		append(document.head, style);
	}

	function create_main_fragment$6(component, ctx) {
		var div, text0, input, input_updating = false, input_readonly_value, text1, text2, text3, text4;

		function onwindowclick(event) {
			component.handleWindowClick(event);	}
		window.addEventListener("click", onwindowclick);

		function onwindowkeydown(event) {
			component.handleKeyDown(event);	}
		window.addEventListener("keydown", onwindowkeydown);

		function onwindowresize(event) {
			component.getPosition();	}
		window.addEventListener("resize", onwindowresize);

		var if_block0 = (ctx.isMulti && ctx.selectedValue && ctx.selectedValue.length > 0) && create_if_block_4(component, ctx);

		function input_input_handler() {
			input_updating = true;
			component.set({ filterText: input.value });
			input_updating = false;
		}

		function focus_handler(event) {
			component.handleFocus();
		}

		var if_block1 = (!ctx.isMulti && ctx.showSelectedItem) && create_if_block_3$1(component, ctx);

		var if_block2 = (ctx.showSelectedItem && ctx.isClearable && !ctx.isDisabled && !ctx.isWaiting) && create_if_block_2$1(component, ctx);

		var if_block3 = (!ctx.isSearchable && !ctx.isDisabled && !ctx.isWaiting && (ctx.showSelectedItem && !ctx.isClearable || !ctx.showSelectedItem)) && create_if_block_1$1(component, ctx);

		var if_block4 = (ctx.isWaiting) && create_if_block$2(component, ctx);

		function click_handler(event) {
			component.handleClick();
		}

		return {
			c() {
				div = createElement("div");
				if (if_block0) if_block0.c();
				text0 = createText("\n\n  ");
				input = createElement("input");
				text1 = createText("\n\n  ");
				if (if_block1) if_block1.c();
				text2 = createText("\n\n  ");
				if (if_block2) if_block2.c();
				text3 = createText("\n\n  ");
				if (if_block3) if_block3.c();
				text4 = createText("\n\n  ");
				if (if_block4) if_block4.c();
				addListener(input, "input", input_input_handler);
				addListener(input, "focus", focus_handler);
				input.readOnly = input_readonly_value = !ctx.isSearchable;
				input.autocomplete = "off";
				setAttribute(input, "autocorrect", "off");
				input.spellcheck = "false";
				input.placeholder = ctx.placeholderText;
				input.disabled = ctx.isDisabled;
				input.style.cssText = ctx.inputStyles;
				input.className = "svelte-hw8jyz";
				addListener(div, "click", click_handler);
				div.className = "" + ctx.containerClasses + " svelte-hw8jyz";
				div.style.cssText = ctx.containerStyles;
			},

			m(target, anchor) {
				insert(target, div, anchor);
				if (if_block0) if_block0.m(div, null);
				append(div, text0);
				append(div, input);
				component.refs.input = input;

				input.value = ctx.filterText;

				append(div, text1);
				if (if_block1) if_block1.m(div, null);
				append(div, text2);
				if (if_block2) if_block2.m(div, null);
				append(div, text3);
				if (if_block3) if_block3.m(div, null);
				append(div, text4);
				if (if_block4) if_block4.m(div, null);
				component.refs.container = div;
			},

			p(changed, ctx) {
				if (ctx.isMulti && ctx.selectedValue && ctx.selectedValue.length > 0) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_4(component, ctx);
						if_block0.c();
						if_block0.m(div, text0);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (!input_updating && changed.filterText) input.value = ctx.filterText;
				if ((changed.isSearchable) && input_readonly_value !== (input_readonly_value = !ctx.isSearchable)) {
					input.readOnly = input_readonly_value;
				}

				if (changed.placeholderText) {
					input.placeholder = ctx.placeholderText;
				}

				if (changed.isDisabled) {
					input.disabled = ctx.isDisabled;
				}

				if (changed.inputStyles) {
					input.style.cssText = ctx.inputStyles;
				}

				if (!ctx.isMulti && ctx.showSelectedItem) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_3$1(component, ctx);
						if_block1.c();
						if_block1.m(div, text2);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (ctx.showSelectedItem && ctx.isClearable && !ctx.isDisabled && !ctx.isWaiting) {
					if (!if_block2) {
						if_block2 = create_if_block_2$1(component, ctx);
						if_block2.c();
						if_block2.m(div, text3);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}

				if (!ctx.isSearchable && !ctx.isDisabled && !ctx.isWaiting && (ctx.showSelectedItem && !ctx.isClearable || !ctx.showSelectedItem)) {
					if (!if_block3) {
						if_block3 = create_if_block_1$1(component, ctx);
						if_block3.c();
						if_block3.m(div, text4);
					}
				} else if (if_block3) {
					if_block3.d(1);
					if_block3 = null;
				}

				if (ctx.isWaiting) {
					if (!if_block4) {
						if_block4 = create_if_block$2(component, ctx);
						if_block4.c();
						if_block4.m(div, null);
					}
				} else if (if_block4) {
					if_block4.d(1);
					if_block4 = null;
				}

				if (changed.containerClasses) {
					div.className = "" + ctx.containerClasses + " svelte-hw8jyz";
				}

				if (changed.containerStyles) {
					div.style.cssText = ctx.containerStyles;
				}
			},

			d(detach) {
				window.removeEventListener("click", onwindowclick);

				window.removeEventListener("keydown", onwindowkeydown);

				window.removeEventListener("resize", onwindowresize);

				if (detach) {
					detachNode(div);
				}

				if (if_block0) if_block0.d();
				removeListener(input, "input", input_input_handler);
				removeListener(input, "focus", focus_handler);
				if (component.refs.input === input) component.refs.input = null;
				if (if_block1) if_block1.d();
				if (if_block2) if_block2.d();
				if (if_block3) if_block3.d();
				if (if_block4) if_block4.d();
				removeListener(div, "click", click_handler);
				if (component.refs.container === div) component.refs.container = null;
			}
		};
	}

	// (13:2) {#if isMulti && selectedValue && selectedValue.length > 0}
	function create_if_block_4(component, ctx) {
		var switch_instance_anchor;

		var switch_value = ctx.MultiSelection;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	selectedValue: ctx.selectedValue,
			 	getSelectionLabel: ctx.getSelectionLabel,
			 	activeSelectedValue: ctx.activeSelectedValue,
			 	isDisabled: ctx.isDisabled
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		function switch_instance_multiItemClear(event) {
			component.handleMultiItemClear(event.i);
		}

		if (switch_instance) switch_instance.on("multiItemClear", switch_instance_multiItemClear);
		function switch_instance_focus(event) {
			component.handleFocus();
		}

		if (switch_instance) switch_instance.on("focus", switch_instance_focus);

		return {
			c() {
				if (switch_instance) switch_instance._fragment.c();
				switch_instance_anchor = createComment();
			},

			m(target, anchor) {
				if (switch_instance) {
					switch_instance._mount(target, anchor);
				}

				insert(target, switch_instance_anchor, anchor);
			},

			p(changed, ctx) {
				var switch_instance_changes = {};
				if (changed.selectedValue) switch_instance_changes.selectedValue = ctx.selectedValue;
				if (changed.getSelectionLabel) switch_instance_changes.getSelectionLabel = ctx.getSelectionLabel;
				if (changed.activeSelectedValue) switch_instance_changes.activeSelectedValue = ctx.activeSelectedValue;
				if (changed.isDisabled) switch_instance_changes.isDisabled = ctx.isDisabled;

				if (switch_value !== (switch_value = ctx.MultiSelection)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(switch_instance_anchor.parentNode, switch_instance_anchor);

						switch_instance.on("multiItemClear", switch_instance_multiItemClear);
						switch_instance.on("focus", switch_instance_focus);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(switch_instance_anchor);
				}

				if (switch_instance) switch_instance.destroy(detach);
			}
		};
	}

	// (38:2) {#if !isMulti && showSelectedItem }
	function create_if_block_3$1(component, ctx) {
		var div;

		var switch_value = ctx.Selection;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	item: ctx.selectedValue,
			 	getSelectionLabel: ctx.getSelectionLabel
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		function focus_handler(event) {
			component.handleFocus();
		}

		return {
			c() {
				div = createElement("div");
				if (switch_instance) switch_instance._fragment.c();
				addListener(div, "focus", focus_handler);
				div.className = "selectedItem svelte-hw8jyz";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}
			},

			p(changed, ctx) {
				var switch_instance_changes = {};
				if (changed.selectedValue) switch_instance_changes.item = ctx.selectedValue;
				if (changed.getSelectionLabel) switch_instance_changes.getSelectionLabel = ctx.getSelectionLabel;

				if (switch_value !== (switch_value = ctx.Selection)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, null);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				if (switch_instance) switch_instance.destroy();
				removeListener(div, "focus", focus_handler);
			}
		};
	}

	// (44:2) {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
	function create_if_block_2$1(component, ctx) {
		var div;

		function click_handler(event) {
			component.handleClear(event);
		}

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-hw8jyz"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
				addListener(div, "click", click_handler);
				div.className = "clearSelect svelte-hw8jyz";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	// (54:2) {#if !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)}
	function create_if_block_1$1(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" class="css-19bqh2r svelte-hw8jyz"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
				div.className = "indicator svelte-hw8jyz";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (63:2) {#if isWaiting}
	function create_if_block$2(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg class="spinner_icon svelte-hw8jyz" viewBox="25 25 50 50"><circle class="spinner_path svelte-hw8jyz" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>`;
				div.className = "spinner svelte-hw8jyz";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Select(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data$2(), options.data);

		this._recompute({ isMulti: 1, isDisabled: 1, isFocused: 1, selectedValue: 1, filterText: 1, placeholder: 1, items: 1, groupBy: 1, groupFilter: 1, getOptionLabel: 1, optionIdentifier: 1, loadOptions: 1 }, this._state);
		this._intro = true;

		this._handlers.state = [onstate];

		this._handlers.destroy = [ondestroy$1];

		if (!document.getElementById("svelte-hw8jyz-style")) add_css$4();

		onstate.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$6(this, this._state);

		this.root._oncreate.push(() => {
			oncreate$3.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(Select.prototype, proto);
	assign(Select.prototype, methods$4);

	Select.prototype._recompute = function _recompute(changed, state) {
		if (changed.isMulti || changed.isDisabled || changed.isFocused) {
			if (this._differs(state.containerClasses, (state.containerClasses = containerClasses(state)))) changed.containerClasses = true;
		}

		if (changed.selectedValue || changed.filterText) {
			if (this._differs(state.showSelectedItem, (state.showSelectedItem = showSelectedItem(state)))) changed.showSelectedItem = true;
		}

		if (changed.selectedValue || changed.placeholder) {
			if (this._differs(state.placeholderText, (state.placeholderText = placeholderText(state)))) changed.placeholderText = true;
		}

		if (changed.items || changed.filterText || changed.groupBy || changed.groupFilter || changed.getOptionLabel || changed.isMulti || changed.selectedValue || changed.optionIdentifier || changed.loadOptions) {
			if (this._differs(state.filteredItems, (state.filteredItems = filteredItems(state)))) changed.filteredItems = true;
		}
	};

	return Select;

})));
