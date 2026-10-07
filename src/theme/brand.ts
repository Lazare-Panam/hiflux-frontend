// Shared brand backgrounds. Every blue section on the site uses BLUE_BG so the
// gradient and the decorative rings stay identical everywhere.

export const BLUE_GRADIENT = "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)";

// Soft concentric rings drawn with background layers (no extra DOM, so they
// work on any element without position/overflow changes).
const RINGS = [
  // large ring, bottom-right
  "radial-gradient(circle at 96% 115%, transparent 0 150px, rgba(255,255,255,0.09) 151px 205px, transparent 206px)",
  // filled disc, top-right
  "radial-gradient(circle at 82% -18%, rgba(255,255,255,0.08) 0 110px, transparent 111px)",
  // small ring, left
  "radial-gradient(circle at 4% 125%, transparent 0 70px, rgba(255,255,255,0.07) 71px 95px, transparent 96px)",
].join(", ");

export const BLUE_BG = `${RINGS}, ${BLUE_GRADIENT}`;

// Lighter version for thin strips (stats bar), where large rings would crowd.
export const BLUE_BG_STRIP = [
  "radial-gradient(circle at 98% 50%, transparent 0 60px, rgba(255,255,255,0.08) 61px 82px, transparent 83px)",
  "radial-gradient(circle at 2% 140%, rgba(255,255,255,0.06) 0 70px, transparent 71px)",
  "linear-gradient(90deg, #0072BC 0%, #0066a8 100%)",
].join(", ");
