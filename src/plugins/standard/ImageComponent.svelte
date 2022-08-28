<script lang="ts">
    export let state: string;

    function uploadLocal(element) {
        let file = element.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            state = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
</script>

{#if !state}
    <input type="file" on:change={uploadLocal} />
{:else}
    <img src={state} alt="" />
{/if}
