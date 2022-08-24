<script lang="ts">
    export let value: string;
    export let self;
    let edit = value === "" || value === undefined;
    function uploadLocal(element) {
        let file = element.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            value = reader.result as string;
            edit = false;
        };
        reader.readAsDataURL(file);
    }
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
    <input type="file" on:change={uploadLocal} />
    >
{:else}
    <img src={value} alt="" />
{/if}
