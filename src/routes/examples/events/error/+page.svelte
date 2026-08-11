<script>
    import Select from '$lib/Select.svelte';

    function loadOptions() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('💩');
            });
        });
    }

    function handle(detail) {
        console.log(detail);
    }
</script>

<Select onerror={handle} {loadOptions} />
