<script>
    import '@fortawesome/fontawesome-free/css/all.min.css'

    const contacts = [
        {
            displayText: 'singerep@bu.edu',
            link: 'mailto:singerep@mit.edu',
            icon: '<i class="fa-solid fa-envelope"></i>'
        },
        {
            displayText: 'ethanpsinger',
            link: 'https://x.com/ethanpsinger',
            icon: '<i class="fa-brands fa-x-twitter"></i>'
        },
        {
            displayText: 'ethanpsinger',
            link: 'https://www.linkedin.com/in/ethanpsinger/',
            icon: '<i class="fa-brands fa-linkedin"></i>'
        },
        {
            displayText: 'singerep',
            link: 'https://github.com/singerep',
            icon: '<i class="fa-brands fa-github"></i>'
        }
    ]
</script>

<div class="contact-bar">
    {#each contacts as contact}
        <a href="{contact.link}" class="contact">
            <div class="contact-icon">
                {@html contact.icon}
            </div>
        </a>
    {/each}
</div>

<style>
    div.contact-bar {
        margin: 30px 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 25px;
        /* border-width: 1.5px;
        border-color: #333;
        border-style: solid;
        border-radius: 8px;
        padding: 13px; */
        box-sizing: border-box;
    }

    a.contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: black;
        text-decoration: none;
        font-weight: 500;
        gap: 5px
    }

    @media (width < 450px) {
        a.contact {
            font-size: 14px;
            gap: 5px;
        }

        div.contact-icon {
            font-size: 18px;
        }
    }

    div.contact-icon {
        color: black;
        font-size: 23px;
    }
</style>