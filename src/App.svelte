<script lang="ts">
    import { registerComponent } from "./components/definitions";
    import { clearDocument, insertInDocument, document, serializeDocument, deserializeDocument, documentRef } from "./components/document";
    import { CheckboxComponentDefinition } from "./components/plugins/standard/CheckboxComponent";
    import { CodeComponentDefinition } from "./components/plugins/standard/CodeComponent";
    import { H1ComponentDefinition } from "./components/plugins/standard/H1Component";
    import { H2ComponentDefinition } from "./components/plugins/standard/H2Component";
    import { H3ComponentDefinition } from "./components/plugins/standard/H3Component";
    import { ImageComponentDefinition } from "./components/plugins/standard/ImageComponent";
    import { TextComponentDefinition } from "./components/plugins/standard/TextComponent";
    import Spawner from "./components/Spawner.svelte";

    clearDocument();

    registerComponent(new H1ComponentDefinition());
    registerComponent(new H2ComponentDefinition());
    registerComponent(new H3ComponentDefinition());
    registerComponent(new CodeComponentDefinition());
    registerComponent(new CheckboxComponentDefinition());
    registerComponent(new ImageComponentDefinition());
    registerComponent(new TextComponentDefinition());

    insertInDocument(new H1ComponentDefinition(), "Hello world!");
    insertInDocument(new CodeComponentDefinition());
    insertInDocument(new TextComponentDefinition(), "This is some text");
    insertInDocument(new H2ComponentDefinition(), "Heading two");
    insertInDocument(new TextComponentDefinition(), "Images here ...");
    insertInDocument(new H3ComponentDefinition(), "Random image #1");
    insertInDocument(new TextComponentDefinition(), "This is a random image.");
    insertInDocument(new ImageComponentDefinition(), "https://picsum.photos/800/300");
    insertInDocument(new H3ComponentDefinition(), "Random image #2");
    insertInDocument(new TextComponentDefinition(), "This also, is a random image.");
    insertInDocument(new ImageComponentDefinition(), "https://picsum.photos/300/300");

    function save() {
        localStorage.setItem("save", serializeDocument());
    }

    function load() {
        deserializeDocument(localStorage.getItem("save"));
    }
</script>

<button on:click={() => save()}>Save</button>
<button on:click={() => load()}>Load</button>

<div class="elements">
    {#each $document as item, index}
        <div class="element">
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
