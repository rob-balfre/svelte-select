// import defaultStyles from './default.css';
import tailwindStyles from './tailwind.css';
// import Multi from './Multi.svelte';
import List from './List.svelte';
import Item from './Item.svelte';
import Selection from './Selection.svelte';
import debounce from './debounce';

const vanilla = {
    // theme: defaultStyles
    

}

const tailwind = {
    theme: tailwindStyles,
    // selection: Multi,
    List,
    Item,
    Selection,
    debounce
}


export {
    // vanilla,
    tailwind
}