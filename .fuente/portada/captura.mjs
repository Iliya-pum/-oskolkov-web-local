// Скриншот верха страницы для блока Trabajos: окно 1440×900, снимок 1440×6000 → PNG.
// node captura.mjs <url> <salida.png>   (запускает portada.py --captura; нужен Edge или Chrome)
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, css = ''] = process.argv.slice(2);  // css: estilos solo para la foto (p. ej. bloques fijados al hacer scroll)
if (!url || !out) { console.error('uso: node captura.mjs <url> <salida.png>'); process.exit(1); }
const W = 1440, H = 900, ALTO = 6000;
const navegadores = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const nav = navegadores.find(existsSync);
if (!nav) { console.error('No encuentro Edge ni Chrome'); process.exit(1); }
const perfil = mkdtempSync(join(tmpdir(), 'portada-'));
const port = 9400 + Math.floor(Math.random() * 400);
const p = spawn(nav, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${perfil}`, '--no-first-run',
  '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
try {
  let lista;
  for (let i = 0; i < 60 && !lista; i++) { try { lista = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await sleep(250); } }
  const ws = new WebSocket(lista.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = expr => send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  await sleep(3000);
  if (css) await ev(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.append(s)})()`);
  // todas las imágenes ya, bajar despacio (que aparezcan los bloques) y volver arriba
  await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager')`);
  await ev(`(async()=>{for(let y=0;y<=${ALTO + H};y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}scrollTo(0,0);})()`);
  await ev(`Promise.race([Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))), new Promise(r=>setTimeout(r,20000))])`);
  await sleep(2500);
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: ALTO, scale: 1 } });
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log('ok', out);
  ws.close();
} finally {
  p.kill();
  await sleep(500);
  try { rmSync(perfil, { recursive: true, force: true }); } catch {}
}
