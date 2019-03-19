<div ref:viewport on:scroll='refresh()' style='height: {height};' bind:offsetHeight="_viewportHeight">
	<div ref:container style='padding-top: {_top}px; padding-bottom: {_bottom}px;'>
		{#each visible as item (item.index)}
			<div class='row'>
				<svelte:component this={component} {..._props} {...item.data} item={item.data} {items} i={item.index} on:hover on:click />
			</div>
		{/each}
	</div>
</div>

<style>
	ref:viewport {
		position: relative;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch;
	}

	.row {
		overflow: hidden;
	}
</style>

<script>
	export default {
		data() {
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
		},

		computed: {
			visible: ({ items, start, end }) => {
				return items.slice(start, end).map((data, i) => {
					return { index: i + start, data };
				});
			}
		},

		oncreate() {
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
		},

		methods: {
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
		}
	};
</script>
