<script>
    import '@fortawesome/fontawesome-free/css/all.min.css'

    const contacts = [
        {
            displayText: 'singerep@bu.edu',
            link: 'mailto:ethan.singer@nytimes.com',
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
            <!-- <div class="contact-display-text">
                {contact.displayText}
            </div> -->
        </a>
    {/each}
</div>

<style>
    div.contact-bar {
        margin: 30px 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        background-color: #688dbc;
        border-radius: 10px;
        padding: 13px 20px;
        box-sizing: border-box;
    }

    a.contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
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
    
    a:hover div.contact-display-text {
        text-decoration: underline;
    }

    div.contact-icon {
        color: white;
        font-size: 23px;
    }
</style>