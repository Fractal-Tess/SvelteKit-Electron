<script lang="ts">
  const versions = Object.entries(api.versions.all());
</script>

<ul class="grid grid-cols-2 md:grid-cols-3">
  {#each versions as [key, val]}
    <li class="mx-14">{key} - {val}</li>
  {/each}
</ul>
