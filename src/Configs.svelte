<script lang="ts">
  import Groups from './lib/Configs/Groups.svelte'
  import Notes from './lib/Configs/Baremes.svelte'
</script>


<h1>Comm'Notes</h1>

<div class="flex">
    <Groups></Groups>
    <Notes></Notes>
</div>


<style>

  .flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    text-align: left;
    gap : 16px;
  }


</style>