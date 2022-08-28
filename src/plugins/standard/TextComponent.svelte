<script lang="ts">
    export let state: string;
</script>

<p contenteditable="true" bind:textContent={state}>{state}</p>
