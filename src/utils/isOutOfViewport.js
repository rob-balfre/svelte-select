export default function (parent, container) {
    const parentBounding = parent.getBoundingClientRect();
    const boundingContainer = container.getBoundingClientRect();
    const out = {};

    out.top = parentBounding.top < 0;
    out.left = parentBounding.left < 0;
    out.bottom =
        parentBounding.bottom + boundingContainer.height >
        (window.innerHeight || document.documentElement.clientHeight);

    out.right =
        parentBounding.right >
        (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;

    return out;
}
