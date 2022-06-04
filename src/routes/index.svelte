<script context="module">
    export const load = async ({ fetch,url }) => {
        // api/listkeluaran/index.js
        // api/listnews/index.js
        // api/listnewmovie/index.js
        // api/bukumimpi/index.js
        // api/tafsirmimpi/index.js
        let hostname_client = url.host
        let listkeluaran = [];
        let listnews = [];
        let bukumimpi = [];
        const res_listkeluaran = await fetch("/api/listkeluaran", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client
            }),
        })
        const record_listkeluaran = await res_listkeluaran.json();
        listkeluaran = record_listkeluaran.data

        const res_listnews = await fetch("/api/listnews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client
            }),
        })
        const record_listnews = await res_listnews.json();
        listnews = record_listnews.data

        
        const res_bukumimpi = await fetch("/api/bukumimpi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostname:hostname_client
            }),
        })
        const record_bukumimpi = await res_bukumimpi.json();
        bukumimpi = record_bukumimpi.data
        return {
            props: {
                hostname_client,
                listkeluaran,
                listnews,
                bukumimpi,
            }
        }
    };
</script>
<script>
    import imgdummy from '$lib/assets/placeholder.png';
    import Placholder from '../components/placholder.svelte';
    import Banner_top from '../components/banner_top.svelte';

    export let hostname_client = "";
    export let listkeluaran = [];
    export let listnews = [];
    export let bukumimpi = [];
    const loaded = new Map();
    let tafsirmimpi = [];
    let listnewsmovie = [];
    let tipe_bukumimpi = "";
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
    let panel_groupbookdream_bfs = false
    let tab_bukumimpi_all = "tab-active"
    let tab_bukumimpi_4d = ""
    let tab_bukumimpi_3d = ""
    let tab_bukumimpi_2d = ""
    let tab_newsberita = "tab-active"
    let tab_newsmovie = ""
    let panel_newberita = true
    let panel_newmovie = false
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
    async function postbukumimpi(){
        filterBukuMimpi = [];
        bukumimpi = [];
        const resdata = await fetch("/api/bukumimpi", {
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
    async function posttafsirmimpi(){
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
                panel_groupbookdream_bfs = false
                postbukumimpi();
                break;
            case "tafsirmimpi":
                searchtafsirmimpi = "";
                tab_groupbookdream_bukumimpi = ""
                tab_groupbookdream_tafsirmimpi = "tab-active"
                tab_groupbookdream_bbfs = ""
                panel_groupbookdream_bukumimpi = false
                panel_groupbookdream_tafsirmimpi = true
                panel_groupbookdream_bfs = false
                posttafsirmimpi()
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
        postbukumimpi();
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
</script>
<svelte:head>
    <title>Hasil Keluaran Togel / Berita Hari Ini</title>
    <meta name="description" content="Keluaran Togel Hongkong, Keluaran nomor togel, keluaran nomor togel, Keluaran hk, Keluaran sgp, Keluaran bullseye, Keluaran nomor sgp">
    <meta name="author" content="resultsdsb.com">
</svelte:head>
<Banner_top />
<article class="grid grid-cols-2 w-full gap-2">
    <section class="w-full">
        <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listkeluaran != ""}
                    <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Keluaran Togel</h2>
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-xs text-left">PASARAN</th> 
                                    <th class="text-xs text-center">TANGGAL</th> 
                                    <th class="text-xs text-left">HARI</th> 
                                    <th class="text-xs text-center">JADWAL</th> 
                                    <th class="text-xs text-center">KELUARAN</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {#each listkeluaran as rec}
                                    <tr>
                                        <td class="text-xs text-left">{rec.pasaran_name}</td> 
                                        <td class="text-xs text-center">{rec.pasaran_datekeluaran}</td> 
                                        <td class="text-xs text-left">{rec.pasaran_name}</td> 
                                        <td class="text-xs text-center">{rec.pasaran_jamjadwal}</td> 
                                        <td class="text-xs text-center">
                                            <span class="text-accent underline cursor-pointer">{rec.pasaran_keluaran}</span>
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
            
        </aside>
        <section class="mb-4">
            <aside class="tabs tabs-boxed mb-2">
                <a 
                    on:click={() => {
                        handleTabOne("tab_1_1");
                    }}
                    class="tab {tab_1_1}">Angka Main</a> 
                <a 
                    on:click={() => {
                        handleTabOne("tab_1_2");
                    }}
                    class="tab {tab_1_2}">Table Shio</a>
                <a 
                    on:click={() => {
                        handleTabOne("tab_1_3");
                    }}
                    class="tab {tab_1_3}">Table Tyesen</a>
            </aside>
            {#if panel_1_1}
                <aside class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">HARI</th> 
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">PON</th> 
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">WAGE</th> 
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">KLIWON</th> 
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">LEGI</th>
                                        <th class="text-xs text-center bg-accent text-base-300 border-none">PAHING</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">SENIN</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">89102</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td>
                                    </tr>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">RABU</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">90123</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">89012</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">34576</td>
                                    </tr>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">KAMIS</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">45678</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td>
                                    </tr>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">SABTU</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">34567</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">67890</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">23456</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">12345</td>
                                    </tr>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">MINGGU</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">01234</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td> 
                                        <td class="text-xs text-center bg-accent text-base-300 border-none font-semibold">56789</td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </aside>
            {/if}
            {#if panel_1_2}
                <aside class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2 bg-accent rounded-none">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <thead class="rounded-none">
                                    <tr>
                                        <th class="text-xs text-center bg-accent text-black">SHIO</th> 
                                        <th class="text-xs text-center bg-accent text-black" colspan="9">ANGKA</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {#each datashio as shio}
                                        <tr>
                                        {#each shio as dt, j}
                                            {#if j === 0}
                                            <td class="text-xs text-center bg-accent text-black border-none font-semibold">{shio[j]}</td>
                                            {:else}
                                            <td class="text-xs text-center bg-accent text-black border-none font-semibold">{shio[j]}
                                            </td>
                                            {/if}
                                        {/each}
                                        </tr>
                                    {/each}
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </aside>
            {/if}
            {#if panel_1_3}
                <aside class="card w-full bg-accent shadow-xl text-neutral-content rounded-md">
                    <div class="card-body p-2 mb-2 ">
                        <div class="overflow-x-auto">
                            <table class="table table-compact w-full">
                                <tbody>
                                    <tr>
                                        <td class="text-xs text-center bg-accent text-base-300 font-semibold">
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
                                        <td class="text-xs text-center bg-accent text-base-300 font-semibold">
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
                                        <td class="text-xs text-center bg-accent text-base-300 font-semibold">
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
                                        <td class="text-xs text-center bg-accent text-base-300 font-semibold">
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
                                        <td class="text-xs text-center bg-accent text-base-300 font-semibold">
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
                </aside>
            {/if}
        </section>
        <section class="mt-2">
            <aside class="tabs tabs-boxed mb-2">
                <a 
                    on:click={() => {
                        handleGroupBookDream("bukumimpi");
                    }}
                    class="tab {tab_groupbookdream_bukumimpi}">Buku Mimpi</a> 
                <a 
                    on:click={() => {
                        handleGroupBookDream("tafsirmimpi");
                    }}
                    class="tab {tab_groupbookdream_tafsirmimpi}">Tafsir Mimpi</a> 
                <a 
                    on:click={() => {
                        handleGroupBookDream("bbfs");
                    }}
                    class="tab {tab_groupbookdream_bbfs}">BBFS</a>
            </aside>
            <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md">
                <div class="card-body p-2 mb-2 ">
                    {#if panel_groupbookdream_bukumimpi}
                        <div class="flex flex-col gap-2">
                            <aside class="tabs tabs-boxed">
                                <a 
                                    on:click={() => {
                                        handleClickBukuMimpi("ALL");
                                    }}
                                    class="tab {tab_bukumimpi_all}">All</a> 
                                <a 
                                    on:click={() => {
                                        handleClickBukuMimpi("4D");
                                    }}
                                    class="tab {tab_bukumimpi_4d}">4D</a> 
                                <a 
                                    on:click={() => {
                                        handleClickBukuMimpi("3D");
                                    }}
                                    class="tab {tab_bukumimpi_3d}">3D</a>
                                <a 
                                    on:click={() => {
                                        handleClickBukuMimpi("2D");
                                    }}
                                    class="tab {tab_bukumimpi_2d}">2D</a>
                            </aside>
                            <input
                                bind:value={searchbukumimpi} 
                                on:keypress={handleKeyboardbukumimpi_checkenter}
                                type="text" placeholder="Search" class="input input-bordered w-full rounded-md input-sm" />
                            <div class="flex flex-col p-2 gap-2 h-[500px] scrollbar-hide overflow-auto">
                                {#if filterBukuMimpi != ""}
                                    {#each filterBukuMimpi as rec}
                                        <div class="flex justify-start gap-4">
                                            <div class="text-accent text-sm self-center">
                                                {rec.bukumimpi_type}
                                            </div>
                                            <p class="text-sm">
                                                {rec.bukumimpi_name}
                                                <br>
                                                <span class="text-accent text-sm">{rec.bukumimpi_nomor}</span>
                                            </p>
                                        </div>
                                    {/each}
                                {:else}
                                    <Placholder total_placeholder={6} />
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
                            <div class="flex flex-col p-2 gap-2 h-[550px] scrollbar-hide overflow-auto">
                                {#if filterTafsirMimpi != ""}
                                    {#each filterTafsirMimpi as rec}
                                        <p class="text-sm">
                                            {rec.tafsirmimpi_artimimpi}
                                            <br>
                                            2D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka2d}</span><br>
                                            3D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka3d}</span><br>
                                            4D : <span class="text-accent text-sm">{rec.tafsirmimpi_angka4d}</span>
                                        </p>
                                    {/each}
                                {:else}
                                    <Placholder total_placeholder={7} />
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            </aside>
        </section>
    </section>
    <section class="w-full">
        <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md mb-2">
            <div class="card-body p-2 mb-2">
                {#if listkeluaran != ""}
                    <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Prediksi Togel</h2>
                    <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th class="text-xs text-left">PASARAN</th> 
                                    <th class="text-xs text-center">TANGGAL</th> 
                                    <th class="text-xs text-center">BBFS</th> 
                                    <th class="text-xs text-center">NOMOR</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {#each listkeluaran as rec}
                                    <tr>
                                        <td class="text-xs text-left">{rec.pasaran_name}</td> 
                                        <td class="text-xs text-center">{rec.pasaran_dateprediksi}</td> 
                                        <td class="text-xs text-center">
                                            <span class="text-accent">{rec.pasaran_bbfsprediksi}</span>
                                        </td>
                                        <td class="text-xs text-center">
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
        </aside>
        <section class="mb-4">
            <aside class="tabs tabs-boxed mb-2">
                <a 
                    on:click={() => {
                        handleTabNews("newsberita");
                    }}
                    class="tab {tab_newsberita}">Berita Hari Ini</a> 
                <a 
                    on:click={() => {
                        handleTabNews("newsmovie");
                    }}
                    class="tab {tab_newsmovie}">Movie Hari Ini</a>
            </aside>
            <aside class="card w-full bg-base-300 shadow-xl text-neutral-content rounded-md ">
                <aside class="card-body p-2 mb-2">
                    {#if panel_newberita}
                        {#if listnews != ""}
                            <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Berita Hari Ini</h2>
                            <div class="flex flex-col w-full gap-2 h-[820px] scrollbar-hide overflow-auto">  
                                {#each listnews as rec}
                                    <a href="{rec.news_url}" target="_blank">
                                        <div class="card w-full bg-base-300 text-neutral-content rounded-none border-b-2 border-primary-focus">
                                            <div class="card-body p-2 mb-2">
                                                <img class="w-full h-1/2" 
                                                    use:lazy="{{src: rec.news_image}}" 
                                                    src="{imgdummy}" alt="{rec.news_title}">
                                                <h2 class="font-semibold text-sm underline">{rec.news_title}</h2>
                                                <p class="text-xs text-base-content/70">
                                                    {rec.news_descp}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                {/each}
                            </div>
                        {:else}
                            <Placholder total_placeholder={10} />
                        {/if}
                    {/if}
                    {#if panel_newmovie}
                        {#if listnewsmovie != ""}
                            <h2 class="card-title border-b-2 border-primary-focus p-2 font-bold text-sm">Movie Minggu Ini</h2>
                            <div class="flex flex-col w-full gap-2 h-[820px] scrollbar-hide overflow-auto">
                                {#each listnewsmovie as rec}
                                    <a href="{rec.news_url}" target="_blank">
                                        <div class="card w-full bg-base-300 text-neutral-content rounded-none border-b-2 border-primary-focus">
                                            <div class="card-body p-2 mb-2">
                                                <img class="w-full h-1/2" 
                                                    use:lazy="{{src: rec.news_image}}" 
                                                    src="{imgdummy}" alt="{rec.news_title}">
                                                <h2 class="font-semibold text-sm underline">{rec.news_title}</h2>
                                                <p class="text-xs text-base-content/70">
                                                    {rec.news_descp}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                {/each}
                            </div>
                        {:else}
                            <Placholder total_placeholder={10} />
                        {/if}
                    {/if}
                </aside>
            </aside>
        </section>
    </section>
</article>
