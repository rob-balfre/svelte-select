export default (node, parent) => {
    function detect({ target }) {
        if (!node.contains(target) && parent && !parent.contains(target)) {
            node.dispatchEvent(new CustomEvent('clickOutside'));
        }
    }

    document.addEventListener('click', detect, {
        passive: true, capture: true
    });

    return {
        destroy() {
            document.removeEventListener('click', detect);
        },
    };
};
