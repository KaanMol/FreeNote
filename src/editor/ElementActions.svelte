<script lang="ts">
    import type { ComponentInstance } from "src/components/components";
    import { onMount } from "svelte";

    export let instance: ComponentInstance<any>;

    let menuIsShown = false;

    function showmenu() {
        menuIsShown = true;
    }

    function hidemenu() {
        menuIsShown = false;
    }
</script>

<div class="options">
    <div class="actions" on:focus={showmenu} on:blur={hidemenu}>
        <span class="material-icons dragger">drag_indicator</span>
        <div class="menu" class:shown={true}>
            {#each instance.definition.actions as action}
                <div class="action" on:click={action.handler}>
                    <p>
                        <span class="material-icons">{action.icon}</span>
                        <span>{action.name}</span>
                    </p>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .options {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        cursor: pointer;
        opacity: 0;
        transition: all 200ms ease;

        &:hover {
            opacity: 1;
        }

        .material-icons {
            width: 20px;
            margin: 0;
            line-height: 20px;
            font-size: 1.5rem;
            padding: 0.5rem;
            text-align: left;
        }

        .dragger {
            cursor: grab;
            background: none;
            border: none;

            &:focus {
                background: red;
            }
        }

        .menu {
            position: absolute;
            display: flex;
            flex-direction: column;

            .action {
                display: flex;
                margin: 0;
            }
        }
    }
</style>
