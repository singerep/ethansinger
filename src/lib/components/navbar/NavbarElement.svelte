<script>
	export let path = '/';
	export let label;
    export let type = 'text';
    export let fontSize = '16px'
    export let fontWeight = '500'
    // export let margin = '15px'
</script>

<div class="navbar-element">
    <a class={type} href="{path}" style="font-size: {fontSize}; font-weight: {fontWeight};"><span>{label}</span></a>
</div>


<style>
    div {
        position: relative;
        vertical-align: middle;
    }

    a {
        text-decoration: none;
        color: black;
        transition: 200ms;
        margin: auto;
        vertical-align: middle;
    }
    
    a.text:hover {
        color: #777;
    }

    span {
        position: relative;
        text-align: center;
        top: calc(((-1em / 1.25) + 2ex) / 2);
    }
</style>