// AI-upscaled copies of product photos, uploaded to "hiflux/updated images/"
// with the same sub-paths as the originals. Any image URL from the API or the
// code that has an upscaled copy is swapped for it. Add a path here once its
// upscaled file is in the blob container.
const BLOB = "https://pblol2.blob.core.windows.net/";
const HD_ROOT = `${BLOB}hiflux/updated%20images/`;

const UPSCALED: Record<string, string> = Object.fromEntries(
  [
    "Pressure-Temp-Flow-images/pressure-gauge.jpg",
    "Pressure-Temp-Flow-images/pump.jpg",
    "Pressure-Temp-Flow-images/thermocouple.jpg",
    "images/nb.jpeg",
    "images/rf.jpeg",
    "lok/hiflux_tube.png",
    "lok/lok-fitting.png",
    "lok/lok-type-valve.png",
    "regulators/abpr.png",
    "regulators/bp-regulator.png",
    "regulators/bpr-2.png",
    "regulators/hpr.png",
    "union-adapters/ba-60k.png",
    "union-adapters/f-f-u.png",
    "union-adapters/hpa-a-20k.png",
    "union-adapters/m-f-a.png",
    "union-adapters/m-m-a.png",
  ].map((p) => [`${BLOB}hiflux/${p}`, HD_ROOT + p]),
);
UPSCALED[`${BLOB}valvenok-images/products/hiflux/needle-valve.png`] = `${HD_ROOT}images/needle%20valve.png`;


/** The upscaled copy of an image URL, or the URL unchanged if there isn't one. */
export function hdImage(url: string): string {
  return UPSCALED[url] ?? url;
}

/** Swap every known image URL inside an API response for its upscaled copy. */
export function withHdImages<T>(data: T): T {
  if (typeof data === "string") return hdImage(data) as T;
  if (Array.isArray(data)) return data.map(withHdImages) as T;
  if (data && typeof data === "object") {
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, withHdImages(v)])) as T;
  }
  return data;
}
