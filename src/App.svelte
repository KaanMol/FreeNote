<script lang="ts">
    import { ComponentManagement } from "./common/commands";
    import { dndzone } from "svelte-dnd-action";

    import { document, lastId } from "./components";
    import GenericComponent from "./components/editor/GenericComponent.svelte";
    import H1Component from "./components/editor/H1Component.svelte";
    import Kanabn from "./components/editor/Kanban.svelte";
    import Kanban from "./components/editor/Kanban.svelte";

    let hoverIndex = -1;
    let isHovering = false;
    let newestComponentIndex = 0;

    let board = [
        {
            id: 1,
            name: "TODO",
            items: [
                { id: 41, name: "item41" },
                { id: 42, name: "item42" },
                { id: 43, name: "item43" },
                { id: 44, name: "item44" },
                { id: 45, name: "item45" },
                { id: 46, name: "item46" },
                { id: 47, name: "item47" },
                { id: 48, name: "item48" },
                { id: 49, name: "item49" },
            ],
        },
        {
            id: 2,
            name: "DOING",
            items: [],
        },
        {
            id: 3,
            name: "DONE",
            items: [],
        },
    ];

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
                id: 1,
                component: H1Component,
                value: "Test 1",
                createdAt: Date.now(),
            },
            {
                id: 2,
                component: GenericComponent,
                value: "",
                createdAt: Date.now(),
            },
        ]);
        $lastId = 2;
    }

    $: newestComponentIndex = $document.indexOf(
        $document.reduce((prev, current) =>
            prev.createdAt > current.createdAt ? prev : current
        )
    );

    export let items;

    function backspaceManager(e) {
        const index = e.target.parentElement.getAttribute("data-index");
        console.log(index);
    }

    function handleDndConsider(e) {
        console.log("considering", e);
        $document = e.detail.items;
    }

    function handleDndFinalize(e) {
        console.log("finalizing", e);
        $document = e.detail.items;
    }
</script>

<button on:click={() => reset()}>clear</button>
<p>hoverindex: {hoverIndex}</p>
<p>latestindex: {newestComponentIndex}</p>

<div
    class="items"
    use:dndzone={{ items: $document }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
    bind:this={items}
    on:keydown={backspaceManager}
>
    {#each $document as item, index (item.id)}
        <div
            data-index={index}
            class={"item " + (hoverIndex === index ? "hover" : "")}
            draggable="true"
            on:dragstart={(e) => dragStart(e, index)}
            on:drop|preventDefault={(e) => drop(e, index)}
            on:dragenter={(e) => dragEnter(e, index)}
        >
            <div class="item-content">
                <svelte:component
                    this={item.component}
                    class="content"
                    bind:value={item.value}
                    self={new ComponentManagement(
                        index,
                        newestComponentIndex === index
                    )}
                />
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .items {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .item {
            padding-left: 50px;

            &.hover {
                background-color: #eee;
            }

            .item-content {
                z-index: 10;
                cursor: text;
            }
        }
    }
</style>
