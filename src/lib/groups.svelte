<!-- <script lang="ts">
  import {currentGroups,currentEvals,selectedGroupNote} from '../stores/store'

  import NotesMean from './notesMean.svelte';
  import NotesGlobalMean from './notesGlobalMean.svelte';

  let groups = {}
  let notes  = {}

  currentGroups.subscribe(($value) => {
    groups = $value
  })

  currentEvals.subscribe(($value) => {
    notes = $value
  })

  function selected(groupeID:string,noteID:string){
    selectedGroupNote.set([groupeID,noteID])
  }

  for (let keygroup of Object.keys(groups)) {
    for (let keynote of Object.keys(notes)) {
      if ( ! Object.keys( groups[keygroup].notes ).includes(keynote) ) {
        $currentGroups[keygroup].notes[keynote] = JSON.parse(JSON.stringify($currentEvals[keynote]))
      }
    }
  }


</script>



<style>

  table td {
    border: 1px solid grey;
  }

</style> -->