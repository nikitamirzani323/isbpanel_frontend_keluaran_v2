<script context="module">
    import { MY_GO_PATH_SITE } from '$lib/Env';
    let path_site = MY_GO_PATH_SITE
   
    export const load = async ({ fetch,url}) => {
        let hostname_client = url.host
        let listkeluaran = [];
        let listnews = [];
        let listproviderslot = [];
        let listslotgacor = [];
        let limit = 9
        const [res_listkeluaran, res_listproviderslot, res_listslotgacor, res_listnews] = await Promise.all([
            fetch("/api/listkeluaran", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hostname:hostname_client
                }),
            }),
            fetch("/api/listproviderslot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hostname:hostname_client
                }),
            }),
            fetch("/api/listslotgacor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hostname:hostname_client,
                    limit:limit,
                }),
            }),
            fetch("/api/listnews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hostname:hostname_client
                }),
            }),
            fetch("/api/bukumimpi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hostname:hostname_client
                }),
            })
        ]);

        const record_listkeluaran = await res_listkeluaran.json();
        listkeluaran = record_listkeluaran.data

       
        const record_listproviderslot = await res_listproviderslot.json();
        listproviderslot = record_listproviderslot.data

      
        const record_listslotgacor = await res_listslotgacor.json();
        listslotgacor = record_listslotgacor.data
        
        
        const record_listnews = await res_listnews.json();
        listnews = record_listnews.data

        
        
        return {
            props: {
                path_site,
                hostname_client,
                listkeluaran,
                listproviderslot,
                listslotgacor,
                listnews,
            }
        }
    };
</script>
<script>
    import {fade} from "svelte/transition";
    import { flip } from 'svelte/animate';
    import imgdummy from '$lib/assets/placeholder.png';
    import Placholder from '../components/placholder.svelte';
    import Banner_top from '../components/banner_top.svelte';
    
    export let path_site = "";
    export let hostname_client = "";
    export let listkeluaran = [];
    export let listproviderslot = [];
    export let listslotgacor = [];
    export let listnews = [];
    
    const loaded = new Map();
    let tafsirmimpi = [];
    let bukumimpi = [];
    let listnewsmovie = [];
    let tipe_bukumimpi = "";
    let listbbfs_4d = [];
    let listbbfs_3d = [];
    let listbbfs_2d = [];
    let filterBukuMimpi = [];
    let filterTafsirMimpi = [];
    let searchbukumimpi = "";
    let searchtafsirmimpi = "";
    let tab_1_1 = "tab-active"
    let tab_1_2 = ""
    let tab_1_3 = ""
    let panel_1_1 = true
    let panel_1_2 = false
    let panel_1_3 = false
    let tab_groupbookdream_bukumimpi = "tab-active"
    let tab_groupbookdream_tafsirmimpi = ""
    let tab_groupbookdream_bbfs = ""
    let panel_groupbookdream_bukumimpi = true
    let panel_groupbookdream_tafsirmimpi = false
    let panel_groupbookdream_bbfs = false
    let tab_bukumimpi_all = "tab-active"
    let tab_bukumimpi_4d = ""
    let tab_bukumimpi_3d = ""
    let tab_bukumimpi_2d = ""
    let tab_newsberita = "tab-active"
    let tab_newsmovie = ""
    let panel_newberita = true
    let panel_newmovie = false
    let tab_bbfs_4d = "tab-active"
    let tab_bbfs_3d = ""
    let tab_bbfs_2d = ""
    let panel_bbfs_4d = true
    let panel_bbfs_3d = false
    let panel_bbfs_2d = false
    let panel_mobile_news = true
    let panel_mobile_newsmovie = false
    
    const handleTabOne = (e) => {
        switch(e){
            case "tab_1_1":
                tab_1_1 = "tab-active"
                tab_1_2 = ""
                tab_1_3 = ""
                panel_1_1 = true
                panel_1_2 = false
                panel_1_3 = false
                break;
            case "tab_1_2":
                tab_1_1 = ""
                tab_1_2 = "tab-active"
                tab_1_3 = ""
                panel_1_1 = false
                panel_1_2 = true
                panel_1_3 = false
                break;
            case "tab_1_3":
                tab_1_1 = ""
                tab_1_2 = ""
                tab_1_3 = "tab-active"
                panel_1_1 = false
                panel_1_2 = false
                panel_1_3 = true
                break;
        }
    };
    const handleTabNews = (e) => {
        switch(e){
            case "newsberita":
                tab_newsberita = "tab-active"
                tab_newsmovie = ""
                panel_newberita = true
                panel_newmovie = false
                break;
            case "newsmovie":
                postmovienews()
                tab_newsberita = ""
                tab_newsmovie = "tab-active"
                panel_newberita = false
                panel_newmovie = true
                break;
        }
    };
    const handleTabBBFS = (e) => {
        switch(e){
            case "4D":
                tab_bbfs_4d = "tab-active"
                tab_bbfs_3d = ""
                tab_bbfs_2d = ""
                panel_bbfs_4d = true
                panel_bbfs_3d = false
                panel_bbfs_2d = false
                break;
            case "3D":
                tab_bbfs_4d = ""
                tab_bbfs_3d = "tab-active"
                tab_bbfs_2d = ""
                panel_bbfs_4d = false
                panel_bbfs_3d = true
                panel_bbfs_2d = false
                break;
            case "2D":
                tab_bbfs_4d = ""
                tab_bbfs_3d = ""
                tab_bbfs_2d = "tab-active"
                panel_bbfs_4d = false
                panel_bbfs_3d = false
                panel_bbfs_2d = true
                break;
        }
    };
    var shios = [
        "tikus",
        "babi",
        "anjing",
        "ayam",
        "monyet",
        "kambing",
        "kuda",
        "ular",
        "naga",
        "kelinci",
        "macan",
        "kerbau",
    ];
    var datashio = [
        ["01", "13", "25", "37", "49", "61", "73", "85", "97"],
        ["02", "14", "26", "38", "50", "62", "74", "86", "98"],
        ["03", "15", "27", "39", "51", "63", "75", "87", "99"],
        ["04", "16", "28", "40", "52", "64", "76", "88", "00"],
        ["05", "17", "29", "41", "53", "65", "77", "89", ""],
        ["06", "18", "30", "42", "54", "66", "78", "90", ""],
        ["07", "19", "31", "43", "55", "67", "79", "91", ""],
        ["08", "20", "32", "44", "56", "68", "80", "92", ""],
        ["09", "21", "33", "45", "57", "69", "81", "93", ""],
        ["10", "22", "34", "46", "58", "70", "82", "94", ""],
        ["11", "23", "35", "47", "59", "71", "83", "95", ""],
        ["12", "24", "36", "48", "60", "72", "84", "96", ""],
    ];
    function rotateRight(arr, count) {
        for (var i = 0; i < count; i++) {
        let last = arr.pop();
        arr.unshift(last);
        }
        return arr;
    }
    function initShio() {
        var year = 2020;
        var getDiffYear = Number(new Date().getFullYear()) - year;
        const res = rotateRight(shios, getDiffYear);
        for (var j = 0; j < datashio.length; j++) {
        datashio[j].unshift(res[j].toUpperCase());
        }
    }
    function lazy(node, data) {
		if (loaded.has(data.src)) {
			node.setAttribute('src', data.src);
		} else {
			// simulate slow loading network
			setTimeout(() => {
				const img = new Image();
				img.src = data.src;
				img.onload = () => {
					loaded.set(data.src, img);
					node.setAttribute('src', data.src); 
				};
			}, 100);
		}
		return {
			destroy(){} // noop
		};
	}
    async function fetch_bukumimpi(){
        filterBukuMimpi = [];
        bukumimpi = [];
        const resdata = await fetch(path_site+"api/bukumimpi", {
            method: "POST",
            body: JSON.stringify({
                hostname: hostname_client,
                bukumimpi_nama: searchbukumimpi.toLowerCase(),
                bukumimpi_tipe: tipe_bukumimpi,
            }),
        });
        if (!resdata.ok) {
            const pasarMessage = `An error has occured: ${resdata.status}`;
            throw new Error(pasarMessage);
        }else{
            const jsondata = await resdata.json();
            let record = jsondata.data;
            for (var i = 0; i < record.length; i++) {
                bukumimpi = [
                    ...bukumimpi,
                    {
                        bukumimpi_type: record[i]["bukumimpi_type"],
                        bukumimpi_name: record[i]["bukumimpi_name"],
                        bukumimpi_nomor: record[i]["bukumimpi_nomor"],
                    },
                ];
            }
		}
    }
    async function fetch_tafsirmimpi(){
        filterTafsirMimpi = [];
        tafsirmimpi = [];
        const resdata = await fetch("/api/tafsirmimpi", {
            method: "POST",
            body: JSON.stringify({
                hostname: hostname_client,
                tafsirmimpi_search: searchtafsirmimpi.toLowerCase(),
            }),
        });
        if (!resdata.ok) {
            const pasarMessage = `An error has occured: ${resdata.status}`;
            throw new Error(pasarMessage);
        }else{
            const jsondata = await resdata.json();
            let record = jsondata.data;
            for (var i = 0; i < record.length; i++) {
                tafsirmimpi = [
                    ...tafsirmimpi,
                    {
                        tafsirmimpi_mimpi: record[i]["tafsirmimpi_mimpi"],
                        tafsirmimpi_artimimpi: record[i]["tafsirmimpi_artimimpi"],
                        tafsirmimpi_angka2d: record[i]["tafsirmimpi_angka2d"],
                        tafsirmimpi_angka3d: record[i]["tafsirmimpi_angka3d"],
                        tafsirmimpi_angka4d: record[i]["tafsirmimpi_angka4d"],
                    },
                ];
            }
		}
    }
    async function postmovienews(){
        listnewsmovie = [];
        const resdata = await fetch("/api/listnewsmovie", {
            method: "POST",
            body: JSON.stringify({
                hostname: hostname_client,
            }),
        });
        if (!resdata.ok) {
            const pasarMessage = `An error has occured: ${resdata.status}`;
            throw new Error(pasarMessage);
        }else{
            const jsondata = await resdata.json();
            let record = jsondata.data;
            for (var i = 0; i < record.length; i++) {
                listnewsmovie = [
                    ...listnewsmovie,
                    {
                        news_title: record[i]["news_title"],
                        news_descp: record[i]["news_descp"],
                        news_url: record[i]["news_url"],
                        news_image: record[i]["news_image"],
                    },
                ];
            }
		}
    }
    const handleGroupBookDream = (e) => {
        switch (e) {
            case "bukumimpi":
                tipe_bukumimpi = "";
                searchbukumimpi = "";
                tab_groupbookdream_bukumimpi = "tab-active"
                tab_groupbookdream_tafsirmimpi = ""
                tab_groupbookdream_bbfs = ""
                panel_groupbookdream_bukumimpi = true
                panel_groupbookdream_tafsirmimpi = false
                panel_groupbookdream_bbfs = false
                fetch_bukumimpi();
                break;
            case "tafsirmimpi":
                searchtafsirmimpi = "";
                tab_groupbookdream_bukumimpi = ""
                tab_groupbookdream_tafsirmimpi = "tab-active"
                tab_groupbookdream_bbfs = ""
                panel_groupbookdream_bukumimpi = false
                panel_groupbookdream_tafsirmimpi = true
                panel_groupbookdream_bbfs = false
                fetch_tafsirmimpi()
                break;
            case "bbfs":
                searchtafsirmimpi = "";
                tab_groupbookdream_bukumimpi = ""
                tab_groupbookdream_tafsirmimpi = ""
                tab_groupbookdream_bbfs = "tab-active"
                panel_groupbookdream_bukumimpi = false
                panel_groupbookdream_tafsirmimpi = false
                panel_groupbookdream_bbfs = true
                break;
        }
    }
    const handleClickBukuMimpi = (e) => {
        switch (e) {
            case "ALL":
                tipe_bukumimpi = "";
                searchbukumimpi = "";
                tab_bukumimpi_all = "tab-active"
                tab_bukumimpi_4d = ""
                tab_bukumimpi_3d = ""
                tab_bukumimpi_2d = ""
                break;
            case "4D":
                tipe_bukumimpi = "4D";
                searchbukumimpi = "";
                tab_bukumimpi_all = ""
                tab_bukumimpi_4d = "tab-active"
                tab_bukumimpi_3d = ""
                tab_bukumimpi_2d = ""
                break;
            case "3D":
                tipe_bukumimpi = "3D";
                searchbukumimpi = "";
                tab_bukumimpi_all = ""
                tab_bukumimpi_4d = ""
                tab_bukumimpi_3d = "tab-active"
                tab_bukumimpi_2d = ""
                break;
            case "2D":
                tipe_bukumimpi = "2D";
                searchbukumimpi = "";
                tab_bukumimpi_all = ""
                tab_bukumimpi_4d = ""
                tab_bukumimpi_3d = ""
                tab_bukumimpi_2d = "tab-active"
                break;
        }
        fetch_bukumimpi();
    }
    const handleKeyboardbukumimpi_checkenter = (e) => {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            filterBukuMimpi = [];
            bukumimpi = [];
            postbukumimpi();
        }  
    };
    const handleKeyboardtafsirmimpi_checkenter = (e) => {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            filterTafsirMimpi = [];
            tafsirmimpi = [];
            posttafsirmimpi();
        }  
    };
    $: {
        if (searchbukumimpi) {
            filterBukuMimpi = bukumimpi.filter((item) =>
                item.bukumimpi_name
                    .toLowerCase()
                    .includes(searchbukumimpi.toLowerCase())
            );
        } else {
            filterBukuMimpi = [...bukumimpi];
        }
        if (searchtafsirmimpi) {
            filterTafsirMimpi = tafsirmimpi.filter((item) =>
                item.tafsirmimpi_mimpi
                    .toLowerCase()
                    .includes(searchtafsirmimpi.toLowerCase())
            );
        } else {
            filterTafsirMimpi = [...tafsirmimpi];
        }
    }
    initShio();
    fetch_bukumimpi();
    const convert_time = (e) => {
        let temp = e.split(":")
        let hour = temp[0]
        let minute = temp[1]
        return hour+":"+minute
    }
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
    let nomor_bbfs = "";
    let data_bbfs = [];
    let generate4D = [];
    let generate3D = [];
    let generate2D = [];
    let flag = true
    let found = true
    function formbbfs_add() {
        flag = true;
        found = true;
            listbbfs_4d = "";
            listbbfs_3d = "";
            listbbfs_2d = "";
            generate4D = [];
            generate3D = [];
            generate2D = [];
            if (nomor_bbfs == "") {
                flag = false;
                alert("Nomor Tidak Boleh Kosong");
            }
            if (nomor_bbfs.length < 4 || nomor_bbfs.length > 9) {
                flag = false;
                alert("Nomor 4 - 9 Digit");
            }
        if(flag){
            for (let a = 0; a < nomor_bbfs.length; a++) {
                for (let b = 0; b < nomor_bbfs.length; b++) {
                    for (let c = 0; c < nomor_bbfs.length; c++) {
                        for (let d = 0; d < nomor_bbfs.length; d++) {
                            let flag_check = true
                            if(nomor_bbfs[a] == nomor_bbfs[b]){
                                flag_check = false
                            }
                            if(nomor_bbfs[a] == nomor_bbfs[c]){
                                flag_check = false
                            }
                            if(nomor_bbfs[a] == nomor_bbfs[d]){
                                flag_check = false
                            }
                            if(nomor_bbfs[b] == nomor_bbfs[c]){
                                flag_check = false
                            }
                            if(nomor_bbfs[b] == nomor_bbfs[d]){
                                flag_check = false
                            }
                            if(nomor_bbfs[c] == nomor_bbfs[d]){
                                flag_check = false
                            }
                            if(flag_check){
                                let dat = nomor_bbfs[a] + nomor_bbfs[b] +nomor_bbfs[c] +nomor_bbfs[d];
                                if (generate4D.length > 0) {
                                    for (let x = 0;x < generate4D.length;x++) {
                                        if (dat == generate4D[x]) {
                                            found = true;
                                        }
                                    }
                                    if (found == false) {
                                        generate4D.push(dat);
                                    }
                                } else {
                                    generate4D.push(dat);
                                }
                                found = false;
                                dat = "";
                            }
                            
                        }
                    }
                }
            }
            for (let x = 0; x < generate4D.length; x++) {
                if(x==(parseInt(generate4D.length)-1)){
                    listbbfs_4d += generate4D[x]
                }else{
                    listbbfs_4d += generate4D[x]+"*"
                }
            }
            for (let a = 0; a < nomor_bbfs.length; a++) {
                for (let b = 0; b < nomor_bbfs.length; b++) {
                    for (let c = 0; c < nomor_bbfs.length; c++) {
                        let flag_check = true
                        if(nomor_bbfs[a] == nomor_bbfs[b]){
                            flag_check = false
                        }
                        if(nomor_bbfs[a] == nomor_bbfs[c]){
                            flag_check = false
                        }
                        if(nomor_bbfs[b] == nomor_bbfs[c]){
                            flag_check = false
                        }
                        if(flag_check){
                            let dat = nomor_bbfs[a] +nomor_bbfs[b] +nomor_bbfs[c];
                            if (generate3D.length > 0) {
                                for (let x = 0;x < generate3D.length;x++) {
                                    if (dat == generate3D[x]) {
                                        found = true;
                                    }
                                }
                                if (found == false) {
                                    generate3D.push(dat);
                                }
                            } else {
                                generate3D.push(dat);
                            }
                            found = false;
                            dat = "";
                        }
                    }
                }
            }
            for (let x = 0; x < generate3D.length; x++) {
                if(x==(parseInt(generate3D.length)-1)){
                    listbbfs_3d += generate3D[x]
                }else{
                    listbbfs_3d += generate3D[x]+"*"
                }
            }
            
            for (let a = 0; a < nomor_bbfs.length; a++) {
                for (let b = 0; b < nomor_bbfs.length; b++) {
                    let flag_check = true
                    if(nomor_bbfs[a] == nomor_bbfs[b]){
                        flag_check = false
                    }
                    if(flag_check){
                        let dat = nomor_bbfs[a] +nomor_bbfs[b] ;
                        if (generate2D.length > 0) {
                            for (let x = 0;x < generate2D.length;x++) {
                                if (dat == generate2D[x]) {
                                    found = true;
                                }
                            }
                            if (found == false) {
                                generate2D.push(dat);
                            }
                        } else {
                            generate2D.push(dat);
                        }
                        found = false;
                        dat = "";
                    }
                }
            }
            for (let x = 0; x < generate2D.length; x++) {
                if(x==(parseInt(generate2D.length)-1)){
                    listbbfs_2d += generate2D[x]
                }else{
                    listbbfs_2d += generate2D[x]+"*"
                }
            }
        }
    }
</script>
<svelte:head>
    <title>Hasil Keluaran Togel / Berita Hari Ini</title>
    <meta name="description" content="Keluaran Togel Hongkong, Keluaran nomor togel, keluaran nomor togel, Keluaran hk, Keluaran sgp, Keluaran bullseye, Keluaran nomor sgp">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
    <meta name="author" content="resultsdbs.com">
    <link rel="canonical" href="{path_site}" />
    <meta name="theme-color" content="#2b2a33" />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{path_site}">
    <meta property="og:title" content="Hasil Keluaran Togel / Berita Hari Ini">
    <meta property="og:description" content="Keluaran Togel Hongkong, Keluaran nomor togel, keluaran nomor togel, Keluaran hk, Keluaran sgp, Keluaran bullseye, Keluaran nomor sgp">
    <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{path_site}">
    <meta property="twitter:title" content="Hasil Keluaran Togel / Berita Hari Ini">
    <meta property="twitter:description" content="Keluaran Togel Hongkong, Keluaran nomor togel, keluaran nomor togel, Keluaran hk, Keluaran sgp, Keluaran bullseye, Keluaran nomor sgp">
    <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">
</svelte:head>
<Banner_top />
<article class="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
    <article class="w-full">
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listkeluaran != ""}
                    <h1 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Keluaran Togel</h1>
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-[11px] lg:text-sm text-left">PASARAN</th> 
                                    <th class="text-[11px] lg:text-sm text-center">TANGGAL</th> 
                                    <th class="hidden  lg:block lg:text-sm text-left">HARI</th> 
                                    <th class="text-[11px] lg:text-sm text-center">JADWAL</th> 
                                    <th class="text-[11px] lg:text-sm text-center">KELUARAN</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {#each listkeluaran as rec}
                                    <tr>
                                        <th class="text-[11px] lg:text-xs text-left underline">
                                            <a sveltekit:prefetch href="{rec.pasaran_slug}">
                                                {rec.pasaran_name}
                                            </a>
                                        </th> 
                                        <td class="text-[11px] lg:text-xs text-center">{rec.pasaran_datekeluaran}</td> 
                                        <td class="hidden lg:block lg:text-xs  text-left">{rec.pasaran_diundi}</td> 
                                        <td class="text-[11px] lg:text-xs text-center">{convert_time(rec.pasaran_jamjadwal)}</td> 
                                        <td class="text-[11px] lg:text-xs text-center">
                                            <span class="text-accent">{rec.pasaran_keluaran}</span>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody> 
                        </table>
                    </div>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </div>
        </section>
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listkeluaran != ""}
                    <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Prediksi Togel</h2>
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-[11px] lg:text-sm text-left">PASARAN</th> 
                                    <th class="text-[11px] lg:text-sm text-center">TANGGAL</th> 
                                    <th class="text-[11px] lg:text-sm text-center">BBFS</th> 
                                    <th class="text-[11px] lg:text-sm text-center">NOMOR</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {#each listkeluaran as rec}
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-left">{rec.pasaran_name}</td> 
                                        <td class="text-[11px] lg:text-xs text-center">{rec.pasaran_dateprediksi}</td> 
                                        <td class="text-[11px] lg:text-xs text-center">
                                            <span class="text-accent">{rec.pasaran_bbfsprediksi}</span>
                                        </td>
                                        <td class="text-[11px] lg:text-xs text-center">
                                            <span class="text-accent">{rec.pasaran_nomorprediksi}</span>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody> 
                        </table>
                    </div>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </div>
        </section>
        <section class="mb-4">
            <section class="tabs tabs-boxed mb-2">
                <span 
                    on:click={() => {
                        handleTabOne("tab_1_1");
                    }}
                    class="tab {tab_1_1} text-xs lg:text-sm">Angka Main</span> 
                <span 
                    on:click={() => {
                        handleTabOne("tab_1_2");
                    }}
                    class="tab {tab_1_2} text-xs lg:text-sm">Table Shio</span>
                <span 
                    on:click={() => {
                        handleTabOne("tab_1_3");
                    }}
                    class="tab {tab_1_3} text-xs lg:text-sm">Table Tyesen</span>
            </section>
            {#if panel_1_1}
                <section class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">HARI</th> 
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">PON</th> 
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">WAGE</th> 
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">KLIWON</th> 
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">LEGI</th>
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none">PAHING</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">SENIN</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">89102</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">RABU</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">90123</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">89012</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">34576</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">KAMIS</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">45678</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">SABTU</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">34567</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">12345</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">MINGGU</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </section>
            {/if}
            {#if panel_1_2}
                <section class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2 bg-accent rounded-none">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <thead class="rounded-none">
                                    <tr>
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-black">SHIO</th> 
                                        <th class="text-[11px] lg:text-xs text-center bg-accent text-black" colspan="9">ANGKA</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {#each datashio as shio}
                                        <tr>
                                        {#each shio as dt, j}
                                            {#if j === 0}
                                            <td class="text-[11px] lg:text-xs text-center bg-accent text-black border-none font-semibold">{shio[j]}</td>
                                            {:else}
                                            <td class="text-[11px] lg:text-xs text-center bg-accent text-black border-none font-semibold">{shio[j]}
                                            </td>
                                            {/if}
                                        {/each}
                                        </tr>
                                    {/each}
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </section>
            {/if}
            {#if panel_1_3}
                <section class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2 ">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <tbody>
                                    <tr>
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 font-semibold">
                                            01 05 95 12 45<br />
                                            02 16 53 09 35<br />
                                            03 32 52 85 52<br />
                                            04 12 65 05 15<br />
                                            05 01 89 10 39<br />
                                            06 20 91 51 41<br />
                                            07 24 58 57 08<br />
                                            08 17 57 04 07<br />
                                            09 33 87 88 37<br />
                                            10 18 82 03 32<br />
                                            11 15 77 02 27<br />
                                            12 04 69 17 19<br />
                                            13 14 79 07 29<br />
                                            14 13 96 08 46<br />
                                            15 11 54 00 04<br />
                                            16 02 74 15 24<br />
                                            17 08 88 13 38<br />
                                            18 10 78 01 28<br />
                                            19 27 62 54 12<br />
                                            20 06 72 19 22
                                        </td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 font-semibold">
                                            21 22 93 55 43<br />
                                            22 21 70 50 20<br />
                                            23 30 84 81 34<br />
                                            24 07 66 14 16<br />
                                            25 35 85 82 03<br />
                                            26 31 90 80 40<br />
                                            27 19 61 06 11<br />
                                            28 29 69 56 18<br />
                                            29 28 63 53 13<br />
                                            30 23 99 58 49<br />
                                            31 26 94 59 44<br />
                                            32 03 60 18 10<br />
                                            33 09 86 16 36<br />
                                            34 36 73 89 23<br />
                                            35 25 75 52 02<br />
                                            36 34 83 87 33<br />
                                            37 38 59 83 09<br />
                                            38 37 67 84 17<br />
                                            39 44 55 77 05<br />
                                            40 43 76 78 26
                                        </td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 font-semibold">
                                            41 49 56 76 06<br />
                                            42 45 97 72 47<br />
                                            43 40 71 41 21<br />
                                            44 39 81 86 31<br />
                                            45 42 51 75 01<br />
                                            46 48 64 73 14<br />
                                            47 50 92 21 42<br />
                                            48 46 00 79 50<br />
                                            49 41 80 70 30<br />
                                            50 47 98 74 48<br />
                                            51 55 45 22 95<br />
                                            52 66 03 99 85<br />
                                            53 82 02 35 75<br />
                                            54 62 15 95 65<br />
                                            55 51 39 20 89<br />
                                            56 70 41 71 91<br />
                                            57 74 08 47 58<br />
                                            58 67 07 94 57<br />
                                            59 83 37 38 87<br />
                                            60 68 32 93 82
                                        </td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 font-semibold">
                                            61 65 27 92 77<br />
                                            62 54 19 27 69<br />
                                            63 64 29 97 79<br />
                                            64 63 46 98 96<br />
                                            65 61 04 90 54<br />
                                            66 52 24 25 74<br />
                                            67 58 38 23 88<br />
                                            68 60 28 91 78<br />
                                            69 77 12 44 62<br />
                                            70 56 22 29 72<br />
                                            71 72 43 45 93<br />
                                            72 71 20 40 70<br />
                                            73 80 34 31 84<br />
                                            74 57 16 24 66<br />
                                            75 85 35 32 53<br />
                                            76 81 40 30 90<br />
                                            77 69 11 96 61<br />
                                            78 79 18 46 68<br />
                                            79 78 13 43 83<br />
                                            80 73 49 48 99
                                        </td> 
                                        <td class="text-[11px] lg:text-xs text-center bg-accent text-base-300 font-semibold">
                                            81 76 44 49 94<br />
                                            82 53 10 28 60<br />
                                            83 59 36 26 86<br />
                                            84 86 23 39 73<br />
                                            85 75 26 42 52<br />
                                            86 84 33 37 83<br />
                                            87 88 09 33 59<br />
                                            88 87 17 34 64<br />
                                            89 94 05 67 55<br />
                                            90 93 26 68 76<br />
                                            91 99 06 66 56<br />
                                            92 95 47 62 97<br />
                                            93 90 21 61 71<br />
                                            94 89 31 36 81<br />
                                            95 92 01 65 51<br />
                                            96 98 14 63 64<br />
                                            97 00 42 11 92<br />
                                            98 86 50 69 00<br />
                                            99 91 30 60 80<br />
                                            00 97 48 64 98
                                        </td> 
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </section>
            {/if}
        </section>
        <section class="hidden lg:block mt-2">
            <section class="tabs tabs-boxed mb-2">
                <span 
                    on:click={() => {
                        handleGroupBookDream("bukumimpi");
                    }}
                    class="tab {tab_groupbookdream_bukumimpi} text-xs lg:text-sm">Buku Mimpi</span> 
                <span 
                    on:click={() => {
                        handleGroupBookDream("tafsirmimpi");
                    }}
                    class="tab {tab_groupbookdream_tafsirmimpi} text-xs lg:text-sm">Tafsir Mimpi</span> 
                <span 
                    on:click={() => {
                        handleGroupBookDream("bbfs");
                    }}
                    class="tab {tab_groupbookdream_bbfs} text-xs lg:text-sm">BBFS</span>
            </section>
            <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md">
                <div class="card-body p-2 mb-2 ">
                    {#if panel_groupbookdream_bukumimpi}
                        <div class="flex flex-col gap-2">
                            <section class="tabs tabs-boxed">
                                <span 
                                    on:click={() => {
                                        handleClickBukuMimpi("ALL");
                                    }}
                                    class="tab {tab_bukumimpi_all} text-xs lg:text-sm">All</span> 
                                <span 
                                    on:click={() => {
                                        handleClickBukuMimpi("4D");
                                    }}
                                    class="tab {tab_bukumimpi_4d} text-xs lg:text-sm">4D</span> 
                                <span 
                                    on:click={() => {
                                        handleClickBukuMimpi("3D");
                                    }}
                                    class="tab {tab_bukumimpi_3d} text-xs lg:text-sm">3D</span>
                                <span 
                                    on:click={() => {
                                        handleClickBukuMimpi("2D");
                                    }}
                                    class="tab {tab_bukumimpi_2d} text-xs lg:text-sm">2D</span>
                            </section>
                            <input
                                bind:value={searchbukumimpi} 
                                on:keypress={handleKeyboardbukumimpi_checkenter}
                                type="text" placeholder="Search" class="input input-bordered w-full rounded-md input-sm" />
                            <div class="flex flex-col p-2 gap-2 h-[700px] scrollbar-hide overflow-auto">
                                {#if filterBukuMimpi != ""}
                                    {#each filterBukuMimpi as rec}
                                        <div class="flex justify-start gap-4 border-b-2 border-base-100">
                                            <div class="text-accent text-xs lg:text-sm self-center">
                                                {rec.bukumimpi_type}
                                            </div>
                                            <p class="text-xs lg:text-sm">
                                                {rec.bukumimpi_name}
                                                <br>
                                                <span class="text-accent text-xs lg:text-sm">{rec.bukumimpi_nomor}</span>
                                            </p>
                                        </div>
                                    {/each}
                                {:else}
                                    <Placholder total_placeholder={8} />
                                {/if}
                            </div>
                        </div>
                    {/if}
                    {#if panel_groupbookdream_tafsirmimpi}
                        <div class="flex flex-col gap-2">
                            <input
                                bind:value={searchtafsirmimpi} 
                                on:keypress={handleKeyboardtafsirmimpi_checkenter}
                                type="text" placeholder="Search" class="input input-bordered w-full rounded-md input-sm" />
                            <div class="flex flex-col p-2 gap-2 h-[760px] scrollbar-hide overflow-auto">
                                {#if filterTafsirMimpi != ""}
                                    {#each filterTafsirMimpi as rec}
                                        <p class="text-xs lg:text-sm border-b-2 border-base-100 p-2">
                                            {rec.tafsirmimpi_artimimpi}
                                            <br>
                                            2D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka2d}</span><br>
                                            3D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka3d}</span><br>
                                            4D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka4d}</span>
                                        </p>
                                    {/each}
                                {:else}
                                    <Placholder total_placeholder={8} />
                                {/if}
                            </div>
                        </div>
                    {/if}
                    {#if panel_groupbookdream_bbfs}
                        <div class="flex flex-col gap-2">
                            <div class="input-group">
                                <input
                                    bind:value={nomor_bbfs} 
                                    on:keypress={handleKeyboardbukumimpi_checkenter}
                                    maxlength="9"
                                    type="text" 
                                    placeholder="Nomor (4-9 Digit)" 
                                    class="input input-bordered w-full rounded-md input-sm ring-0 ring-offset-0" />
                                <button on:click={() => {
                                    formbbfs_add();
                                }} class="btn btn-sm btn-primary">Generate</button>
                            </div>
                            <section class="tabs tabs-boxed">
                                <span 
                                    on:click={() => {
                                        handleTabBBFS("4D");
                                    }}
                                    class="tab {tab_bbfs_4d} text-xs lg:text-sm">4D ({listbbfs_4d.length})</span> 
                                <span 
                                    on:click={() => {
                                        handleTabBBFS("3D");
                                    }}
                                    class="tab {tab_bbfs_3d} text-xs lg:text-sm">3D ({listbbfs_3d.length})</span>
                                <span 
                                    on:click={() => {
                                        handleTabBBFS("2D");
                                    }}
                                    class="tab {tab_bbfs_2d} text-xs lg:text-sm">2D ({listbbfs_2d.length})</span>
                            </section>
                            <div class="flex p-2 gap-1 h-[700px] scrollbar-hide overflow-auto">
                                {#if panel_bbfs_4d}
                                    <p class="break-all text-accent">
                                        {listbbfs_4d}
                                    </p>
                                {/if}
                                {#if panel_bbfs_3d}
                                    <p class="break-all text-accent">
                                        {listbbfs_3d}
                                    </p>
                                {/if}
                                {#if panel_bbfs_2d}
                                    <p class="break-all text-accent">
                                        {listbbfs_2d}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            </section>
        </section>
    </article>
    <aside class="w-full">
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <section class="card-body p-2 mb-2">
                {#if listproviderslot != ""}
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
                    <section class="hidden lg:grid grid-cols-3 gap-2 p-2">
                        {#each listproviderslot as rec}
                            <a class="btn btn-sm btn-outline btn-primary" sveltekit:prefetch href="/slot-gacor-hari-ini/{rec.providerslot_slug}">
                                {rec.providerslot_name}
                            </a>
                        {/each}
                    </section>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </section>
        </section>
        <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listslotgacor != ""}
                    <h1 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Slot Gacor Hari Ini</h1>
                    <section class="grid grid-cols-3 gap-2 p-2">
                        {#each listslotgacor as rec}
                            <a 
                                class="flex flex-col justify-center items-center w-full gap-2 mb-2" 
                                href="https://146.190.4.188/" target="_blank">
                                <img src="{rec.prediksislot_image}" alt="{rec.prediksislot_name}">
                                <h3 class="hidden lg:block text-xs text-base-content">{rec.prediksislot_name}</h3>
                                <section class="w-full bg-gray-200 rounded-full ">
                                    <section class="{bg_slotprogress(rec.prediksislot_prediksi)} animate-pulse text-xs font-medium text-neutral text-center p-0.5 leading-none rounded-full" style="width: {rec.prediksislot_prediksi}%"> 
                                        {rec.prediksislot_prediksi}%
                                    </section>
                                </section>
                            </a>
                        {/each}
                    </section>
                {:else}
                    <Placholder total_placeholder={4} />
                {/if}
            </div>
        </section>
        <section class="mb-4">
            <section class="tabs tabs-boxed mb-2">
                <span 
                    on:click={() => {
                        handleTabNews("newsberita");
                    }}
                    class="tab {tab_newsberita} text-xs lg:text-sm">Berita Hari Ini</span> 
                <span 
                    on:click={() => {
                        handleTabNews("newsmovie");
                    }}
                    class="tab {tab_newsmovie} text-xs lg:text-sm">Movie Hari Ini</span>
            </section>
            <section class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md ">
                <section class="card-body p-2 mb-2">
                    {#if panel_newberita}
                        {#if listnews != ""}
                            <h1 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Berita Hari Ini</h1>
                            <section class="flex flex-col w-full gap-2 h-[820px] scrollbar-hide overflow-auto">  
                                {#each listnews as rec}
                                    <a href="{rec.news_url}" target="_blank">
                                        <section class="card w-full bg-base-300 text-neutral-content rounded-none border-b-2 border-primary-focus">
                                            <section class="card-body p-2 mb-2">
                                                <img class="w-full h-1/2" 
                                                    use:lazy="{{src: rec.news_image}}" 
                                                    src="{imgdummy}" alt="{rec.news_title}">
                                                <h2 class="font-semibold text-xs lg:text-sm underline">{rec.news_title}</h2>
                                                <p class="text-[11px] lg:text-sm text-base-content/70">
                                                    {rec.news_descp}
                                                </p>
                                            </section>
                                        </section>
                                    </a>
                                {/each}
                            </section>
                        {:else}
                            <Placholder total_placeholder={10} />
                        {/if}
                    {/if}
                    {#if panel_newmovie}
                        {#if listnewsmovie != ""}
                            <h1 class="card-title border-b-2 border-primary-focus p-2 font-bold text-xs lg:text-sm">Movie Minggu Ini</h1>
                            <section class="flex flex-col w-full gap-2 h-[820px] scrollbar-hide overflow-auto">
                                {#each listnewsmovie as rec}
                                    <a href="{rec.news_url}" target="_blank">
                                        <section class="card w-full bg-base-300 text-neutral-content rounded-none border-b-2 border-primary-focus">
                                            <section class="card-body p-2 mb-2">
                                                <img class="w-full h-1/2" 
                                                    use:lazy="{{src: rec.news_image}}" 
                                                    src="{imgdummy}" alt="{rec.news_title}">
                                                <h2 class="font-semibold text-xs lg:text-sm underline">{rec.news_title}</h2>
                                                <p class="text-[11px] lg:text-sm text-base-content/70">
                                                    {rec.news_descp}
                                                </p>
                                            </section>
                                        </section>
                                    </a>
                                {/each}
                            </section>
                        {:else}
                            <Placholder total_placeholder={10} />
                        {/if}
                    {/if}
                </section>
            </section>
        </section>
    </aside>
</article>   