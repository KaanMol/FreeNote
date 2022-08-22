<script lang="ts">
    import { document } from "../../components";
    export let value = "";
    export let self;
    function backspaceHandler(e) {
        // console.log(value);
        if (value === "" && e.key === "Backspace") {
            self.destroy();
        }
    }
</script>

<h1
    draggable="true"
    contenteditable="true"
    bind:textContent={value}
    autofocus={self.isNewest()}
    on:keydown={backspaceHandler}
>
    {value} ({self.isNewest()})
</h1>
