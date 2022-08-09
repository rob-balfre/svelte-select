<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>


<Select {items}>
    <div slot="selection" let:selection>
        🎉 {selection.label} 🎉 
    </div>
</Select>