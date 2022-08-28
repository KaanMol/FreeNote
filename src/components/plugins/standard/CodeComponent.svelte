<script lang="ts">
    import highlight from "highlight.js";

    import type { CodeComponentState } from "./CodeComponent";

    let ref: HTMLElement;
    let html: string;

    export let state: CodeComponentState;

    export function focus() {
        ref.focus();
    }

    $: html = highlight.highlight(state.language, state.code).value;
</script>

<div class="code">
    <pre class="fake" contenteditable="true" bind:this={ref} bind:textContent={state.code}><code>{state.code}</code></pre>
    <pre class="real" contenteditable="true" bind:innerHTML={html}><code class={"language-" + state.language}>{state.code}</code></pre>
</div>

<style lang="scss">
    .code {
        position: relative;
        caret-color: white;
        border: 1px solid rgba(204, 204, 204, 0.2);
        border-radius: 0.5rem;
        margin: 1rem 0;
        background-color: black;

        pre {
            padding: 2rem;
            width: 100%;
            margin: 0;
        }

        .fake {
            position: relative;
            top: 0;
            left: 0;
            color: transparent;
        }

        .real {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
        }
    }
</style>
