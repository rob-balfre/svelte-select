<div on:mouseover="handleHover(i)" on:click="handleClick(item, i, event)"
    class="listItem {itemClasses(hoverItemIndex, selectedValue, i, item)}">

    <div class="item">
        {@html getOptionLabel(item)}
    </div>

</div>

<style>
    .listItem {
        cursor: default;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .listItem.hover {
        background: #e7f2ff;
    }

    .listItem:active {
        background: #b9daff;
    }

    .listItem:first-child {
        border-radius: 4px 4px 0 0;
    }

    .listItem.active {
        background: #007aff;
        color: #fff;
        pointer-events: none;
    }
</style>


<script>
    export default {
        oncreate() {
            // console.log('this.get() :', this.get());
        },
        methods: {
            handleHover(i) {
                this.fire('hover', i)
            },
            handleClick(item, i, event) {
                this.fire('click', { item, i, event })
            }
        },
        helpers: {
            itemClasses(hoverItemIndex, selectedValue, i, item) {
                let isActive;
                if (selectedValue) isActive = selectedValue.value === item.value;
                const isHover = hoverItemIndex === i;
                return `${isActive ? 'active' : ''} ${isHover ? 'hover' : ''}`
            }
        },
    }
</script>