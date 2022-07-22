<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';

  let message = '';

  const callElectron = () => {
    message = api.example();
  };
</script>

<div class="flex flex-col gap-8 items-center font-bold">
  <h1 class="text-4xl mt-16">Welcome</h1>
  <h2 class="text-xl">
    This is a <span class="bg-secondary text-secondary-content rounded-md p-1"
      >SvelteKit Electron Typescript Tailwind</span
    > Template
  </h2>

  <button
    on:click={callElectron}
    class=" font-extrabold btn btn-outline btn-secondary btn-md"
    >Call Electron</button
  >
  {#key message}
    <div
      class="border-b-2 border-secondary outline-secondary text-2xl"
      in:fade={{ duration: 500 }}
    >
      {message}
    </div>
  {/key}
  <img src="favicon.png" alt="" srcset="" />
</div>
