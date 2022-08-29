<script lang="ts">
    import Spawner from "../components/Spawner.svelte";
    import { document, documentRef } from "../components/document";
    import { flip } from "svelte/animate";
    import ElementActions from "./ElementActions.svelte";

    let hoveredId: string | undefined = undefined;

    function reorder({ from, to }) {
        if (from === to) return;
        if (from === undefined) return;
        if (from === "undefined") return;

        let newDocument = [...$document];
        newDocument[from] = [newDocument[to], (newDocument[to] = newDocument[from])][0];

        console.log("Reordering", from, to);

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
        if (hoveredId !== dragged.id) hoveredId = dragged.id;
    }

    function dragleave(e) {
        let dragged = getDraggedParent(e.target);
        if (hoveredId === dragged.id) hoveredId = undefined;
    }

    function drop(e) {
        hoveredId = undefined;
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
            class:over={item.id === hoveredId}
            animate:flip={{ duration: 300 }}
        >
            <div class="options">
                <ElementActions bind:instance={item} />
            </div>
            <div class="component">
                <svelte:component this={item.definition.componentType} bind:this={documentRef[index]} bind:state={item.state} />
            </div>
        </div>
    {/each}
    <div class="spawner element">
        <Spawner />
    </div>
</div>

<style lang="scss">
    .elements {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .element {
            width: 100%;
            border: 1px solid transparent;
            border-radius: 5px;
            transition: border 200ms ease;
            display: flex;

            &.over {
                border: 1px solid #ccc;
            }

            .holder {
                width: 100px;
                cursor: grab;
            }

            .component {
                width: 100%;
            }

            .options {
                flex-grow: 1;
            }
        }
    }

    .spawner {
        display: flex;
        flex-grow: 1;
    }
</style>
