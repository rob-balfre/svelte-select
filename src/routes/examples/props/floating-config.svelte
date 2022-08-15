<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let floatingConfig = {
        strategy: 'fixed',
    };

    let topConfig = {
        placement: 'top-start',
    };

    
</script>

<div class="container">
    <Select {items} {floatingConfig} --list-position="fixed" />
</div>

<div class="container tall">
    <Select {items} floatingConfig={topConfig} />
</div>

<style>
    .container {
        margin: 0 0 20px;
        overflow: hidden;
        width: 300px;
        background: grey;
        padding: 20px;
        height: 100px;
        overflow-y: scroll;
    }

    .tall {
        padding-top: 200px;
        height: 300px;
    }
</style>
