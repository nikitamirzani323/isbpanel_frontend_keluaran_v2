<script>
    export let listbanner = [];
</script>
<article class="hidden lg:flex flex-col w-full gap-2 mb-2">
    {#each listbanner as rec}
        {#if rec.banner_posisi == "TOP" && rec.banner_device == "WEB"}
            <img class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
        {/if}
    {/each}
</article>
<article class="flex lg:hidden flex-col w-full gap-2 mb-2">
    {#each listbanner as rec}
        {#if rec.banner_posisi == "TOP" && rec.banner_device == "MOBILE"}
            <img class="w-full " src="{rec.banner_url}" alt="BANNER ISB88">
        {/if}
    {/each}
</article>