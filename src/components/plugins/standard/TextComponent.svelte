<script lang="ts">
    let ref: HTMLParagraphElement;

    export let state: string;

    export function focus() {
        ref.focus();

        // Position the caret at the end of the text
        let range = document.createRange();
        range.selectNodeContents(ref);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
</script>

<p bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</p>

<style lang="scss">
    p {
        line-height: 1.5em;
        margin: 0.5rem 0;
    }
</style>
