"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Real WebGL 3D scene (three.js, loaded lazily AFTER first paint so it never slows the page):
 * a gold ring, orbiting pearls and a faceted gem that react to the mouse.
 * If WebGL / three is unavailable, or the user prefers reduced motion, the CSS fallback stays.
 */
export default function HeroScene3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup: () => void = () => undefined;

    // wait until the browser is idle so LCP / interaction are never blocked
    const start = () =>
      (async () => {
        try {
          const THREE = await import("three");
          const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
          if (disposed || !host.current) return;

          const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.05;
          const canvas = renderer.domElement;
          canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
          el.appendChild(canvas);

          const scene = new THREE.Scene();
          const pmrem = new THREE.PMREMGenerator(renderer);
          const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
          scene.environment = envTex;

          const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
          camera.position.set(0, 0, 9);

          scene.add(new THREE.AmbientLight(0xffffff, 0.5));
          const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
          key.position.set(4, 5, 6);
          scene.add(key);
          const rim = new THREE.PointLight(0xcbb7d4, 30, 30);
          rim.position.set(-6, -2, 4);
          scene.add(rim);

          const group = new THREE.Group();
          scene.add(group);

          const goldMat = new THREE.MeshStandardMaterial({ color: 0xc9a56a, metalness: 1, roughness: 0.22, envMapIntensity: 1.4 });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.22, 48, 160), goldMat);
          ring.rotation.set(1.1, 0.3, 0);
          group.add(ring);

          const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.07, 32, 120), goldMat);
          ring2.rotation.set(0.4, 1.0, 0.2);
          group.add(ring2);

          const gemMat = new THREE.MeshPhysicalMaterial({ color: 0xb88ac2, metalness: 0.2, roughness: 0.08, clearcoat: 1, envMapIntensity: 1.6, flatShading: true });
          const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.85, 0), gemMat);
          group.add(gem);

          const pearlMat = new THREE.MeshPhysicalMaterial({ color: 0xfdf6ee, roughness: 0.18, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.15, sheen: 1, sheenColor: new THREE.Color(0xf3d9e4) });
          const pearlGeo = new THREE.SphereGeometry(0.24, 40, 40);
          const pearls: { m: InstanceType<typeof THREE.Mesh>; a: number; r: number; y: number; s: number }[] = [];
          for (let i = 0; i < 16; i++) {
            const m = new THREE.Mesh(pearlGeo, pearlMat);
            const r = 2.9 + (i % 3) * 0.45;
            pearls.push({ m, a: (i / 16) * Math.PI * 2, r, y: Math.sin(i * 1.7) * 1.3, s: 0.25 + (i % 4) * 0.07 });
            group.add(m);
          }

          const resize = () => {
            const w = el.clientWidth || 1;
            const h = el.clientHeight || 1;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.position.z = w < 520 ? 12 : 9;
            camera.updateProjectionMatrix();
          };
          resize();
          const ro = new ResizeObserver(resize);
          ro.observe(el);

          let mx = 0, my = 0;
          const onMove = (e: PointerEvent) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
          };
          window.addEventListener("pointermove", onMove, { passive: true });

          let visible = true;
          const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
          io.observe(el);

          const clock = new THREE.Clock();
          let raf = 0;
          const loop = () => {
            raf = requestAnimationFrame(loop);
            if (!visible || document.hidden) return;
            const t = clock.getElapsedTime();
            ring.rotation.z = t * 0.35;
            ring2.rotation.x = 0.4 + t * 0.5;
            gem.rotation.y = t * 0.7;
            gem.rotation.x = Math.sin(t * 0.6) * 0.4;
            gem.position.y = Math.sin(t * 1.1) * 0.15;
            for (const p of pearls) {
              const a = p.a + t * p.s;
              p.m.position.set(Math.cos(a) * p.r, p.y + Math.sin(t * 0.9 + p.a) * 0.2, Math.sin(a) * p.r * 0.55);
            }
            group.rotation.y += (mx * 0.5 - group.rotation.y) * 0.04;
            group.rotation.x += (my * 0.25 - group.rotation.x) * 0.04;
            renderer.render(scene, camera);
          };
          raf = requestAnimationFrame(loop);
          setReady(true);

          cleanup = () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener("pointermove", onMove);
            scene.traverse((o) => {
              const m = o as InstanceType<typeof THREE.Mesh>;
              if (m.geometry) m.geometry.dispose();
            });
            [goldMat, gemMat, pearlMat].forEach((x) => x.dispose());
            envTex.dispose();
            pmrem.dispose();
            renderer.dispose();
            canvas.remove();
          };
        } catch {
          /* WebGL or three unavailable: the CSS fallback stays */
        }
      })();

    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);
    return () => {
      disposed = true;
      if (w.cancelIdleCallback && w.requestIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup();
    };
  }, []);

  return (
    <div ref={host} aria-hidden className={`pointer-events-none absolute ${className}`}>
      {/* CSS fallback / pre-load state: floating orbs */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <span className="float-slow absolute left-[12%] top-[20%] h-16 w-16 rounded-full bg-gradient-to-br from-white to-[#f3d9e4] shadow-xl" />
        <span className="float-slow absolute right-[10%] top-[40%] h-10 w-10 rounded-full bg-gradient-to-br from-white to-[#e6d6ee] shadow-xl [animation-delay:-2s]" />
        <span className="float-slow absolute bottom-[12%] left-[30%] h-12 w-12 rounded-full bg-gradient-to-br from-[#e9d3a6] to-[#c9a56a] shadow-xl [animation-delay:-4s]" />
      </div>
    </div>
  );
}
