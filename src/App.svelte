<script lang="ts">
    import { document } from "./components";
</script>

<div class="items">
    {#each $document as item}
        <svelte:component this={item.component} bind:value={item.value} />
    {/each}
</div>

<style lang="scss">
    .items {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
