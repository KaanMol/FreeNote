<script lang="ts">
    export class Test {}

    export let state: string;
</script>

<h1 contenteditable="true" bind:textContent={state}>{state}</h1>
