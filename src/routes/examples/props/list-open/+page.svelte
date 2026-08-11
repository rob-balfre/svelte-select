<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let listOpen = $state(false);
    let show = $state(false);
</script>

<button
    onpointerdown={(e) => {
        e.preventDefault();
        listOpen = !listOpen;
    }}>Open</button>

<Select {items} bind:listOpen />

<br />

<button
    onclick={() => {
        show = !show;
    }}>Show Select</button>

{#if show}
    <Select {items} listOpen />
{/if}
