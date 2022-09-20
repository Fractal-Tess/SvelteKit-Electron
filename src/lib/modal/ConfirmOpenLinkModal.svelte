<script lang="ts">
  export let msg = 'message not set';
  export let btnMsg = 'confrim';
  export let confirm: (event: Event) => void = () =>
    console.log('Button unbound');
  export let cancel: (event: Event) => void = () =>
    console.log('Button unbound');
</script>

<div
  class="flex justify-center items-center h-full w-full absolute dev backdrop-blur-sm"
>
  <div
    class="flex flex-col gap-4 justify-between rounded-2xl w-72 h-32 bg-primary text-primary-content text-2xl font-bold p-2"
  >
    <p class="mx-auto">{msg}</p>
    <div class="uppercase flex justify-center gap-4 ">
      <button class="btn btn-sm shadow-lg" on:click={confirm}>{btnMsg}</button>

      <button class="btn btn-sm shadow-lg" on:click={cancel}>cancel</button>
    </div>
  </div>
</div>
