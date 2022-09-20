<script lang="ts">
  import ThemeToggleIcon from '$lib/example/header/ThemeToggleIcon.svelte';
  import { theme } from '$lib/stores/theme';
</script>

<div
  class="dragzone z-0 h-12 shadow-2xl bg-base-100 items-center justify-between flex"
>
  <button
    on:click={() => {
      theme.toggleTheme();
    }}
    class="hover:text-primary ml-2 z-10"
    aria-live="polite"
  >
    <ThemeToggleIcon cssClass={'w-8'} />
  </button>

  <div>
    <button
      on:click={api.minimize}
      aria-live="polite"
      class="p-2 text-xl hover:text-primary z-10 h-full"
    >
      <i class="fa-solid fa-window-minimize w-6" />
    </button>
    <button
      on:click={window.close}
      aria-live="polite"
      class="p-2 text-2xl hover:text-primary z-10 h-full"
    >
      <i class="fa-solid fa-xmark w-6" />
    </button>
  </div>
</div>

<style lang="postcss">
  .dragzone {
    -webkit-app-region: drag;
  }
  * {
    -webkit-app-region: no-drag;
  }
</style>
