<script>
    import Select from '../../src/lib/Select.svelte';

    let items = [];
</script>

<Select {items} listOpen>
    {#snippet empty()}
        <div class="custom-empty">Nothing to see here...</div>
    {/snippet}
</Select>
