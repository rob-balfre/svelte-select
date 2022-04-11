<script>
    import Select from '$lib/Select.svelte';
</script>

<form>
    <Select />
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
        background: #333;
    }
</style>
