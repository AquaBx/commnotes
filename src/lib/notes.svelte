<script lang="ts">
  import {currentGroups,currentNotes,selectedGroupNote} from '../stores/store'

  let groups = $currentGroups
  let notes = $currentNotes

  let groupID:string = ""
  let noteID:string = ""

  selectedGroupNote.subscribe((value) => {

    groupID = value[0]
    noteID = value[1]

    if (groupID==="" && noteID==="") return

    if (! Object.keys( groups[groupID].notes ).includes(noteID)) {
      groups[groupID].notes[noteID] = {}
    }

  });

  function update(e,groupID,noteID,critereID) {
    groups[groupID].notes[noteID].criteres[critereID].note = parseInt(e.target.value)
    currentGroups.set(groups)
  }

</script>
<div>

  {#if ! (groupID==="" && noteID==="") }

  <h2>{notes[noteID].name} - {groups[groupID].name}</h2>

  <h3>Grille</h3>

  <table>
    {#each Object.keys(notes[noteID].criteres) as critereID}
    <tr>
      <td>{notes[noteID].criteres[critereID].name}</td>
      <td>
        <input bind:value={groups[groupID].notes[noteID].criteres[critereID].note} on:change={(e) => update(e,groupID,noteID,critereID)}>/{notes[noteID].criteres[critereID].note}
      </td>
    </tr>
    {/each}

  </table>

  <h3>Commentaire</h3>
  <textarea bind:value={groups[groupID].notes[noteID].commentaire}></textarea>
  {/if}
</div>