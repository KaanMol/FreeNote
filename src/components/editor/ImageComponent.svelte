<script lang="ts">
    export let value: string;
    export let self;
    let edit = value === "";
</script>

{#if edit}
    <input
        autofocus={self.isNewest()}
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
