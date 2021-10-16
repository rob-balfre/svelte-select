<script>
    import Select from '$lib/Select.svelte';
    import ChevronIcon from '$lib/ChevronIcon.svelte';
    import ClearIcon from '$lib/ClearIcon.svelte';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    function groupBy(item) {
        return item.group;
    }

    let value = null;
</script>

<div class="flex-it">
    <Select
        {groupBy}
        items={itemsWithGroup}
        showChevron
        {ChevronIcon}
        {ClearIcon}
        isClearable
        {value}
        class="tw-select"
        listClass="tw-list"
        itemClass="tw-item" />
</div>

<div class="flex-it">
    <Select
        {groupBy}
        items={itemsWithGroup}
        showChevron
        {ChevronIcon}
        {ClearIcon}
        isClearable
        {value} />
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

    .tw-list .list-group-title {
        @apply text-gray-400 cursor-default text-sm font-medium h-10 leading-10 px-5 overflow-ellipsis whitespace-nowrap uppercase;
    }

    .tw-list .empty {
        @apply text-center py-5 text-gray-500;
    }

    .tw-item {
        @apply cursor-default h-10 leading-10 px-5 text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap;
    }

    .tw-item.group-item {
        @apply px-10;
    }

    .tw-item:active {
        @apply bg-blue-200;
    }

    .tw-item.active {
        @apply bg-blue-600 text-white;
    }

    .tw-item.not-selectable {
        @apply text-gray-300;
    }

    .tw-item.first {
        @apply rounded-t-sm;
    }

    .tw-item.hover:not(.active) {
        @apply bg-blue-100 text-current;
    }

    .flex-it {
        padding: 20px;
        display: flex;
        margin: 0 0 20px;
    }
</style>
