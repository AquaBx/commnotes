<script lang="ts">
  import {currentNotes,currentGroups} from '../stores/store'

  export let keygroup:string
  let mean = 0

  currentGroups.subscribe((value) => {
    let sum = 0
    let i = 0
    for (let keynote of Object.keys(value[keygroup].notes)){
      let dividende = 0
      let diviseur = 0

      let criteres = $currentNotes[keynote].criteres
      for (let keyCritere of Object.keys(criteres)){
        diviseur += criteres[keyCritere].note
        dividende += value[keygroup].notes[keynote].criteres[keyCritere].note

      }

      sum += dividende/diviseur*20
      i+=1
    }
    mean = parseFloat( parseFloat( sum / i ).toFixed(3) )
  })

</script>

<td>
  {mean}/20
</td>