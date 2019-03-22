<script>
	import { onMount } from 'svelte';

	// [svelte-upgrade suggestion]
	// manually refactor all references to __this
	const __this = {
		get: () => ({ items, start, end, height, _viewportHeight, _top, _bottom, component, _props, itemHeight })
	};

	export let viewport;
	export let container;

	export let items;
	export let start = 0;
	export let end = 0;
	export let height = '100%';
	export let _viewportHeight = 0;
	export let _top = 0;
	export let _bottom = 0;
	export let component;
	export let _props = {};
	export let itemHeight = 0;

	export let visible = () => {
		return items.slice(start, end).map((data, i) => {
			return { index: i + start, data };
		});
	}

	onMount(() => {

		const keys = Object.keys(__this.options.data).filter(key => key !== 'items' && key !== 'component' && key !== 'height' && key !== 'itemHeight');
		if (keys.length) {
			const state = __this.get();
			keys.forEach(key => {
				_props[key] = state[key];
			});
			_props = _props;
		}

		__this.heightMap = [];
		__this.rows = container.getElementsByClassName('row');

		if (items.length > 0) {
			initialise();
		}

		__this.on('state', ({ changed, previous, current }) => {
			if (changed.items || changed.height || changed.itemHeight || changed._viewportHeight) {
				if (current.itemHeight && (changed.itemHeight || current.items.length > __this.heightMap.length)) {
					__this.heightMap = current.items.map(() => current.itemHeight);
				}

				else if (current.items.length > __this.heightMap.length) {
					if (__this.heightMap.length === 0) {
						initialise();
					} else {
						let height = 0;
						let i = 0;
						for (; i < __this.heightMap.length; i += 1) height += __this.heightMap[i];
						const avg = height / __this.heightMap.length;
						for (; i < current.items.length; i += 1) __this.heightMap[i] = avg;
					}
				}

				refresh();
			}

			if (keys.some(key => changed[key])) {
				const _props = {};
				keys.forEach(key => {
					_props[key] = current[key];
				});
				_props = _props;
			}
		});
	});

	// [svelte-upgrade suggestion]
	// review these functions and remove unnecessary 'export' keywords
	export function initialise() {

		if (itemHeight) {
			__this.heightMap = items.map(item => itemHeight);
			end = Math.min(items.length, Math.ceil(_viewportHeight / itemHeight)), _bottom = items.length * itemHeight;
		} else {
			let height = 0;
			let i = 0;

			while (height < _viewportHeight && i < items.length) {
				end += 1;
				
				if (__this.rows.length === 0) return;

				const rowHeight = __this.heightMap[i] = __this.rows[i].offsetHeight;
				height += rowHeight;

				i += 1;
			}

			const end = i;
			const avg = Math.round(height / i);

			for (; i < items.length; i += 1) __this.heightMap[i] = avg;

			_bottom = (items.length - end) * avg;
		}
	}

	export function refresh() {
		const { scrollTop } = viewport;

		let paddingTop = 0;
		let offset = 0;
		let i = 0;

		if (!itemHeight) {
			for (let v = 0; v < __this.rows.length; v += 1) {
				__this.heightMap[start + v] = __this.rows[v].offsetHeight;
			}
		}

		for (; i < items.length; i += 1) {
			if (!(i in __this.heightMap)) break;

			offset += __this.heightMap[i];
			if (offset > scrollTop) break;

			paddingTop = offset;
		}

		const newStart = i++;

		for (; i < items.length; i += 1) {
			if (offset >= scrollTop + _viewportHeight) break;
			offset += __this.heightMap[i];
		}

		const newEnd = i;

		if (newStart === start && newEnd === end) return;

		let paddingBottom = 0;
		for (; i < items.length; i += 1) paddingBottom += __this.heightMap[i];

		_top = paddingTop, _bottom = paddingBottom, start = newStart, end = newEnd;

		if (newStart < start) {
			let d = 0;

			for (let i = newStart; i < start; i += 1) {
				const expectedHeight = __this.heightMap[i];
				const actualHeight = __this.rows[i - newStart].offsetHeight;

				d += actualHeight - expectedHeight;
			}

			viewport.scrollTo(0, viewport.scrollTop + d);
		}
	}
</script>

<svelte-virtual-list-viewport 
	bind:this={viewport} 
	on:scroll='{refresh}'
	style='height: {height};'
	bind:offsetHeight="{_viewportHeight}">
	
	<div bind:this={container} style='padding-top: {_top}px; padding-bottom: {_bottom}px;'>
		{#each visible as item (item.index)}
			<div class='row'>
				<svelte:component this={component} {..._props} {...item.data} item={item.data} {items} i={item.index} on:hover on:click />
			</div>
		{/each}
	</div>
</svelte-virtual-list-viewport>

<style>
	svelte-virtual-list-viewport {
		position: relative;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch;
	}

	.row {
		overflow: hidden;
	}
</style>
