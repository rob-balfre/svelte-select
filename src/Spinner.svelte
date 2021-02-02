<style>
  .spinner {
    position: absolute;
    right: var(--spinnerRight, 10px);
    top: var(--spinnerLeft, 11px);
    width: var(--spinnerWidth, 20px);
    height: var(--spinnerHeight, 20px);
    color: var(--spinnerColor, #51ce6c);
    animation: rotate 0.75s linear infinite;
  }

  .spinner_icon {
    display: block;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    -webkit-transform: none;
  }

  .spinner_path {
    stroke-dasharray: 90;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="spinner">
  <svg class="spinner_icon" viewBox="25 25 50 50">
    <circle
      class="spinner_path"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke="currentColor"
      stroke-width="5"
      stroke-miterlimit="10" />
  </svg>
</div>

