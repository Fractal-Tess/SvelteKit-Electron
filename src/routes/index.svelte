<script lang="ts">
  import CallElectron from '$lib/example/call-electron/CallElectron.svelte';
  import HashInput from '$lib/example/hash/HashInput.svelte';
  import Versions from '$lib/example/versions/Versions.svelte';
</script>

<div class="flex flex-col gap-8 items-center font-bold">
  <h1 class="text-4xl mt-16">Welcome</h1>
  <h2 class="text-xl">
    This is a <span class="bg-primary text-primary-content rounded-md p-1"
      >SvelteKit Electron Typescript Tailwind</span
    > Template
  </h2>

  <CallElectron />
  <HashInput />
  <Versions />
</div>
