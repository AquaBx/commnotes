<script>
    import Configs from "./Configs.svelte";
    import Main from "./Main.svelte";

    let dir = "Home"
</script>

<main>
  <button on:click={() => {dir = "Home"}}>Home</button>
  <button on:click={() => {dir = "Configs"}}>Configs</button>
  {#if dir == "Home"}
  <Main></Main>
  {:else if dir == "Configs"}
  <Configs></Configs>
  {/if}

</main>
