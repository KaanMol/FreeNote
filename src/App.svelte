<script lang="ts">
    import { registerComponent } from "./components/definitions";
    import { clearDocument, insertInDocument, document, serializeDocument, deserializeDocument } from "./document";
    import { CheckboxComponentDefinition } from "./plugins/standard/CheckboxComponent";
    import { H1ComponentDefinition } from "./plugins/standard/H1Component";
    import { ImageComponentDefinition } from "./plugins/standard/ImageComponent";
    import { TextComponentDefinition } from "./plugins/standard/TextComponent";

    clearDocument();

    registerComponent(new H1ComponentDefinition());
    registerComponent(new CheckboxComponentDefinition());
    registerComponent(new ImageComponentDefinition());
    registerComponent(new TextComponentDefinition());

    insertInDocument(new H1ComponentDefinition(), "Hello world!");
    insertInDocument(new ImageComponentDefinition(), "");

    function save() {
        localStorage.setItem("save", serializeDocument());
    }

    function load() {
        deserializeDocument(localStorage.getItem("save"));
    }
</script>

<button on:click={() => save()}>Save</button>
<button on:click={() => load()}>Load</button>

<div class="items">
    {#each $document as item}
        <svelte:component this={item.definition.componentType} bind:state={item.state} />
    {/each}
</div>
