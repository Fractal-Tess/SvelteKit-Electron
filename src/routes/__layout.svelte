<script lang="ts">
  import '$styles/app.scss';

  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  // import ConfirmOpenLink from '$lib/modal/ConfirmOpenLinkModal.svelte';

  import { theme } from '$lib/stores/theme';
  $: {
    document.documentElement.setAttribute('data-theme', $theme);
    document.documentElement.classList.value = $theme;
  }

  let ready = false;
  onMount(() => (ready = true));

  //TODO: Handle external url links
  // const externalUrlQueryModal = false;
</script>

<div
  class="bg-base-100 text-base-content h-screen flex flex-col overflow-y-auto overflow-x-hidden"
>
  <Header />
  {#if ready}
    <main class="flex-1 shadow-lg" in:fade={{ delay: 300, duration: 1000 }}>
      <slot />
    </main>
    <!-- {#if externalUrlQueryModal}
      <ConfirmOpenLink />
    {/if} -->
  {/if}
  <Footer />
</div>
