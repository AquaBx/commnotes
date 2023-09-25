<script lang="ts">
  import {currentGroups,currentNotes,selectedGroupNote} from '../stores/store'

  import NotesMean from './notesMean.svelte';
  import NotesGlobalMean from './notesGlobalMean.svelte';

  let groups = {}
  let notes  = {}

  currentGroups.subscribe(($value) => {
    groups = $value
  })

  currentNotes.subscribe(($value) => {
    notes = $value
  })

  function selected(groupeID:string,noteID:string){
    selectedGroupNote.set([groupeID,noteID])
  }

  for (let keygroup of Object.keys(groups)) {
    for (let keynote of Object.keys(notes)) {
      if ( ! Object.keys( groups[keygroup].notes ).includes(keynote) ) {
        $currentGroups[keygroup].notes[keynote] = JSON.parse(JSON.stringify($currentNotes[keynote]))
      }
    }
  }


</script>

<table>
  <tr>
    <td></td>
    <td>Moyenne Globale</td>
    {#each Object.keys(notes) as keynote}
      <td>{notes[keynote].name}</td>
    {/each}
  </tr>   

 {#each Object.keys(groups) as  keygroup}
    <tr>
      <td>{groups[keygroup].name}</td>
      <td>
        <NotesGlobalMean keygroup={keygroup}></NotesGlobalMean>
      </td>
      {#each Object.keys(notes) as keynote}
        <td>
          
          <NotesMean keygroup={keygroup} keynote={keynote}></NotesMean>
          <button on:click={(e) => selected(keygroup,keynote)}>Cliquer Pour Modifier</button>
        </td>
      {/each}

    </tr>

    {#each groups[keygroup].members as member}
        <tr>
          <td>{member.name}</td>
        </tr>
    {/each}
 {/each}

</table>

<style>

  table td {
    border: 1px solid grey;
  }

</style>