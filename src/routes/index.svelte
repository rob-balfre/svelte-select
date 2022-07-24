<script>
    import Select from '$lib/Select.svelte';
    let items = ['one', 'two', 'three'];
    let value; //= ['one', 'two'];
    let target = null;
</script>

<div class="container">
    <form>
        <Select bind:items bind:value showChevron>
            <!-- <div class="fancy-selection" slot="selection" let:selection>
                <i>{selection}</i>
            </div>

            <div class="chevron" slot="chevron" let:listOpen>
                {#if listOpen}
                ⬆️
                {:else}
                ⬇️
                {/if}
            </div> -->
        </Select>
    </form>
</div>

<!-- 
	Paste this into the select:
    <svg><animate onbegin=alert('filterText') attributeName=x dur=1s>
-->
<style>
    :global(body, input) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
    }
</style>
