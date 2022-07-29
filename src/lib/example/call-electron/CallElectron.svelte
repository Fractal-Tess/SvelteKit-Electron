<script lang="ts">
  import { fade } from 'svelte/transition';

  let message = '';

  const callElectron = () => {
    message = api.example();
  };
</script>

<button
  on:click={callElectron}
  class=" font-extrabold btn btn-outline btn-secondary btn-md"
  >Call Electron</button
>
<div class="relative">
  {#key message}
    <p
      class="absolute outline-secondary border-b-2 border-secondary text-2xl
     whitespace-nowrap
      -translate-x-1/2 -translate-y-1/2"
      in:fade={{ duration: 500 }}
    >
      {message}
    </p>
  {/key}
</div>
