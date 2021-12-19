<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = [];
    export let activeValue = undefined;
    export let isDisabled = false;
    export let multiFullItemClearable = false;
    export let getSelectionLabel = undefined;
    export let ClearIcon;

    function handleClear(i, event) {
        event.stopPropagation();
        dispatch('multiItemClear', { i });
    }
</script>

{#each value as item, i}
    <div
        class="multi-item {activeValue === i ? 'active' : ''} {isDisabled ? 'disabled' : ''}"
        on:click={(event) => (multiFullItemClearable ? handleClear(i, event) : {})}>
        <div class="multi-item_label">
            {@html getSelectionLabel(item)}
        </div>
        {#if !isDisabled && !multiFullItemClearable}
            <div class="multi-item_clear" on:click={(event) => handleClear(i, event)}>
                <svelte:component this={ClearIcon} />
            </div>
        {/if}
    </div>
{/each}


<style>
    .multi-item {
        background: var(--multi-item-bg, #ebedef);
        margin: var(--multi-item-margin, 4px 5px 0 0);
        border: var(--multi-item-border, 1px solid #ddd);
        border-radius: var(--multi-item-border-radius, 4px);
        height: var(--multi-item-height, 32px);
        line-height: var(--multi-item-height, 32px);
        display: flex;
        cursor: default;
        padding: var(--multi-item-padding, 0 6px 0 6px);
        max-width: 100%;
    }

    .multi-item_label {
        margin: var(--multi-label-margin, 0 5px 0 0);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .multi-item.disabled:hover {
        background: var(--multi-item-disabled-hover-bg, #ebedef);
        color: var(--multi-item-disabled-hover-color, #c1c6cc);
    }

    .multi-item_clear {
        display: flex;
        align-items: center;
        justify-content: center;
        --clear-icon-colour: var(--multi-item-clear-icon-color, #000);
    }
</style>