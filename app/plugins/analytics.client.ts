export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach((to) => {
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('config', 'G-HM1BLYRYW0', {
      page_path: to.fullPath
    })
  })
})
