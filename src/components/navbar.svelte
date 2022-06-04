<script>
    import { browser } from '$app/env'
    import logo from '$lib/assets/logo_sdsbresult.png';
    let client_device = "WEBSITE"
    if(browser){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            client_device = "MOBILE";
        } else {
            client_device = "WEBSITE";
        }
    }
</script>
{#if client_device == "WEBSITE"}
  <header class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content shadow-sm">
    <nav class="navbar bg-base-300 ">
        <div class="navbar-start">
          
        </div>
        <div class="navbar-center">
          <a href="/" class="btn btn-ghost normal-case text-xl">
            <img src="{logo}" alt="Hasil Keluaran Togel / Berita Hari Ini" width="100">
          </a>
        </div>
        <div class="navbar-end">
          
        </div>
    </nav>
  </header>
{:else}
  <header>
    <nav class="navbar bg-base-300 h-[30px] ">
      <div class="navbar-start">
        
      </div>
      <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl">
          <img src="{logo}" alt="Hasil Keluaran Togel / Berita Hari Ini" width="100">
        </a>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Home</a></li>
            <li><a href="/">Buku Mimpi</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
{/if}