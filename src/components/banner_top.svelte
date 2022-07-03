<script>
    import Placholder from "../components/placholder.svelte";
    export let listbanner = [];
</script>
{#if listbanner != ""}
    <article class="hidden lg:flex flex-col w-full gap-2 mb-2">
        {#each listbanner as rec}
            {#if rec.banner_posisi == "TOP" && rec.banner_device == "WEB"}
                <img  class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
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
            <img class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
        {/if}
    {/each}
</article>