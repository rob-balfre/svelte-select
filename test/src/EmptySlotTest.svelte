<script>
    import Select from '../../src/lib/Select.svelte';

    let items = [];
</script>

<Select {items} listOpen>
    <div class="custom-empty" slot="empty">Nothing to see here...</div>
</Select>
