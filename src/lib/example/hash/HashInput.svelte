<script lang="ts">
  let hashInput = 'Hello world';
  let hashOutput: string;
  $: {
    hashOutput = api.sha256sum(hashInput);
  }
</script>

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
