"use client";

export type PointerFrame = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  deltaX: number;
  deltaY: number;
  active: boolean;
  pointerType: "mouse" | "touch" | "pen" | "unknown";
  elapsed: number;
  deltaTime: number;
};

export type PointerSubscriber = {
  onPointer?: (frame: PointerFrame) => void;
  onFrame?: (frame: PointerFrame) => void;
};

const subscribers = new Set<PointerSubscriber>();
let animationFrame = 0;
let attached = false;
let pointerDirty = false;
let active = false;
let pointerType: PointerFrame["pointerType"] = "unknown";
let x = -1000;
let y = -1000;
let previousX = -1000;
let previousY = -1000;
let lastTime = 0;

function queueFrame() {
  if (!animationFrame && document.visibilityState === "visible") animationFrame = window.requestAnimationFrame(runFrame);
}

function makeSnapshot(now: number): PointerFrame {
  const elapsed = lastTime ? now - lastTime : 16.667;
  return { x, y, previousX, previousY, deltaX: x - previousX, deltaY: y - previousY, active, pointerType, elapsed: now, deltaTime: Math.min(Math.max(elapsed, 1), 32) };
}

function runFrame(now: number) {
  animationFrame = 0;
  const snapshot = makeSnapshot(now);
  if (pointerDirty) {
    subscribers.forEach((subscriber) => subscriber.onPointer?.(snapshot));
    pointerDirty = false;
  }
  subscribers.forEach((subscriber) => subscriber.onFrame?.(snapshot));
  previousX = x;
  previousY = y;
  lastTime = now;
  if (Array.from(subscribers).some((subscriber) => subscriber.onFrame)) queueFrame();
}

function normalisePointerType(value: string): PointerFrame["pointerType"] {
  return value === "mouse" || value === "touch" || value === "pen" ? value : "unknown";
}

function updatePointer(event: PointerEvent, nextActive: boolean) {
  previousX = x;
  previousY = y;
  x = event.clientX;
  y = event.clientY;
  active = nextActive;
  pointerType = normalisePointerType(event.pointerType);
  pointerDirty = true;
  queueFrame();
}

function clearPointer() {
  previousX = x;
  previousY = y;
  x = -1000;
  y = -1000;
  active = false;
  pointerDirty = true;
  queueFrame();
}

const onPointerMove = (event: PointerEvent) => updatePointer(event, true);
const onPointerDown = (event: PointerEvent) => updatePointer(event, true);
const onPointerUp = (event: PointerEvent) => updatePointer(event, false);
const onPointerCancel = (event: PointerEvent) => updatePointer(event, false);

function onVisibilityChange() {
  if (document.visibilityState !== "visible") {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    return;
  }
  lastTime = 0;
  queueFrame();
}

function attachListeners() {
  if (attached) return;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerCancel, { passive: true });
  window.addEventListener("pointerleave", clearPointer, { passive: true });
  window.addEventListener("blur", clearPointer);
  document.addEventListener("visibilitychange", onVisibilityChange);
  attached = true;
}

function detachListeners() {
  if (!attached) return;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerCancel);
  window.removeEventListener("pointerleave", clearPointer);
  window.removeEventListener("blur", clearPointer);
  document.removeEventListener("visibilitychange", onVisibilityChange);
  attached = false;
}

export function subscribePointer(subscriber: PointerSubscriber) {
  subscribers.add(subscriber);
  attachListeners();
  queueFrame();
  return () => {
    subscribers.delete(subscriber);
    if (!subscribers.size) {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      detachListeners();
    }
  };
}
