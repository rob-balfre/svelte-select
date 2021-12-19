<svg class="loading" viewBox="25 25 50 50">
    <circle
        class="circle_path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-miterlimit="10" />
</svg>

<style>
    .loading {
        padding: 0 5px;
        width: var(--spinner-width, 35px);
        height: var(--spinner-height, 20px);
        color: var(--spinner-color, #51ce6c);
        animation: rotate 0.75s linear infinite;
        transform-origin: center center;
        margin: auto;
        -webkit-transform: none;
    }

    .circle_path {
        stroke-dasharray: 90;
        stroke-linecap: round;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
</style>