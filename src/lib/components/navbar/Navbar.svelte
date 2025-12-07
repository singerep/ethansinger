<script>
    import { fade, slide } from 'svelte/transition';
    import NavbarElement from '$lib/components/navbar/NavbarElement.svelte';
	import { onMount } from 'svelte';

    let mounted = false;

    onMount(() => {
        mounted = true
    })

    const groups = [
        {
            slots: [
                {
                    collapse: false,
                    props: {
                        label: 'Ethan Singer',
                        path: '/',
                        fontSize: '20px',
                        fontWeight: '500'
                    }
                }
            ],
            style: 'justify-content: flex-start;'
        },
        {
            slots: [
                {
                    collapse: true,
                    props: {
                        label: 'research',
                        path: '/#research',
                    }
                },
                {
                    collapse: true,
                    props: {
                        label: 'software',
                        path: '/#software',
                    }
                },
                {
                    collapse: true,
                    props: {
                        label: 'teaching',
                        path: '/#teaching',
                    }
                },
                // {
                //     collapse: true,
                //     props: {
                //         label: 'pictures',
                //         path: '/pictures',
                //     }
                // }
            ],
            style: 'justify-content: flex-end; gap: 30px;'
        }
    ]

    const slots = Array.prototype.concat(...groups.map((group) => group.slots));
    const noCollapseSlots = slots.filter((slot) => slot.collapse == false)
    const collapseSlots = slots.filter((slot) => slot.collapse == true)

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0

    var isOpen = false
    $: isMobile = outerWidth < 600

</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

{#if mounted}
<div class="navbar-container {isOpen ? 'open' : 'closed'}">
    <div class="navbar">
        {#if isMobile == false}
            {#each groups as group, i}
                <div class="navbar-group" style="{group.style}">
                    {#each group.slots as slot, j}
                        <NavbarElement {...slot.props} />
                    {/each}
                </div>
            {/each}
        {:else}
            <div class="navbar-group" style="justify-content: space-between; width: 100%">
                {#each noCollapseSlots as slot, i}
                    <NavbarElement {...slot.props}/>
                {/each}
                <button on:click={(e) => {isOpen = !isOpen}}>
                    {#if !isOpen}
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" transition:fade={{duration : 100}}>
                            <path d="M2 2H14" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M2 7H14" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M2 12H14" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    {:else}
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" transition:fade={{duration : 100}}>
                            <path d="M2 2L11 11" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M2 11L11 2" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    {/if}
                </button>
            </div>
        {/if}
    </div>
    {#if isMobile & isOpen}
        <div class="navbar-dropdown" transition:slide={{ duration: 150 }}>
            {#each collapseSlots as slot}
                <NavbarElement {...slot.props}/>
            {/each}
        </div>
    {/if}
</div>    
{/if}

<style>
    div.navbar-container {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    div.navbar-container.closed {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
    }

    div.navbar {
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 40px);
        height: 60px;
        max-width: calc(var(--body-width) - 40px);
        margin: 0px auto;
    }

    div.navbar-group {
        display: flex;
        align-items: center;
        height: 100%;
        width: 33%;
    }

    div.navbar-dropdown {
        position: fixed;
        top: 60;
        width: 100%;
        background-color: white;
        z-index: 1001;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        gap: 15px;
        padding-left: 15px;
        padding-bottom: 10px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
        clip-path: inset(0px -12px -12px -12px);
    }

    button {
        background-color: transparent;
        border: none;
        position: relative;
        height: 100%;
    }

    button svg {
        position: absolute;
        left: -5px;
        top: 22px;
    }
</style>