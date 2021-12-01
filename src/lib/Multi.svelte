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
