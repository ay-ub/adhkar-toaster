export function scheduleAdhkar(
  onTick: () => void,
  intervalMs: number,
): () => void {
  if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    throw new RangeError("intervalMs must be a positive finite number");
  }

  const intervalId = setInterval(onTick, intervalMs);
  return () => clearInterval(intervalId);
}
