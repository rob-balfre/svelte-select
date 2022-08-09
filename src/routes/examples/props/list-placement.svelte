<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<div>
    <Select {items} listPlacement="top" />
</div>

<style>
    div {
        margin-top: 300px;
    }
</style>
