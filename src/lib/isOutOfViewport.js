export default function (elem) {
    const bounding = elem.getBoundingClientRect();
    const out = {};

    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
        bounding.bottom >
        (window.innerHeight || document.documentElement.clientHeight);
    out.right =
        bounding.right >
        (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;

    return out;
}
