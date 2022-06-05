<script>
    import "../tailwind.css";
    import Loader from "../components/loader.svelte"
    import Nav from "../components/navbar.svelte"
    import Footer from "../components/footer.svelte"
    import { browser } from '$app/env'
    let client_device = ""
    let class_main = ""
    if(browser){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            client_device = "MOBILE";
        } else {
            client_device = "WEBSITE";
        }
    }
    if(client_device == "WEBSITE"){
        class_main = "p-3 max-w-6xl mx-auto glass bg-opacity-60 xl:rounded-box mt-2 mb-2"
    }
    if(client_device == "MOBILE"){
        class_main = "p-2 max-w-6xl mx-auto  mt-2 mb-2"
    }
</script>

<Nav />
{#if client_device != ""}
    <main class="{class_main}">
        <slot />
    </main>
    <Footer />
{:else}
    <Loader cssstyle={"height: 100%;margin:100px 0px 100px 0px;"} />
{/if}