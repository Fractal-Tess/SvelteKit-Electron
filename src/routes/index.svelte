<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';

  let message = '';
  let hashInput = 'Hello world';
  let hashOutput: string;
  $: {
    hashOutput = api.sha256sum(hashInput);
  }

  const callElectron = () => {
    message = api.example();
  };
  const versions = Object.entries(api.versions.all());
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

  <span class="text-center -mb-4 text-md">{hashOutput}</span>
  <div class="form-control">
    <label class="input-group">
      <span>Hash string</span>
      <input
        bind:value={hashInput}
        type="text"
        class="input input-bordered input-secondary focus:ring-secondary focus:border-secondary focus:outline-none"
      />
    </label>
  </div>

  <ul class="grid grid-cols-2 grid- ">
    {#each versions as [key, val]}
      <li class="mx-14">{key} - {val}</li>
    {/each}
  </ul>
</div>
