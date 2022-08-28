<script lang="ts">
    let ref: HTMLInputElement | HTMLImageElement;
    export let state: string;

    export function focus() {
        console.log("image");
        ref.focus();
    }

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
    <input bind:this={ref} type="file" on:change={uploadLocal} />
{:else}
    <img bind:this={ref} src={state} alt="" />
{/if}
