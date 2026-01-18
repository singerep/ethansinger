<script>
    import { fade, slide } from 'svelte/transition';
    import NavbarElement from '$lib/components/navbar/NavbarElement.svelte';

    const brand = { label: 'Ethan Singer', path: '/', fontSize: '20px', fontWeight: '500' };
    const navLinks = [
        { label: 'research', path: '/#research' },
        { label: 'software', path: '/#software' },
        { label: 'teaching', path: '/#teaching' },
        // { label: 'misc', path: '/pages/misc' },
    ];

    let innerWidth = $state(0);
    let isOpen = $state(false);

    let isMobile = $derived(innerWidth < 600);
    $effect(() => {
        if (!isMobile) {
            isOpen = false
        }
    })
</script>

<svelte:window bind:innerWidth />

<nav class="navbar-container" class:open={isOpen}>
    <div class="navbar-content">
        <div class="brand">
            <NavbarElement {...brand} />
        </div>

        {#if !isMobile}
            <div class="links-desktop">
                {#each navLinks as link}
                    <NavbarElement {...link} />
                {/each}
            </div>
        {:else}
            <button class="menu-toggle" onclick={() => isOpen = !isOpen} aria-label="Toggle Menu">
                {#if !isOpen}
                    <svg width="20" height="20" viewBox="0 0 16 14" transition:fade={{duration: 100}}>
                        <path d="M2 2H14M2 7H14M2 12H14" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                {:else}
                    <svg width="20" height="20" viewBox="0 0 13 13" transition:fade={{duration: 100}}>
                        <path d="M2 2L11 11M2 11L11 2" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                {/if}
            </button>
        {/if}
    </div>

    {#if isMobile && isOpen}
        <div class="navbar-dropdown" transition:slide={{ duration: 150 }}>
            {#each navLinks as link}
                <NavbarElement {...link} />
            {/each}
        </div>
    {/if}
</nav>

<style>
    .navbar-container {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
    }

    .navbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        max-width: calc(var(--body-width) - 40px);
        margin: 0 auto;
    }

    .links-desktop {
        display: flex;
        gap: 30px;
    }

    .navbar-dropdown {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-left: 20px;
        padding-bottom: 15px;
    }

    .menu-toggle {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>