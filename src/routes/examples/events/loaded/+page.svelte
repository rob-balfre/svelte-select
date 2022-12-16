<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    function loadOptions() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(JSON.parse(JSON.stringify(items)));
            });
        });
    }

    function handle(e) {
        console.log(e.detail);
    }
</script>

<Select on:loaded={handle} {loadOptions} />
