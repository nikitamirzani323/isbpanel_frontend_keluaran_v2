<script>
    export let listbanner = [];
</script>
<article class="hidden lg:flex flex-col w-full gap-2 mb-2">
    {#each listbanner as rec}
        {#if rec.banner_posisi == "TOP"}
            <img class="w-full" src="{rec.banner_url}" alt="BANNER ISB88">
        {/if}
    {/each}
</article>