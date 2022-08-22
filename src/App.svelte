<script lang="ts">
    import { document } from "./components";
    import GenericComponent from "./components/editor/GenericComponent.svelte";

    let hoverIndex = -1;
    let isHovering = false;
    let newestComponentIndex = 0;

    function dragStart(event: DragEvent, index: number) {
        console.log("dragstart", index, event);
    }

    function drop(event: DragEvent, index: number) {
        console.log("drop", index, event);
    }

    function dragEnter(event: DragEvent, index: number) {
        console.log("dragenter", index, event);
        hoverIndex = index;
    }

    function reset() {
        document.set([
            {
                component: GenericComponent,
                value: "",
                createdAt: Date.now(),
            },
        ]);
    }

    $: newestComponentIndex = $document.indexOf(
        $document.reduce((prev, current) =>
            prev.createdAt > current.createdAt ? prev : current
        )
    );

    export let items;
</script>

<button on:click={() => reset()}>clear</button>
<p>hoverindex: {hoverIndex}</p>
<p>latestindex: {newestComponentIndex}</p>
<div class="items" bind:this={items}>
    {#each $document as item, index}
        <div
            class={"item " + (hoverIndex === index ? "hover" : "")}
            draggable="true"
            on:dragstart={(e) => dragStart(e, index)}
            on:drop|preventDefault={(e) => drop(e, index)}
            on:dragenter={(e) => dragEnter(e, index)}
        >
            <svelte:component
                this={item.component}
                bind:value={item.value}
                newestComponent={newestComponentIndex === index}
            />
        </div>
    {/each}
</div>

<style lang="scss">
    .items {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .item {
            &.hover {
                background-color: #eee;
            }
        }
    }
</style>
