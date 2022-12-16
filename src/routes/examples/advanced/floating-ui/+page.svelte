<script>
    import Select from '$lib/Select.svelte';

    let items = ['One', 'Two', 'Three'];
    let value = null;
</script>

<div class="box"></div>

<div style="position:fixed; left: 300px; top: 100px; width: 400px">
    <Select
        {items}
        bind:value
        floatingConfig={{
            strategy: 'fixed',
        }} />
</div>

{#if value}
    <p>
        Selected value: {value.label}
    </p>
{/if}


<style>
    .box {
        height: 300px;
    }
</style>