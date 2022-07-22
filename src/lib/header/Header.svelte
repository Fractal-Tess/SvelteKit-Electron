<script lang="ts">
  import ThemeToggleIcon from '$lib/header/ThemeToggleIcon.svelte';
  import { theme } from '$lib/stores/theme';
</script>

<div
  class="dragzone z-0 h-12 shadow-2xl bg-base-100 items-center justify-between flex"
>
  <button
    on:click={() => {
      theme.toggleTheme();
    }}
    class="hover:text-secondary ml-2 z-10"
    aria-live="polite"
  >
    <ThemeToggleIcon cssClass={'w-8'} />
  </button>
</div>

<style lang="scss">
  .dragzone {
    -webkit-app-region: drag;
  }
  * {
    -webkit-app-region: no-drag;
  }
</style>
