<script context="module">
    let path_site = ""
    export const load = async ({ params,url }) => {
        path_site = url.origin
        let listbanner = [];
        let listkeluaran = [];
        let listpasaran = [];
        let paito_minggu = [];
        let paito_senin = [];
        let paito_selasa = [];
        let paito_rabu = [];
        let paito_kamis = [];
        let paito_jumat = [];
        let paito_sabtu = [];
        let pasaran_nama = "";
        let pasaran_title = "";
        let pasaran_descp = "";
        let slug = params.slug;
        let hostname_client = url.host
        
        const res_listbanner = await fetch(path_site+"/api/listbanner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client,
                keluaran_id:slug,
            }),
        })
        const record_listbanner= await res_listbanner.json();
        listbanner = record_listbanner.data

        const res_listkeluaran = await fetch(path_site+"/api/keluarantogel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client,
                keluaran_id:slug,
            }),
        })
        const record_listkeluaran = await res_listkeluaran.json();
        listkeluaran = record_listkeluaran.data
        listpasaran = record_listkeluaran.listpasaran
        paito_minggu = record_listkeluaran.paito_minggu
        paito_senin = record_listkeluaran.paito_senin
        paito_selasa = record_listkeluaran.paito_selasa
        paito_rabu = record_listkeluaran.paito_rabu
        paito_kamis = record_listkeluaran.paito_kamis
        paito_jumat = record_listkeluaran.paito_jumat
        paito_sabtu = record_listkeluaran.paito_sabtu
        pasaran_nama = record_listkeluaran.pasaran_nama.toLowerCase();
        pasaran_title = record_listkeluaran.pasaran_title
        pasaran_descp = record_listkeluaran.pasaran_descp
        return { props: { 
            path_site,
            slug,
            paito_minggu,
            paito_senin,
            paito_selasa,
            paito_rabu,
            paito_kamis,
            paito_jumat,
            paito_sabtu,
            pasaran_nama,
            pasaran_title,
            pasaran_descp,
            listbanner,
            listpasaran,
            listkeluaran }}
    }
</script>
<script>
    import Banner_top from '../components/banner_top.svelte';
    export let path_site = "";
    export let listbanner = [];
    export let listkeluaran = [];
    export let listpasaran = [];
    export let paito_minggu = {};
    export let paito_senin = {};
    export let paito_selasa = {};
    export let paito_rabu = {};
    export let paito_kamis = {};
    export let paito_jumat = {};
    export let paito_sabtu = {};
    export let pasaran_nama = "";
    export let pasaran_title = "";
    export let pasaran_descp = "";
    export let slug = "";
    let tab_resultogel = "tab-active"
    let tab_paitotogel = ""
    let panel_resultogel = true
    let panel_paitotogel = false
    const handleTabTogel = (e) => {
        switch(e){
            case "resulttogel":
                tab_resultogel = "tab-active"
                tab_paitotogel = ""
                panel_resultogel = true
                panel_paitotogel = false
                break;
            case "paitotogel":
                tab_resultogel = ""
                tab_paitotogel = "tab-active"
                panel_resultogel = false
                panel_paitotogel = true
                break;
        }
    };
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        let temp = s.toLowerCase()
        return temp.charAt(0).toUpperCase() + temp.slice(1)
    }
</script>
<svelte:head>
    <title>{pasaran_title}</title>
    <meta name="description" content="{pasaran_descp}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
    <meta name="author" content="resultsdbs.com">
    <link rel="canonical" href="{path_site}{slug}" />
    <meta name="theme-color" content="#2b2a33" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{path_site}{slug}">
    <meta property="og:title" content="{pasaran_title}">
    <meta property="og:description" content="{pasaran_descp}">
    <meta property="og:image" content="https://i.ibb.co/pXYmddf/Screenshot-8.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{path_site}{slug}">
    <meta property="twitter:title" content="{pasaran_title}">
    <meta property="twitter:description" content="{pasaran_descp}">
    <meta property="twitter:image" content="https://i.ibb.co/pXYmddf/Screenshot-8.png">
</svelte:head>
<Banner_top {listbanner} />
<section class="text-sm breadcrumbs">
    <ul>
      <li class="text-xs lg:text-sm"><a href="/">Home</a></li> 
      <li class="text-xs lg:text-sm">Keluaran Togel {capitalize(pasaran_nama)}</li>
    </ul>
</section>
<article class="lg:flex justify-between w-full gap-2">
    <section class="w-full">
        <section class="tabs tabs-boxed  w-full mb-2">
            <h1 
                on:click={() => {
                    handleTabTogel("resulttogel");
                }}
                class="tab {tab_resultogel} text=[11px] lg:text-xs">
                Hasil Keluaran Togel
            </h1> 
            <h1
                on:click={() => {
                    handleTabTogel("paitotogel");
                }}
                class="tab {tab_paitotogel} text=[11px] lg:text-xs">
                Paito
            </h1>
        </section>
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                {#if panel_resultogel}
                    <section class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-xs lg:text-sm text-center">TANGGAL</th> 
                                    <th class="text-xs lg:text-sm text-center">PERIODE</th> 
                                    <th class="text-xs lg:text-sm text-center">KELUARAN</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {#each listkeluaran as rec}
                                    <tr>
                                        <td class="text-xs text-center">{rec.keluaran_datekeluaran}</td> 
                                        <td class="text-xs text-center">{rec.keluaran_periode}</td> 
                                        <td class="text-xs text-center">
                                            <span class="text-accent">{rec.keluaran_nomor}</span>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody> 
                        </table>
                    </section>
                {/if}
                {#if panel_paitotogel}
                    <section class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-xs lg:text-sm text-center">MINGGU</th> 
                                    <th class="text-xs lg:text-sm text-center">SENIN</th> 
                                    <th class="text-xs lg:text-sm text-center">SELASA</th> 
                                    <th class="text-xs lg:text-sm text-center">RABU</th> 
                                    <th class="text-xs lg:text-sm text-center">KAMIS</th>
                                    <th class="text-xs lg:text-sm text-center">JUMAT</th>
                                    <th class="text-xs lg:text-sm text-center">SABTU</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_minggu as rec }
                                            <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_senin as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_selasa as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_rabu as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_kamis as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_jumat as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                    <td class="text-xs text-center align-top">
                                        {#each paito_sabtu as rec }
                                        <span class="text-accent">{rec.keluaran_nomor}</span><br>
                                        {/each}
                                    </td>
                                </tr>
                            </tbody> 
                        </table>
                    </section>
                {/if}
            </section>
        </section>
    </section>
    <aside class="w-full lg:w-1/2">
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Keluaran Togel</h2>
                <ul class="p-1">
                    {#each listpasaran as rec}
                        <li class="underline p-1 text-xs lg:text-sm">
                            <a sveltekit:prefetch href="/{rec.pasaran_slug}">Keluaran Togel {capitalize(rec.pasaran_name)}</a>
                        </li>
                    {/each}
                </ul>
            </section>
        </section>
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Livedraw Togel</h2>
                <ul class="p-1">
                    {#each listpasaran as rec}
                        <li class="underline p-1 text-xs lg:text-sm">
                            <a href="{rec.pasaran_url}" target="_blank">Livedraw Togel {capitalize(rec.pasaran_name)}</a>
                        </li>
                    {/each}
                </ul>
            </section>
        </section>
    </aside>
</article>