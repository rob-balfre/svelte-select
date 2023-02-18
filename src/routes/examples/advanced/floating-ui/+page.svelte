<script>
    import Select from '$lib/Select.svelte';

    let items = ['One', 'Two', 'Three'];
</script>

<div class="box"></div>

<div style="position:fixed; left: 300px; top: 100px; width: 400px">
    <Select
        {items}
        floatingConfig={{
            strategy: 'fixed',
        }} />
</div>


<style>
    .box {
        height: 300px;
    }
</style>