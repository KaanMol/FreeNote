<script lang="ts">
    import type { ComponentDefinition } from "./components";
    import { getComponents } from "./definitions";
    import { insertInDocument } from "./document";
    import { TextComponentDefinition } from "./plugins/standard/TextComponent";

    $: processValue(value);

    let ref: HTMLParagraphElement;
    let value: string;

    let mode: "none" | "command" | "shortcut";

    let filteredComponents: ComponentDefinition<any>[] = [];
    let selectedSuggestionIndex = 0;
    let autocomplete: string = "";

    let caretPosition: { x: number; y: number } = { x: 0, y: 0 };

    export function focus() {
        ref.focus();
    }

    // Ran on value change
    function processValue(value: string) {
        if (!value) {
            mode = "none";
            autocomplete = "";
            filteredComponents = [];
            selectedSuggestionIndex = 0;
        } else if (value.startsWith("/")) {
            mode = "command";
            filteredComponents = getComponents().filter((d) => d.shorthand.command.startsWith(value.substring(1)));
            autocomplete = filteredComponents.length > 0 ? filteredComponents[0].shorthand.command.substring(value.length - 1) : "";
        } else {
            mode = "shortcut";
            filteredComponents = getComponents().filter((d) => d.shorthand.shortcut.startsWith(value));
            autocomplete = filteredComponents.length > 0 ? filteredComponents[0].shorthand.shortcut.substring(value.length) : "";
        }

        // Update caret position
        caretPosition = getCaretPosition();
    }

    function keydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLParagraphElement }) {
        // Process suggestions
        if (filteredComponents.length > 0) {
            if (e.code === "ArrowDown") {
                e.preventDefault();
                selectedSuggestionIndex++;
            } else if (e.code === "ArrowUp") {
                e.preventDefault();
                selectedSuggestionIndex--;
            }

            // Generate autocomplete value
            if (mode === "command") {
                autocomplete = filteredComponents[selectedSuggestionIndex].shorthand.command.substring(value.length - 1);
            } else if (mode === "shortcut") {
                autocomplete = filteredComponents[selectedSuggestionIndex].shorthand.shortcut.substring(value.length);
            }
        }

        // Process component insertion
        if (e.code === "Enter" || e.code === "Tab" || e.code === "Space") {
            e.preventDefault();

            // If there are no filtered components, insert the value as a TextComponent
            if (filteredComponents.length > 0) {
                insertInDocument(filteredComponents[selectedSuggestionIndex]);
            } else {
                insertInDocument(new TextComponentDefinition(), value);
            }

            value = "";
        }

        // Make sure the selected suggestion is in the range of filtered components
        selectedSuggestionIndex = Math.max(0, Math.min(selectedSuggestionIndex, filteredComponents.length - 1));
    }

    function getCaretPosition() {
        try {
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var rect = range.getClientRects();
            return { x: rect[0].x, y: rect[0].y };
        } catch {
            return { x: 0, y: 0 };
        }
    }
</script>

<div class="spawner">
    <div class="input">
        <p bind:this={ref} contenteditable="true" bind:textContent={value} on:keydown={(e) => keydown(e)} class={"mode-" + mode} />
        {#if autocomplete}
            <p class="autocomplete">{autocomplete}</p>
        {/if}
    </div>

    {#if filteredComponents.length > 0}
        <div class="suggestions" style={"left: " + caretPosition.x + "px; top: " + caretPosition.y + "px"}>
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
        margin-bottom: 15rem;
        flex-grow: 1;
    }

    .mode-none {
        flex-grow: 1;
    }

    p {
        flex-grow: 1;
    }

    .input {
        display: flex;
        flex-grow: 1;
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

            .command {
                font-weight: bold;
                font-family: monospace;
                border: 1px solid #ccc;
                padding: 0 0.25rem;
                border-radius: 0.5rem;
                margin: 0;
                line-height: 1;
            }
        }

        .suggestion:not(:last-child) {
            border-bottom: 1px solid #ccc;
        }
    }
</style>
