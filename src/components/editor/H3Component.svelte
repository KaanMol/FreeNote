<script lang="ts">
    import type { ComponentManagement } from "src/common/commands";

    export let value = "";
    export let self: ComponentManagement;

    function backspaceHandler(e) {
        // console.log(value);
        if (value === "" && e.key === "Backspace") {
            self.destroy();
        }
    }
</script>

<h3
    draggable="true"
    contenteditable="true"
    bind:textContent={value}
    autofocus={self.isNewest()}
    on:keydown={backspaceHandler}
>
    {value} ({self.isNewest()})
</h3>
