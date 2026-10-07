const B = import.meta.env.BASE_URL
const i = (f: string) => `${B}assets/img/${f}`
const m = (f: string) => `${B}assets/3d/${encodeURIComponent(f)}` // keeps "lego generated.glb" filename intact
export const A = {
  saleh: i('raden-saleh-tijgerjacht.jpg'),
  saleh: i('raden-saleh-tijgerjacht.jpg'),
  indomie: i('indomie.jpg'), soto: i('bamboe-soto-ayam.jpg'), royco: i('royco.jpg'),
  marinasi: i('marinasi.jpg'), lada: i('lada.jpg'), tea: i('jasmine-tea.jpg'),
  trains: [1, 2, 3, 4, 5, 6].map(n => i(`tiket-kereta-${n}.jpg`)),
  tiktok: [i('tiktok-glitch-1.jpg'), i('tiktok-glitch-2.jpg')],
  slogan: { jaehyun: [i('slogan-jaehyun-front.jpg'), i('slogan-jaehyun-back.jpg')], nct: [i('slogan-nct-dream-front.jpg'), i('slogan-nct-dream-back.jpg')] },
  ticket: { jaehyun: [i('ticket-jaehyun-front.jpg'), i('ticket-jaehyun-back.jpg')], nct: [i('tiket-nct-dream-front.jpg'), i('tiket-nct-dream-back.jpg')] },
  glb: { crusita: m('crusita-esteh.glb'), bugeo: m('bukeo.glb'), diffuser: m('diffuser.glb'), jeong: m('jeong-bokhyun.glb'), lego: m('lego generated.glb') },
}
