<script lang="ts">
    let value = "";
    let showCommands = false;

    $: sketchyChecker(value);
    import { document, commands, lastId } from "../../components";
    import GenericComponent from "./GenericComponent.svelte";

    let visibleCommands = commands;

    function applies(command) {
        // return (
        //     //command.command.startsWith(value) ||
        //     command.shortcut.startsWith(value)
        // );
    }

    function sketchyChecker(value: string) {
        if (value.at(0) === "/") {
            showCommands = true;
        } else {
            showCommands = false;
        }

        visibleCommands = commands.filter((item) =>
            item.command.startsWith(value.substring(1))
        );

        commands.forEach((command) => {
            console.log(value.startsWith("/" + command.command));
            if (
                value.startsWith(command.shortcut) ||
                value.startsWith("/" + command.command)
            ) {
                $document[$document.length - 1] = {
                    ...$document[$document.length - 1],
                    component: command.component,
                    createdAt: Date.now(),
                };

                $document.push({
                    id: ++$lastId,
                    component: GenericComponent,
                    value: "",
                    createdAt: Date.now() - 1,
                });
            }
        });
    }
</script>

<p class="spawner" contenteditable="true" bind:textContent={value}>{value}</p>

<div class="commands-wrapper">
    <div class={"commands " + (showCommands ? "" : "hidden")}>
        {#each visibleCommands as command}
            <div
                class="command"
                on:click={() => {
                    value += command.command;
                }}
            >
                <div class="name">{command.name}</div>
                <div class="description">{command.description}</div>
                <div class="editor-command">/{command.command}</div>
                {#if command.shortcut !== undefined}
                    <div class="editor-shortcut">{command.shortcut}</div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .spawner {
        padding-right: 100px;
    }

    .commands-wrapper {
        position: relative;
        width: 100%;
    }

    .commands {
        &.hidden {
            opacity: 0;
            pointer-events: none;
        }

        transition: 200ms ease;

        opacity: 1;
        position: absolute;
        width: 200px;
        top: 0px;
        border: solid 2px gray;
        border-radius: 12px;

        .command {
            padding: 0.25rem 0.5rem;

            &:not(:last-child) {
                border-bottom: 2px solid gray;
            }

            .name {
                font-weight: bold;
            }

            .description {
                font-size: 0.8em;
            }

            .editor-command {
                font-family: monospace;
            }
        }
    }
</style>
