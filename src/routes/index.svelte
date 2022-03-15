<script>
    import Select from '$lib/Select.svelte';

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function getItems() {
        await timeout(3000);

        return Promise.resolve([
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' },
        ]);
    }
</script>

<form>
    <Select loadOptions={getItems} debounceWait={1300} />
</form>

<style>
    :global(body, input) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
    }

    form {
        padding: 40px;
        display: flex;
        width: 400px;
        background: violet;
    }
</style>
