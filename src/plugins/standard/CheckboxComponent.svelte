<script lang="ts">
    export let state: boolean;
</script>

<label for="test">Lol</label>
<input id="test" type="checkbox" bind:checked={state} />
