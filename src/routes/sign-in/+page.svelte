<script>
  import AuthHero from "$lib/components/auth/AuthHero.svelte";
  import SignInForm from "$lib/components/auth/SignInForm.svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-4">
  <div class="flex w-full max-w-6xl justify-between gap-40">
    <AuthHero />
    <SignInForm />
  </div>
</div>
