<script lang="ts">

  import {evaluations} from '../stores/store'

</script>

<div>
{console.log(evaluations)}
{console.log($evaluations)}
</div>

<style>
div {
  display: grid;
}
.row {
  display: grid;
  grid-template-columns: 1fr 50px ;
}
</style>