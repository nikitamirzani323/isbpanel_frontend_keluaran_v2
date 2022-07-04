<script>
    import Placholder from "../components/placholder.svelte";
    export let listbanner = [];
</script>
{#if listbanner != ""}
    <article class="hidden lg:flex flex-col w-full gap-2 mb-2">
        {#each listbanner as rec}
            {#if rec.banner_posisi == "TOP" && rec.banner_device == "WEB"}
                <a href="{rec.banner_urlwebsite}" target="_blank">
                    <img  class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
                </a>
            {/if}
        {/each}
    </article>
{:else}
    <article class="hidden lg:flex flex-col w-full gap-2 mb-2">
        <Placholder total_placeholder=2 />
    </article>
{/if}
<article class="flex lg:hidden flex-col w-full gap-2 mb-2">
    {#each listbanner as rec}
        {#if rec.banner_posisi == "TOP" && rec.banner_device == "MOBILE"}
            <a href="{rec.banner_urlwebsite}" target="_blank">
                <img class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
            </a>
        {/if}
    {/each}
</article>