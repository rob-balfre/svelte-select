<script>
    import Select from '$lib/Select.svelte';

    let items = ['One', 'Two', 'Three'];

    let collection = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let value;
</script>

<Select {items} value="One" />
<br />
<Select items={collection} bind:value />

<p>{value?.label || ''}</p>
