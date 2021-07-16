<script>
    export let message = "",
        styleX = "";
</script>

<p class="invalid" style={styleX}>
    <i class="fas fa-exclamation-circle" />
    {message}
</p>

<style>
    p.invalid {
        font-size: 14px;
        margin-top: -15px;
        margin-bottom: 1rem;
        color: #ff0000;
    }
</style>
