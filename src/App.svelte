<script lang="ts">
  import { save,open } from "@tauri-apps/api/dialog";
  import { writeFile,readTextFile } from "@tauri-apps/api/fs";

  import NotesGroupes from "./routes/NotesGroupes.svelte";
  import NotesIndiv from "./routes/NotesIndiv.svelte";
  import ConfigGroupes from "./routes/ConfigGroupes.svelte";
  import ConfigEvaluations from "./routes/ConfigEvaluations.svelte";
  import { evaluations } from "./stores/store";

  let dir = "NotesIndiv"

  async function saveFile(){
    let path = await save({
      filters: [{
        name: 'json',
        extensions: ['json']
      }]
    })

    if (path === null) { alert("le fichier n'a pas été sauvegarder"); return }

    await writeFile({ path: path, contents: JSON.stringify($evaluations) });
  }

  async function loadFile(){
    let path = await open({
      multiple: false,
      filters: [{
        name: 'json',
        extensions: ['json'],
      }]
    })

    if (path === null) { alert("le fichier n'a pas été ouvert"); return }
    if ( Array.isArray(path) ) { alert("plusieurs fichiers sélectionner"); return }

    let fileData = await readTextFile( path );
    Object.assign($evaluations,JSON.parse(fileData))
    $evaluations.assignChilds()

  }

</script>

<h1>Comm'Notes</h1>

<button on:click={saveFile}>Save</button>
<button on:click={loadFile}>Load</button>

<main>
  <button on:click={() => {dir = "NotesIndiv"}}>NotesIndiv</button>
  <button on:click={() => {dir = "NotesGroupes"}}>NotesGroupes</button>
  <button on:click={() => {dir = "ConfigGroupes"}}>ConfigGroupes</button>
  <button on:click={() => {dir = "ConfigEvaluations"}}>ConfigEvaluations</button>
  {#if dir == "NotesIndiv"}
  <NotesIndiv></NotesIndiv>
  {:else if dir == "NotesGroupes"}
  <NotesGroupes></NotesGroupes>
  {:else if dir == "ConfigGroupes"}
  <ConfigGroupes></ConfigGroupes>
  {:else if dir == "ConfigEvaluations"}
  <ConfigEvaluations></ConfigEvaluations>
  {/if}



</main>
