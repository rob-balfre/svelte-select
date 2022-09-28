<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>


<Select {items}>
    <div slot="prepend">💪</div>
</Select>

<style>
    div {
        margin-right: 5px;
    }
</style>