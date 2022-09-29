<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let loadOptionsCalled = false;

    function loadOptions() {
        loadOptionsCalled = true;
        return Promise.resolve(items);
    }    
</script>

<p>loadOptions called: {loadOptionsCalled}</p>
<Select {loadOptions} debounceWait="2000" />
