<script>
    export let name = "",
        styleX = "",
        errorFields = [];
</script>

{#if Array.isArray(errorFields)}
    {#each errorFields as item, i}
        {#if item.path === name}
            <p class="invalid" style={styleX}>{item.message}</p>
        {/if}
    {/each}
{/if}

<style>
    p.invalid {
        font-size: 14px;
        margin-top: -15px;
        margin-bottom: 1rem;
        color: #ff0000;
    }
</style>
