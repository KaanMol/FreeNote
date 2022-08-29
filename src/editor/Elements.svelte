<script lang="ts">
    import Spawner from "../components/Spawner.svelte";
    import { document, documentRef } from "../components/document";
</script>

<div class="elements">
    {#each $document as item, index (item.id)}
        <div
            class="element"
        >
            <svelte:component this={item.definition.componentType} bind:this={documentRef[index]} bind:state={item.state} />
        </div>
    {/each}
    <Spawner />
</div>

<style lang="scss">
    .elements {
        display: flex;
        flex-direction: column;

        .element {
            width: 100%;
        }
    }
</style>
