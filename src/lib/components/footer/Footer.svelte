<script>
    const year = new Date().getFullYear()
</script>

<div class="footer">
    <div class="footer-content">
        © Copyright {year} Ethan Singer. Made with ❤️, <a href="https://svelte.dev/">svelte</a>, <a href="https://archieml.org/">ArchieML</a>, <a href="http://ai2html.org/">ai2html</a> and <a href="https://vercel.com/">vercel</a>.
    </div>
</div>

<style>
    div.footer {
        margin-top: 50px;
        /* position: absolute;
        left: 0;
        bottom: 0; */
        width: 100%;
        background-color: var(--slate);
        padding: 20px 0px;
        color: white;
        font-weight: 300;
    }

    div.footer-content {
        width: calc(100% - 40px);
        margin: auto;
    }

    a {
        color: white;
    }
</style>