<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let appendListTarget = null;

    function handleClick() {
        appendListTarget = appendListTarget ? null : document.body;
    }
</script>

<button on:click={handleClick}>toggle appendListTarget</button>

<div class="container" class:green={!!appendListTarget}>
    <Select {items} {appendListTarget} />
</div>

<style>
    .container {
        transform: translate(0, 120px);
        overflow: hidden;
        width: 300px;
        background: grey;
        padding: 20px;
    }

    .green {
        background: green;
    }
</style>
