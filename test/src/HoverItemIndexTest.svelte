<script>
    import Select from '../../src/lib/Select.svelte';

    let items = [];

    for (let i = 0; i < 100; i++) {
        items.push({ label: i, value: i, group: 'a' });
    }

    let value = null;

    export let hoverItemIndex;
</script>

<Select {items} bind:value groupBy={(i) => i.group} bind:hoverItemIndex />

{#if value}
    <p>
        Selected value: {value.label}
    </p>
{/if}
