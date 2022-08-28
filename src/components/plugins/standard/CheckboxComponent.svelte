<script lang="ts">
    let ref: HTMLInputElement;
    export let state: boolean;

    export function focus() {
        ref.focus();
    }
</script>

<label for="test">Lol</label>
<input bind:this={ref} id="test" type="checkbox" bind:checked={state} />
