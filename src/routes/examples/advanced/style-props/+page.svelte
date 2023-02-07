<script>
    import Select from '$lib/Select.svelte';

    let items = ['One', 'Two', 'Three'];
    let listOpen = false;
</script>

<Select
    bind:listOpen
    {items}
    listOffset={0}
    --list-border-radius="0 0 5px 5px"
    --item-first-border-radius="0"
    --border-radius={listOpen ? '5px 5px 0 0' : '5px'} />
