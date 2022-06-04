<script>
    export let total_placeholder = 1;
    let data = []
    for(let i=0;i<parseInt(total_placeholder);i++){
        data = [
            ...data,
            {
                temp: "asd",
            },
        ];
    }
</script>
<div class="animate-pulse flex space-x-4">
    <div class="flex-1 space-y-6 py-1">
        {#each data as rec }
        <div class="h-2 bg-slate-200 rounded"></div>
        <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
        </div>
        {/each}
    </div>
</div>