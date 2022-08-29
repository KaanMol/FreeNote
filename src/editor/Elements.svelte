<script lang="ts">
    import Spawner from "../components/Spawner.svelte";
    import { document, documentRef } from "../components/document";
    import { flip } from "svelte/animate";

    let hoveredIndex: number | undefined = undefined;

    function reorder({ from, to }) {
        let newDocument = [...$document];
        newDocument[from] = [newDocument[to], (newDocument[to] = newDocument[from])][0];
        $document = newDocument;
    }

    function getDraggedParent(node) {
        return node.dataset && node.dataset.index ? node.dataset : getDraggedParent(node.parentNode);
    }

    function dragstart(e) {
        e.dataTransfer.setData("source", e.target.dataset.index);
    }

    function dragover(e) {
        e.preventDefault();
        let dragged = getDraggedParent(e.target);
        if (hoveredIndex !== dragged.id) hoveredIndex = JSON.parse(dragged.id);
    }

    function dragleave(e) {
        let dragged = getDraggedParent(e.target);
        if (hoveredIndex === dragged.id) hoveredIndex = undefined;
    }

    function drop(e) {
        hoveredIndex = undefined;
        e.preventDefault();
        let dragged = getDraggedParent(e.target);
        let from = e.dataTransfer.getData("source");
        let to = dragged.index;
        reorder({ from, to });
    }
</script>

<div class="elements">
    {#each $document as item, index (item.id)}
        <div
            class="element"
            draggable="true"
            on:dragstart={dragstart}
            on:dragover={dragover}
            on:dragleave={dragleave}
            on:drop={drop}
            data-index={index}
            data-id={item.id}
            class:over={item.id === hoveredIndex}
            animate:flip={{ duration: 300 }}
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
            border: 1px solid transparent;
            border-radius: 5px;
            transition: border 200ms ease;

            &.over {
                border: 1px solid #ccc;
            }
        }
    }
</style>
