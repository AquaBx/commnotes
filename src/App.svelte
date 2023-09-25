<script lang="ts">
  import Groups from './lib/groups.svelte'
  import Notes from './lib/notes.svelte'

  import {currentGroups,currentNotes} from './stores/store'

  let groups = $currentGroups
  let notes = $currentNotes

</script>

<main>
  <h1>Comm'Notes</h1>

  <div class="flex">
      <Groups></Groups>

      <Notes></Notes>
  </div>


</main>


<style>

  .flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    text-align: left;
    gap : 16px;
  }


</style>