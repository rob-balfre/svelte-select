<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items} name="demo">
    <svelte:fragment slot="input-hidden" let:inputName let:index>
        <pre>{JSON.stringify({ [inputName]: vlaue })}
        
inspect browser to see custom {`<input type="hidden" />`}</pre>

        <input type="hidden" name={inputName} value={value.value} />
    </svelte:fragment>
</Select>
