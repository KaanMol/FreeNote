<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import KanbanBoard from "./KanbanBoard.svelte";

    export let self;
    export let value = [
        {
            id: 1,
            name: "TODO",
            items: [
                { id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" },
            ],
        },
        {
            id: 2,
            name: "DOING",
            items: [{ id: 4, name: "item4" }],
        },
        {
            id: 3,
            name: "DONE",
            items: [{ id: 5, name: "item5" }],
        },
    ];

    function backspaceHandler(e) {
        // console.log(value);
        if (value === "" && e.key === "Backspace") {
            self.destroy();
        }
    }
</script>

<KanbanBoard columnItems={value} />
