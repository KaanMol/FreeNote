<script lang="ts">
    let ref: HTMLInputElement | HTMLImageElement;
    export let state: string;

    export function focus() {
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

<style lang="scss">
    img {
        border: 1px solid rgba(204, 204, 204, 0.2);
        border-radius: 0.25rem;
        margin: 0.5rem 0;
    }
</style>
