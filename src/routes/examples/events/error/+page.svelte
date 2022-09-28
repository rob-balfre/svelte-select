<script>
    import Select from '$lib/Select.svelte';

    function loadOptions() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('💩');
            });
        });
    }

    function handle(e) {
        console.log(e.detail);
    }
</script>

<Select on:error={handle} {loadOptions} />
