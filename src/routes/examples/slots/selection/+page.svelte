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

<br />
<br />

<Select {items} multiple>
    <div slot="selection" let:selection let:index>
        🎉 {index} : {selection.label} 🎉
    </div>
</Select>
