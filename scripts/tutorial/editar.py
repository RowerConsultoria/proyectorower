"""Edita la grabación de un tutorial: recorta el arranque, acelera ×6 las esperas del agente,
mezcla la narración de cada paso en su instante y exporta informe/fase2/tutorial/<nombre>.mp4
(H.264 + AAC, faststart) y su póster .jpg. Necesita ffmpeg.

    python scripts/tutorial/editar.py <validacion-tobe|estructura> [segundos a recortar al inicio]

Sin recorte explícito, el video empieza en la portada (el primer paso). Los audios se buscan
en scripts/tutorial/voz/<nombre>/<id>.mp3; un paso sin audio queda solo con su subtítulo.
⚠️ El MP4 tiene que quedar por debajo de 25 MiB, el límite por archivo de Cloudflare Workers.
"""
import json, os, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
TRABAJO = os.path.join(AQUI, '_trabajo')
VOZ = os.path.join(AQUI, 'voz')
SALIDA = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'informe', 'fase2', 'tutorial')
VEL = 6.0

nombre = sys.argv[1]
m = json.load(open(os.path.join(TRABAJO, nombre + '-marcas.json'), encoding='utf-8'))
pasos = m['pasos']
inicio = float(sys.argv[2]) if len(sys.argv) > 2 else max(0.0, pasos[0][1] - 0.3)
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', m['video']]).decode().strip())

# tramos de video: (desde, hasta, velocidad)
tramos, t = [], inicio
for a, b in sorted(m['marcas']):
    if b <= t: continue
    a = max(a, t)
    if a > t: tramos.append((t, a, 1.0))
    tramos.append((a, b, VEL)); t = b
if t < dur: tramos.append((t, dur, 1.0))


def destino(x):
    """Segundo del video final que corresponde al segundo x de la grabación."""
    acc = 0.0
    for a, b, v in tramos:
        if x <= a: return acc
        if x < b: return acc + (x - a) / v
        acc += (b - a) / v
    return acc


filtro = []
for i, (a, b, v) in enumerate(tramos):
    filtro.append('[0:v]trim=start=%.3f:end=%.3f,setpts=(PTS-STARTPTS)/%.1f,fps=30[v%d]' % (a, b, v, i))
filtro.append(''.join('[v%d]' % i for i in range(len(tramos))) + 'concat=n=%d:v=1:a=0,format=yuv420p[vout]' % len(tramos))

entradas = ['-i', m['video']]
voces = []
for pid, tt in pasos:
    ruta = os.path.join(VOZ, nombre, pid + '.mp3')
    if os.path.exists(ruta):
        entradas += ['-i', ruta]
        voces.append((len(voces) + 1, destino(tt) + 0.25))
if voces:
    for k, ms in voces:
        filtro.append('[%d:a]aresample=44100,adelay=%d|%d[a%d]' % (k, int(ms * 1000), int(ms * 1000), k))
    filtro.append(''.join('[a%d]' % k for k, _ in voces) + 'amix=inputs=%d:normalize=0:dropout_transition=0,volume=1.0[aout]' % len(voces))

mp4 = os.path.join(SALIDA, nombre + '.mp4')
os.makedirs(SALIDA, exist_ok=True)
cmd = ['ffmpeg', '-y', '-v', 'error'] + entradas + ['-filter_complex', ';'.join(filtro), '-map', '[vout]']
if voces: cmd += ['-map', '[aout]', '-c:a', 'aac', '-b:a', '96k']
cmd += ['-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-movflags', '+faststart', mp4]
subprocess.check_call(cmd)
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-ss', '2.0', '-i', mp4, '-frames:v', '1', '-q:v', '4', os.path.join(SALIDA, nombre + '.jpg')])
final = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4]).decode().strip())
print('%s: grabación %.1f s -> video %.1f s, %d tramos, %d narraciones, %.1f MB' % (nombre, dur, final, len(tramos), len(voces), os.path.getsize(mp4) / 1e6))
