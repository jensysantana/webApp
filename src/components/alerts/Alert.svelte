<script>
    export let propes;
    let { strongText, text, text2, onClick, color, closer } = propes;
</script>

<div class={`alert ${color} alert-dismissible fade show`} role="alert">
    <!-- <h4 class="mb-0"><strong>{@html strongText}</strong></h4>
    <div class="mt-0 mmx" />
    <p class="message">{@html text}</p>
    -->

    <!-- <h4 class="alert-heading">{@html strongText}</h4>
    <hr />
    <p>{@html text}</p>
    {#if text2}
        <p class="mb-0">{@html text2}</p>
    {/if}
     -->
    <!-- <div class="alert alert-warning alert-dismissible fade show" role="alert"> -->
    <strong>{@html strongText}</strong>
    <p>{@html text}</p>
    {#if text2}
        <p>{@html text2}</p>
    {/if}
    {#if !closer}
        <button
            type="button"
            on:click
            class="close"
            data-dismiss="alert"
            aria-label="Close"
        >
            <span aria-hidden="true">&times;</span>
        </button>
    {/if}
    <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button> -->
    <!-- </div> -->
</div>

<style>
    /* h4 {
        font-size: 1.2rem;
    } */
    .mmx {
        border-top: 1px solid #555;
        position: absolute;
        width: 100%;
        top: 39px;
        left: 0;
        right: 0;
    }
    /* hr {
        margin-top: -0.3rem;
    } */
</style>
