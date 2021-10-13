<script>
    import Select from '$lib/Select.svelte';
    import MultiSelection from '$lib/MultiSelection.svelte';
    import debounce from '$lib/debounce';
    import ChevronIcon from '$lib/ChevronIcon.svelte';
    import ClearIcon from '$lib/ClearIcon.svelte';

    let items = ['one', 'two', 'three', 'four'];
    let value = null;
</script>

<div class="flex-it">
    <Select
        {items}
        showChevron
        {ChevronIcon}
        {ClearIcon}
        isClearable
        {value}
        class="tw-select"
        listClass="tw-list" />
</div>

<div class="flex-it">
    <Select {items} showChevron {ChevronIcon} {ClearIcon} isClearable {value} />
</div>

<style global lang="postcss">
    @import 'tailwindcss/base';

    .tw-select {
        @apply border rounded box-border h-10 relative flex items-center px-4 py-0 bg-white m-0	w-full
        hover:border-gray-400;
    }

    .tw-select input {
        @apply cursor-default border-none text-gray-600 h-10 leading-10 px-4 py-0 bg-transparent text-sm absolute left-0 m-0 w-full 
        focus:outline-none hover:border-gray-400;
    }

    .tw-select.focused {
        @apply border-blue-600;
    }

    .tw-select.disabled {
        @apply bg-gray-200 border-gray-200 text-gray-600;
    }

    .tw-select.disabled input::placeholder {
        @apply text-gray-400 opacity-100;
    }

    .tw-select .selected-item {
        @apply leading-10 h-10 overflow-x-hidden pr-5
        focus:outline-none;
    }

    .tw-select .icons {
        @apply absolute flex right-0 translate-y-0 text-gray-200;
    }

    .tw-select .icons > * {
        @apply transition-colors ease-in-out duration-200;
    }

    .tw-select.focused .icons,
    .tw-select .chevron:hover,
    .tw-select .clearSelect:hover {
        @apply text-gray-600;
    }

    .tw-select .clearSelect {
        @apply px-2 h-5 text-gray-300 flex-none w-9;
    }

    .tw-select .chevron {
        @apply flex pt-0 pr-2 pl-2 border-l-2 w-9 h-5 text-gray-300;
    }

    .tw-select.multi {
        @apply pr-9 pl-4 h-auto flex-wrap items-stretch;
    }

    .tw-select.multi > * {
        @apply flex-auto w-12;
    }

    .tw-select.multi input {
        @apply p-0 relative m-0;
    }

    .tw-select.error {
        @apply border-red-500 bg-white;
    }

    .a11yText {
        @apply sr-only;
    }

    .tw-list {
        @apply shadow-md rounded-sm max-h-64 overflow-y-auto bg-white border-none absolute z-10 w-full left-0 right-0;
    }

    .flex-it {
        padding: 20px;
        display: flex;
        margin: 0 0 20px;
    }
</style>
