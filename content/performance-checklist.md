# Core Web Vitals Checklist

- Keep hero visual as SVG and avoid heavy video assets in first viewport.
- Use `next/image` for all raster images and define explicit sizes.
- Load analytics (`Plausible`, `Clarity`) with non-blocking scripts only.
- Keep section animations lightweight (`opacity` + `translateY`) with short duration.
- Validate each release with Lighthouse mobile profile and track scores above 90.
