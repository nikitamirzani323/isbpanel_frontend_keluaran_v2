<script context="module">
    import { MY_GO_PATH_SITE } from '$lib/Env';
    import { browser } from '$app/env'
    let path_site = MY_GO_PATH_SITE
    let client_device = "WEBSITE"
    if(browser){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            client_device = "MOBILE";
        } else {
            client_device = "WEBSITE";
        }
    }
    export const load = async ({ params,url }) => {
        // api/listproviderslotdetail/index.js
        // api/keluarantogel/index.js
        let providerslot_name = ""
        let providerslot_title = ""
        let providerslot_descp = ""
        let listslotgacor = [];
        let listproviderslot = [];
        let slug = params.slug;
        let hostname_client = url.host

        const res_detailprovider = await fetch(path_site+"api/listproviderslotdetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client,
                slug:slug,
            }),
        })
        const record_detailprovider = await res_detailprovider.json();
        providerslot_name = record_detailprovider.providerslot_name
        providerslot_title = record_detailprovider.providerslot_title
        providerslot_descp = record_detailprovider.providerslot_descp
        const res_listslotgacor = await fetch(path_site+"api/listslotgacor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client,
                slug:slug,
                limit:0,
            }),
        })
        const record_listslotgacor = await res_listslotgacor.json();
        listslotgacor = record_listslotgacor.data

        const res_listproviderslot = await fetch(path_site+"api/listproviderslot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client
            }),
        })
        const record_listproviderslot = await res_listproviderslot.json();
        listproviderslot = record_listproviderslot.data
        return { props: { 
            client_device,
            path_site,
            slug,
            providerslot_name,
            providerslot_title,
            providerslot_descp,
            listslotgacor,listproviderslot }}
    }
</script>
<script>
    import Banner_top from '../../components/banner_top.svelte';
    import Placholder from '../../components/placholder.svelte';
    export let listslotgacor = []
    export let listproviderslot = []
    export let client_device = ""
    export let path_site = ""
    export let providerslot_name = ""
    export let providerslot_title = ""
    export let providerslot_descp = ""
    export let slug = ""
    const bg_slotprogress = (e) => {
        let temp = "bg-primary"
        if(parseInt(e) > 49 && parseInt(e)<71){
            temp = "bg-accent"
        }
        if(parseInt(e) > 70 ){
            temp = "bg-success"
        }
        return temp
    }
</script>
<svelte:head>
    <title>{providerslot_title}</title>
    <meta name="description" content="{providerslot_descp}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
    <meta name="author" content="{path_site}">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{path_site}{slug}">
    <meta property="og:title" content="{providerslot_title}">
    <meta property="og:description" content="{providerslot_descp}">
    <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{path_site}{slug}">
    <meta property="twitter:title" content="{providerslot_title}">
    <meta property="twitter:description" content="{providerslot_descp}">
    <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">
</svelte:head>
{#if client_device == "WEBSITE"}
<Banner_top />
<div class="text-sm breadcrumbs">
    <ul>
        <li><a href="/">Home</a></li> 
        <li>Slot Gacor {providerslot_name}</li>
    </ul>
</div>
<article class="flex justify-between w-full gap-2">
    <section class="w-full">
        <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listslotgacor != ""}
                    <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Slot Gacor Hari Ini - {providerslot_name}</h2>
                    <div class="grid grid-cols-4 gap-2 p-2">
                        {#each listslotgacor as rec}
                            <a 
                                class="flex flex-col justify-center items-center w-full gap-2 mb-5" 
                                href="https://146.190.4.188/" target="_blank">
                                <img src="{rec.prediksislot_image}" alt="{rec.prediksislot_name}">
                                <h3 class="text-xs text-base-content -mt-2">{rec.prediksislot_name}</h3>
                                <div class="w-full bg-gray-200 rounded-full -mt-2">
                                    <div class="{bg_slotprogress(rec.prediksislot_prediksi)} animate-pulse text-xs font-medium text-neutral text-center p-0.5 leading-none rounded-l-full" style="width: {rec.prediksislot_prediksi}%"> 
                                        {rec.prediksislot_prediksi}%
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </div>
        </aside>
    </section>
    <section class="w-1/2">
        <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Daftar RTP Slot Gacor</h2>
                <ul class="p-2">
                    {#each listproviderslot as rec}
                        <li class="underline p-1">
                            <a href="/slot-gacor-hari-ini/{rec.providerslot_slug}">{rec.providerslot_name}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        </aside>
    </section>
</article>
{:else}
<div class="text-sm breadcrumbs">
    <ul>
        <li><a href="/">Home</a></li> 
        <li>Slot Gacor {providerslot_name}</li>
    </ul>
</div>
<section class="w-full">
    <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
        <div class="card-body p-2 mb-2">
            {#if listslotgacor != ""}
                <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Slot Gacor Hari Ini - {providerslot_name}</h2>
                <div class="grid grid-cols-2 gap-2 p-2">
                    {#each listslotgacor as rec}
                        <a 
                            class="flex flex-col justify-center items-center w-full gap-2 mb-5" 
                            href="https://146.190.4.188/" target="_blank">
                            <img src="{rec.prediksislot_image}" alt="{rec.prediksislot_name}">
                            <div class="w-full bg-gray-200 rounded-full -mt-2">
                                <div class="{bg_slotprogress(rec.prediksislot_prediksi)} animate-pulse text-xs font-medium text-neutral text-center p-0.5 leading-none rounded-l-full" style="width: {rec.prediksislot_prediksi}%"> 
                                    {rec.prediksislot_prediksi}%
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            {:else}
                <Placholder total_placeholder={4} />
            {/if}
        </div>
    </aside>
</section>
{/if}