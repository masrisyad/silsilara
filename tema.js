// Tema halaman situs: bawaan terang, pilihan gelap diingat di localStorage. Dimuat di <head> (tanpa defer) agar
// tema terpasang sebelum halaman tampil; tombol #tombol-tema (bila ada di halaman) mengganti tema.
;(() => {
  const KUNCI = 'silsilara.situs.tema'
  const akar = document.documentElement
  const pasang = (tema) => {
    if (tema === 'gelap') akar.dataset.tema = 'gelap'
    else delete akar.dataset.tema
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tema === 'gelap' ? '#0a0f0e' : '#f5f2ea')
    const tombol = document.getElementById('tombol-tema')
    if (tombol) {
      const label = tema === 'gelap' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
      tombol.setAttribute('aria-label', label)
      tombol.title = label
    }
  }
  let tersimpan = null
  try {
    tersimpan = localStorage.getItem(KUNCI)
  } catch {}
  pasang(tersimpan)
  document.addEventListener('DOMContentLoaded', () => {
    pasang(akar.dataset.tema)
    document.getElementById('tombol-tema')?.addEventListener('click', () => {
      const baru = akar.dataset.tema === 'gelap' ? 'terang' : 'gelap'
      pasang(baru)
      try {
        localStorage.setItem(KUNCI, baru)
      } catch {}
    })
  })
})()
