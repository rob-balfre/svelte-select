<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let listOpen = false;
    let show = false;
</script>

<button
    on:pointerdown|preventDefault={() => {
        listOpen = !listOpen;
    }}>Open</button>

<Select {items} bind:listOpen />

<br />

<button
    on:click={() => {
        show = !show;
    }}>Show Select</button>

{#if show}
    <Select {items} listOpen />
{/if}
