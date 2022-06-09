<script context="module">
    import { MY_GO_PATH_MODE,MY_GO_PATH_SITE,MY_GO_PATH_LOCAL } from '$lib/Env';
    let path_site = MY_GO_PATH_LOCAL
    if(MY_GO_PATH_MODE == "PRODUCTION"){
        path_site = MY_GO_PATH_SITE
    }
    export const load = async ({ params,url }) => {
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
    <meta name="author" content="resultsdbs.com">
    <link rel="canonical" href="{path_site}{slug}" />
    <meta name="theme-color" content="#2b2a33" />
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
<Banner_top />
<section class="text-sm breadcrumbs">
    <ul>
        <li class="text-xs lg:text-sm"><a href="/">Home</a></li> 
        <li class="text-xs lg:text-sm">Slot Gacor {providerslot_name}</li>
    </ul>
</section>
<article class="lg:flex justify-between w-full gap-2">
    <section class="w-full lg:order-2 lg:w-1/3">
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                <h1 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Daftar RTP Slot Gacor</h1>
                <section class="lg:hidden overflow-y-auto scrollbar-hide w-full my-2">
                    <ul class="flex items-center  w-full gap-1">
                        {#each listproviderslot as rec}
                        <li class="underline">
                            <a class="text-[11px] btn btn-sm btn-outline btn-primary w-[120px]" sveltekit:prefetch href="/slot-gacor-hari-ini/{rec.providerslot_slug}">{rec.providerslot_name}</a>
                        </li>
                        {/each}
                    </ul>
                </section>
                <ul class="hidden lg:block p-2">
                    {#each listproviderslot as rec}
                        <li class="underline p-1 text-xs lg:text-sm">
                            <a sveltekit:prefetch href="/slot-gacor-hari-ini/{rec.providerslot_slug}">{rec.providerslot_name}</a>
                        </li>
                    {/each}
                </ul>
            </section>
        </section>
    </section>
    <section class="w-full lg:order-1 ">
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                {#if listslotgacor != ""}
                    <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Slot Gacor Hari Ini - {providerslot_name}</h2>
                    <section class="grid grid-cols-3 lg:grid-cols-4 gap-2 p-2">
                        {#each listslotgacor as rec}
                            <a 
                                class="flex flex-col justify-center items-center w-full gap-2 mb-5" 
                                href="https://146.190.4.188/" target="_blank">
                                <img src="{rec.prediksislot_image}" alt="{rec.prediksislot_name}">
                                <h3 class="hidden lg:block text-xs text-base-content -mt-2">{rec.prediksislot_name}</h3>
                                <section class="w-full bg-gray-200 rounded-full -mt-2">
                                    <section class="{bg_slotprogress(rec.prediksislot_prediksi)} animate-pulse text-xs font-bold text-neutral text-center p-0.5 leading-none rounded-full" style="width: {rec.prediksislot_prediksi}%"> 
                                        {rec.prediksislot_prediksi}%
                                    </section>
                                </section>
                            </a>
                        {/each}
                    </section>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </section>
        </section>
    </section>
   
</article>