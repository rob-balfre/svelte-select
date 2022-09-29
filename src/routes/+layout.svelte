<script>
    import { page } from '$app/stores';

    import { HighlightSvelte } from 'svelte-highlight';
    import highlightStyles from 'svelte-highlight/styles/atom-one-dark';

    const _props = import.meta.glob('./examples/props/*/*.svelte', { as: 'raw' });
    const _slots = import.meta.glob('./examples/slots/*/*.svelte', { as: 'raw' });
    const _events = import.meta.glob('./examples/events/*/*.svelte', { as: 'raw' });
    const _advanced = import.meta.glob('./examples/advanced/*/*.svelte', { as: 'raw' });

    $: setup = {
        props: buildLinks(_props),
        slots: buildLinks(_slots),
        events: buildLinks(_events),
        advanced: buildLinks(_advanced),
    };

    function buildLinks(obj) {
        return Object.keys(obj).map((key) => {
            const sp = key.split('/');
            const name = sp[3].split('.')[0];
            return {
                href: `${sp[1]}/${sp[2]}/` + name,
                name: name.replace(/-./g, (x) => x[1].toUpperCase()),
                source: obj[key],
            };
        });
    }

    $: handleExampleCode($page);

    let source;
    async function handleExampleCode(newPage) {
        source = null;

        if (!newPage?.routeId) return;

        if (newPage.routeId.includes('examples/')) {
            const s = newPage.routeId.split('/');
            const file = setup[s[1]].find((i) => i.href.includes(s[2]));
            const raw = await file.source();
            source = raw.replace('$lib/Select.svelte', 'svelte-select');
        }

        handleNav();
    }

    let showNav = true;
    function handleNav() {
        showNav = !showNav;
    }
</script>

<svelte:head>
    {@html highlightStyles}
</svelte:head>

<div class="container">
    <button on:click={handleNav} class="show-nav">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"
            ><path
                d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
                fill="currentcolor" /></svg>
    </button>
    <nav class:show={showNav}>
        <ul>
            <li><a <a class:active={$page.routeId === 'examples'} href="/">Home</a></li>
        </ul>

        <h2>Props</h2>
        <ul>
            {#each setup.props as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Slots</h2>
        <ul>
            {#each setup.slots as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Events</h2>
        <ul>
            {#each setup.events as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Advanced</h2>
        <ul>
            {#each setup.advanced as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>
    </nav>

    <div class="content">
        <slot />

        {#if source}
            <HighlightSvelte code={source} />
        {/if}
    </div>
</div>

<style>
    .show-nav {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        background: #ff3e00;
        border: none;
        border-radius: 6px;
        padding: 5px 8px;
        color: #fff;
        display: flex;
    }
    nav {
        display: none;
    }

    nav.show {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        background: #fff;
        overflow-y: scroll;
        position: fixed;
        z-index: 1;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    h2 {
        margin: 0;
        font-size: 16px;
        padding: 10px;
        border-bottom: 1px solid #f3f1fd;
    }

    ul {
        padding: 0;
        margin: 0 0 10px;
        list-style: none;
    }

    li {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f3f1fd;
    }

    a {
        color: #696d75;
        padding: 10px;
        text-decoration: none;
        font-size: 16px;
    }

    a.active {
        background: #f3f1fd;
        color: black;
        font-weight: bold;
    }

    .content {
        padding: 20px;
    }

    @media (min-width: 800px) {
        .show-nav {
            display: none;
        }

        nav {
            display: flex;
            flex-direction: column;
            width: 250px;
            border-right: 1px solid #f3f1fd;
            right: unset;
        }
        
        .container {
            display: flex;
            gap: 30px;
        }

        .content {
            position: fixed;
            left: 250px;
            right: 0;
            top: 0;
            bottom: 0;
            overflow-y: auto;
            padding: 30px;
            flex-grow: 1;
        }
    }
</style>
