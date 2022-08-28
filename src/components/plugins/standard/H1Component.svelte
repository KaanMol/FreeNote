<script lang="ts">
    let ref: HTMLHeadingElement;

    export let state: string;

    export function focus() {
        ref.focus();
    }
</script>

<h1 bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</h1>

<style lang="scss">
    h1 {
        font-size: 3rem;
        font-weight: 600;
        line-height: 1.25em;

        margin-top: 3rem;
        margin-bottom: 1rem;
        padding-bottom: 0.3rem;

        border-bottom: 1px solid rgba(204, 204, 204, 0.2);
    }
</style>
