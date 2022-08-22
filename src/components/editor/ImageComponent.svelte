<script lang="ts">
    let edit = true;
    export let value: string;
    export let componentManagement;
</script>

{#if edit}
    <input
        autofocus={componentManagement.isNewest()}
        type="text"
        placeholder="Image source"
        bind:value
    />
    <button
        on:click={() => {
            edit = false;
        }}>Apply</button
    >
{:else}
    <img src={value} alt="" />
{/if}
