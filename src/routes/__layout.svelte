<script> 
    import "../tailwind.css";
    import Nav from "../components/navbar.svelte"
    import Footer from "../components/footer.svelte"
</script>

<Nav />
<main class="p-2 lg:p-3 max-w-6xl mx-auto lg:glass lg:bg-opacity-60 xl:rounded-box mt-2 mb-2">
    <slot />
</main>
<Footer />