<script lang="ts">
    let value = "";
    let showCommands = false;

    $: sketchyChecker(value);

    import { document, commands } from "../../components";
    import GenericComponent from "./GenericComponent.svelte";

    function sketchyChecker(value: string) {
        if (value === "/") {
            showCommands = true;
        } else {
            showCommands = false;
        }

        commands.forEach((command) => {
            if (
                value.startsWith(command.shortcut) ||
                value.startsWith("/" + command.command)
            ) {
                $document[$document.length - 1] = {
                    component: command.component,
                    createdAt: Date.now(),
                    value: value.substring(
                        command.command.length + 1,
                        value.length
                    ),
                };

                $document.push({
                    component: GenericComponent,
                    value: "",
                    createdAt: Date.now() - 1,
                });
            }
        });
    }
</script>

<input type="text" bind:value autocomplete="off" />

{#if showCommands}
    <div class="commands">
        {#each commands as command}
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
{/if}

<style lang="scss">
    .commands {
        position: absolute;
        border: solid 2px red;
        border-radius: 12px;

        .command {
            &:not(:last-child) {
                border-bottom: 2px solid red;
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
