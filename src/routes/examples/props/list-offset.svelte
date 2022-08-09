<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<div>
    <Select {items} listOffset={10}></Select>

    
</div>

<style>
    div {
        display: flex;
    }
</style>
