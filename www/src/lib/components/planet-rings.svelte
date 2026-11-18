<script>
/** @type {HTMLCanvasElement | undefined} */
let canvas = $state()

const COUNT = 220
// Radial depth of the ring system, as a fraction of the viewport size.
const SPREAD = 0.3
const STAGGER = 1200
const DURATION = 900
// Arc extent (radians, clockwise): from the left, over the top, down the right
// side and back under the "planet" toward the content below.
const A0 = Math.PI * 0.95
const A1 = Math.PI * 2.7
// Twinkle after the reveal: share of rings that twinkle, peak boost relative to
// a ring's own opacity, pulse sharpness (higher = briefer flares), ramp-in
// time, and frame rate cap.
const TWINKLE_SHARE = 0.35
const TWINKLE = 1.5
const TWINKLE_SHARPNESS = 6
const TWINKLE_FADE_IN = 2000
const TWINKLE_FPS = 30
const TILT = -0.8
const FLATTEN = 0.75
// A0/A1 are ellipse parameters; the shadow mask needs the real on-screen
// angles of the arc ends, which tilt and flattening both shift.
/** @param {number} theta */
const screenAngle = (theta) =>
	Math.atan2(FLATTEN * Math.sin(theta), Math.cos(theta)) + TILT
const SHADOW_START = screenAngle(A0)
const TAU = Math.PI * 2
const SHADOW_SPAN =
	((((screenAngle(A1) - SHADOW_START) % TAU) + TAU) % TAU) / TAU
// Inner → outer colour ramp: cream, grey, faint cyan.
const RAMP = [
	[235, 228, 210],
	[195, 198, 200],
	[170, 215, 222],
]

const rand = (min = 0, max = 1) => min + Math.random() * (max - min)

/** @param {number} t */
function rampColor(t) {
	const s = Math.min(t * 2, 1.999)
	const [a, b] = [RAMP[Math.floor(s)], RAMP[Math.floor(s) + 1]]
	const f = s % 1
	const l = rand(0.8, 1.1)
	return `rgb(${a.map((v, index) => Math.min(255, (v + (b[index] - v) * f) * l)).join(',')})`
}

/** @param {boolean} narrow */
function generate(narrow) {
	// Narrow screens have a much shallower band: use fewer, finer rings so they
	// stay distinct, and pull the colour ramp in so the cyan isn't cropped off.
	const count = narrow ? 130 : COUNT
	const scale = narrow ? 0.5 : 1
	const bumps = Array.from({ length: Math.floor(rand(3, 6)) }, () => [
		rand(0.05, 0.95),
		rand(0.05, 0.2),
		rand(0.4, 1),
	])
	// A bright band at the rim so the outer edge reads clearly.
	bumps.push([0.97, 0.03, 0.9])
	const gaps = Array.from({ length: Math.floor(rand(1, 4)) }, () => [
		rand(0.15, 0.85),
		rand(0.008, 0.03),
	])

	return Array.from({ length: count }, (_, index) => {
		const t = (index + rand()) / count
		let alpha = Math.min(
			1,
			bumps.reduce(
				(sum, [c, w, a]) => sum + a * Math.exp(-(((t - c) / w) ** 2)),
				0.1,
			),
		)
		if (gaps.some(([c, w]) => Math.abs(t - c) < w)) alpha *= 0.05
		// Wide, faint bands build a soft glow that follows the arc.
		const haze = t < 0.85 && rand() < 0.12
		return {
			t,
			alpha: haze
				? 0.06 + alpha * 0.1
				: Math.min(1, alpha * (0.3 + 0.7 * rand() ** 2) * (narrow ? 1.6 : 1)),
			width: (haze ? rand(30, 120) : rand(0.4, 3)) * scale,
			color: rampColor(narrow ? Math.min(t * 1.5, 1) : t),
			// Random order so rings fade in individually rather than as a wave.
			delay: rand(0, STAGGER),
			twinkle: !haze && rand() < TWINKLE_SHARE,
			period: rand(2500, 7000),
			phase: rand(),
		}
	})
}

$effect(() => {
	const node = canvas
	const context = node?.getContext('2d')
	// The finished rings, kept offscreen so the twinkle only redraws the few
	// rings that are flaring and copies the rest.
	const base = document.createElement('canvas')
	const baseContext = base.getContext('2d')
	if (!node || !context || !baseContext) return
	const rings = generate(innerWidth < 768)
	const twinklers = rings.filter((ring) => ring.twinkle)
	const end = STAGGER + DURATION
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
	let start = 0
	let frame = 0
	let revealed = 0
	let last = 0
	let visible = true

	const geometry = () => {
		const dpr = Math.min(devicePixelRatio, 3)
		const w = node.width / dpr
		const h = node.height / dpr
		const mobile = w < 768
		const u = Math.max(w, h * 0.9)
		const inner = u * (mobile ? 0.34 : 0.31)
		// Centre the rings on the title/subtitle block (the "planet").
		const cx = w * (mobile ? 0.45 : 0.33)
		const cy = h * 0.44
		return { dpr, w, h, u, inner, cx, cy }
	}

	/**
	 * @param {CanvasRenderingContext2D} target
	 * @param {ReturnType<typeof geometry>} g
	 */
	const begin = (target, g) => {
		target.setTransform(g.dpr, 0, 0, g.dpr, 0, 0)
		target.globalCompositeOperation = 'source-over'
		target.clearRect(0, 0, g.w, g.h)
	}

	/**
	 * @param {CanvasRenderingContext2D} target
	 * @param {ReturnType<typeof geometry>} g
	 * @param {ReturnType<typeof generate>[number]} ring
	 * @param {number} alpha
	 */
	const stroke = (target, g, ring, alpha) => {
		const r = g.inner + g.u * SPREAD * ring.t
		target.globalAlpha = alpha
		target.strokeStyle = ring.color
		target.lineWidth = ring.width
		target.beginPath()
		target.ellipse(g.cx, g.cy, r, r * FLATTEN, TILT, A0, A1)
		target.stroke()
	}

	/**
	 * @param {CanvasRenderingContext2D} target
	 * @param {ReturnType<typeof geometry>} g
	 */
	const mask = (target, { w, h, u, cx, cy }) => {
		// Light from the upper right; rings dim as they wrap under the planet.
		const gx = w * 0.75
		const gy = h * 0.1
		const light = target.createRadialGradient(gx, gy, 0, gx, gy, u)
		light.addColorStop(0, '#fff')
		light.addColorStop(0.6, 'rgb(255 255 255 / 0.6)')
		light.addColorStop(1, 'rgb(255 255 255 / 0.15)')
		// Fade out before the canvas edge so there's no seam on scroll.
		const fade = target.createLinearGradient(0, 0, 0, h)
		fade.addColorStop(0.6, '#fff')
		fade.addColorStop(1, 'transparent')
		// Fade both arc ends into the planet's shadow.
		const shadow = target.createConicGradient(SHADOW_START, cx, cy)
		shadow.addColorStop(0, 'transparent')
		shadow.addColorStop(0.12, '#fff')
		shadow.addColorStop(SHADOW_SPAN - 0.3, '#fff')
		shadow.addColorStop(SHADOW_SPAN - 0.02, 'transparent')
		target.globalAlpha = 1
		target.globalCompositeOperation = 'destination-in'
		for (const gradient of [light, fade, shadow]) {
			target.fillStyle = gradient
			target.fillRect(0, 0, w, h)
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} target
	 * @param {number} elapsed
	 */
	const draw = (target, elapsed) => {
		const g = geometry()
		begin(target, g)
		for (const ring of rings) {
			const p = Math.min(Math.max((elapsed - ring.delay) / DURATION, 0), 1)
			if (p) stroke(target, g, ring, ring.alpha * (1 - (1 - p) ** 3))
		}

		mask(target, g)
	}

	// Each twinkling ring pulses on its own period; raising the positive half of
	// a sine to a high power makes brief flares with long rests between. Only
	// flaring rings are drawn, masked, then the finished rings go underneath.
	/** @param {number} now */
	const twinkle = (now) => {
		const g = geometry()
		const ramp = Math.min((now - revealed) / TWINKLE_FADE_IN, 1)
		begin(context, g)
		for (const ring of twinklers) {
			const wave = Math.sin((now / ring.period + ring.phase) * TAU)
			const pulse = Math.max(wave, 0) ** TWINKLE_SHARPNESS * ramp
			if (pulse > 0.01) {
				stroke(context, g, ring, Math.min(1, ring.alpha * TWINKLE) * pulse)
			}
		}

		mask(context, g)
		context.setTransform(1, 0, 0, 1, 0, 0)
		context.globalCompositeOperation = 'destination-over'
		context.drawImage(base, 0, 0)
	}

	/** @param {number} now */
	const loop = (now) => {
		if (!visible) {
			frame = 0
			return
		}

		frame = requestAnimationFrame(loop)
		if (now - last < 1000 / TWINKLE_FPS) return
		last = now
		twinkle(now)
	}

	/** @param {number} now */
	const tick = (now) => {
		start ||= now
		const elapsed = now - start
		draw(context, elapsed)
		if (elapsed < end) {
			frame = requestAnimationFrame(tick)
			return
		}

		draw(baseContext, Infinity)
		revealed = now
		frame = requestAnimationFrame(loop)
	}

	const resizer = new ResizeObserver(() => {
		const dpr = Math.min(devicePixelRatio, 3)
		node.width = node.clientWidth * dpr
		node.height = node.clientHeight * dpr
		base.width = node.width
		base.height = node.height
		if (reduced) draw(context, Infinity)
		else if (revealed) {
			draw(baseContext, Infinity)
			twinkle(performance.now())
		}
	})
	resizer.observe(node)

	// Pause the twinkle while the rings are scrolled out of view.
	const viewer = new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting
		if (visible && revealed && !frame) frame = requestAnimationFrame(loop)
	})
	viewer.observe(node)

	if (!reduced) frame = requestAnimationFrame(tick)

	return () => {
		resizer.disconnect()
		viewer.disconnect()
		cancelAnimationFrame(frame)
	}
})
</script>

<canvas
	class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[100lvh] w-full"
	aria-hidden="true"
	bind:this={canvas}
></canvas>

<style>
canvas {
	mix-blend-mode: plus-lighter;
}
</style>
