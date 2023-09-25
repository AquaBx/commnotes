<script lang="ts">
  import {currentNotes,derivedCurrentGroups} from '../stores/store'

  export let keygroup:string
  export let keynote:string

  let criteres = $currentNotes[keynote].criteres

  let sumCriteres = (() => {
    let sum = 0
    for (let item of Object.values(criteres)){
      sum += item.note
    }
    return sum
  })()

  let mynotes = derivedCurrentGroups(keygroup,keynote)
  let mesnotes = 0



  mynotes.subscribe((val)=>{
    mesnotes = parseFloat( parseFloat( val/sumCriteres*20 ).toFixed(3) )
  })

</script>

<td>
  {mesnotes}/20
</td>