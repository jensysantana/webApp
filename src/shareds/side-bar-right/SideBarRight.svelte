<script>
    import { getOpenWith } from "./../../stores/side-bar-right/sideBarRight";
    $: asideBar = $getOpenWith;
</script>

<aside class="control-sidebar control-sidebar-dark">
    {#if asideBar.openWith === "Chat"}
        <!-- <Chat /> -->
        <p>dsasasa</p>
    {/if}
</aside>

<style>
</style>
