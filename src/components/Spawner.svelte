<script lang="ts">
    import type { ComponentDefinition } from "./components";

    import { getComponents } from "./definitions";
    import { insertInDocument } from "./document";
    import { TextComponentDefinition } from "./plugins/standard/TextComponent";

    let ref: HTMLParagraphElement;
    let value: string;
    let mode: "none" | "command" | "shortcut";
    let filteredComponents: ComponentDefinition<any, any>[] = [];
    let autocomplete: string = "";
    let caretXY: [number, number] = [0, 0];
    let selectedSuggestionIndex = 0;

    export function focus() {
        ref.focus();
    }

    $: processValue(value);

    function processValue(value: string) {
        if (!value) {
            mode = "none";
            autocomplete = "";
            filteredComponents = [];
            return;
        }

        if (value.startsWith("/")) {
            mode = "command";
            filteredComponents = getComponents().filter((d) => d.shorthand.command.startsWith(value.substring(1)));
            autocomplete = filteredComponents.length > 0 ? filteredComponents[0].shorthand.command.substring(value.length - 1) : "";
        } else {
            mode = "shortcut";
            filteredComponents = getComponents().filter((d) => d.shorthand.shortcut.startsWith(value));
            autocomplete = filteredComponents.length > 0 ? filteredComponents[0].shorthand.shortcut.substring(value.length) : "";
        }

        selectedSuggestionIndex = Math.min(filteredComponents.length - 1, selectedSuggestionIndex);

        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var rect = range.getClientRects();
        caretXY = [rect[0].x, rect[0].y];
    }

    function keydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLParagraphElement }) {
        if (e.code === "ArrowDown" && filteredComponents.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = Math.min(filteredComponents.length - 1, selectedSuggestionIndex + 1);
        }

        if (e.code === "ArrowUp" && filteredComponents.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = Math.max(0, selectedSuggestionIndex - 1);
        }

        if (e.code === "Enter" || e.code === "Tab" || e.code === "Space") {
            e.preventDefault();
            if (filteredComponents.length > 0) {
                insertInDocument(filteredComponents[selectedSuggestionIndex]);
            } else {
                insertInDocument(new TextComponentDefinition(), value);
            }
            value = "";
        }
    }
</script>

<div class={"spawner"}>
    <div class="input">
        <p bind:this={ref} contenteditable="true" bind:textContent={value} on:keydown={(e) => keydown(e)} class={"mode-" + mode} />
        {#if autocomplete && filteredComponents.length == 1}
            <p class="autocomplete">{autocomplete}</p>
        {/if}
    </div>

    {#if filteredComponents.length > 0}
        <div class="suggestions" style={"left: " + caretXY[0] + "px; top: " + caretXY[1] + "px"}>
            {#each filteredComponents as suggestion, index}
                <div class={"suggestion " + (index === selectedSuggestionIndex ? "selected" : "")}>
                    {#if mode === "command"}
                        <span class="command">{suggestion.shorthand.command}</span>
                    {:else if mode === "shortcut"}
                        <span class="shortcut">{suggestion.shorthand.shortcut}</span>
                    {/if}
                    <span class="description">{suggestion.information.description}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .spawner {
        margin-bottom: 5rem;
    }

    p {
        flex-grow: 1;
    }

    .input {
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
            position: relative;
            flex-grow: 1;
        }

        .autocomplete {
            flex-grow: 100000;
            opacity: 0.5;
        }
    }

    .suggestions {
        position: fixed;
        margin-top: 1.5rem;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        .suggestion {
            padding: 0.25rem 0.5rem;

            &.selected {
                background-color: #ccc;
                color: black;
            }
        }

        .suggestion:not(:last-child) {
            border-bottom: 1px solid #ccc;
        }
    }
</style>
