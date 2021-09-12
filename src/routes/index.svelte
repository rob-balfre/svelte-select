<script>
    import Select from '$lib/Select.svelte';
    import MultiSelection from '$lib/MultiSelection.svelte';
    import debounce from '$lib/debounce';
</script>

<h1>Svelte Select</h1>

<Select isMulti {debounce} {MultiSelection} />
