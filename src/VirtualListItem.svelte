<script>
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    export let i;
    export let item;
    export let hoverItemIndex;
    export let selectedValue;
    export let getOptionLabel;

    onMount(() => {
        // console.log('this.get() :', this.get());
    });

    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
    export function handleHover(i) {
        dispatch('hover', i)
    }

    export function handleClick(item, i, event) {
        dispatch('click', { item, i, event })
    }

    function itemClasses(hoverItemIndex, selectedValue, i, item) {
        let isActive;
        if (selectedValue) isActive = selectedValue.value === item.value;
        const isHover = hoverItemIndex === i;
        return `${isActive ? 'active' : ''} ${isHover ? 'hover' : ''}`
    }
</script>

<div on:mouseover="{() => handleHover(i)}" on:click="{event => handleClick(item, i, event)}"
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
    }
</style>