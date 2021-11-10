export default function debounce(fn, wait = 1) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, ...args), wait);
    };
}
