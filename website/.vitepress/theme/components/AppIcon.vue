<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    size?: number | string
    strokeWidth?: number
  }>(),
  { size: 20, strokeWidth: 1.8 }
)

const paths: Record<string, string> = {
  shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  layers:
    '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  plugins:
    '<path d="M9 3h6v4a2 2 0 0 0 4 0h2v6h-4a2 2 0 0 0 0 4v4H9v-4a2 2 0 0 0-4 0H3v-6h4a2 2 0 0 0 0-4H3V3h6Z"/>',
  terminal:
    '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  checkpoint:
    '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
  phone:
    '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',
  radar:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m12 12 6-6"/>',
  lock:
    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/>',
  book:
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/>',
  zap:
    '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  check:
    '<path d="m20 6-11 11-5-5"/>',
  spark:
    '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
  code:
    '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 4-4 16"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.95 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.58 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08A1.7 1.7 0 0 0 4.6 8.95a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.58a1.7 1.7 0 0 0 1.03-1.56V3h4v.08A1.7 1.7 0 0 0 15.05 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.42 9c.16.62.7 1.03 1.56 1.03H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/>',
  refresh:
    '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/>',
  folder:
    '<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>',
  file:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
  search:
    '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  edit:
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/>',
  download:
    '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  key:
    '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m16 6 2 2"/><path d="m18 4 2 2"/>',
  box:
    '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5"/><path d="M12 12v10"/>',
  windows:
    '<path d="M3 4.7 10 3.6v7.7H3V4.7Zm8-1.3 10-1.4v9.3H11V3.4ZM3 12.7h7v7.7l-7-1.1v-6.6Zm8 0h10v9.3l-10-1.4v-7.9Z" fill="currentColor" stroke="none"/>',
  apple:
    '<path d="M11.18.01c-.04-.04-1.26.02-2.32 1.18-1.07 1.15-.9 2.48-.88 2.51.03.04 1.52.09 2.48-1.25.95-1.35.76-2.4.73-2.44Zm3.31 11.73c-.05-.1-2.32-1.23-2.11-3.42.21-2.19 1.68-2.79 1.7-2.85.02-.07-.6-.79-1.26-1.16a3.69 3.69 0 0 0-1.56-.44c-.11 0-.48-.09-1.25.12-.51.14-1.66.59-1.97.6-.32.02-1.26-.52-2.27-.66-.65-.13-1.33.13-1.82.33-.5.19-1.43.75-2.08 2.23-.65 1.49-.31 3.83-.07 4.57.25.73.63 1.92 1.28 2.79.58.98 1.34 1.67 1.66 1.9.32.23 1.22.39 1.84.07.5-.31 1.41-.49 1.77-.47.35.01 1.06.15 1.78.54.57.2 1.11.12 1.65-.1.54-.22 1.32-1.06 2.24-2.76.34-.79.5-1.22.47-1.29Z" fill="currentColor" stroke="none" transform="translate(3.8 2.3) scale(.8)"/>',
  linux:
    '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m8 10 2 2-2 2"/><path d="M13 14h3"/>',
  eye:
    '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  git:
    '<circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v1A2.5 2.5 0 0 0 8.5 11h7A2.5 2.5 0 0 1 18 13.5v-5"/><path d="M12 13v4"/>',
  local:
    '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3"/><path d="M15 2v3"/><path d="M9 19v3"/><path d="M15 19v3"/><path d="M2 9h3"/><path d="M2 15h3"/><path d="M19 9h3"/><path d="M19 15h3"/>',
  arrow:
    '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  external:
    '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  github:
    '<path d="M15 22v-4a4 4 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4A5.3 5.3 0 0 0 19.2.5S18 0 15 1.8a15 15 0 0 0-6 0C6 .1 4.8.5 4.8.5a5.3 5.3 0 0 0-.1 3.5 5.7 5.7 0 0 0-1.5 4c0 5.7 3.5 6.9 6.8 7.3A4 4 0 0 0 9 18v4"/><path d="M9 21.5c-3 1-3-1.5-4.5-2"/>',
  telegram:
    '<path d="m21 4-3 16-6-4-3 3v-5l9-7-11 6-4-2 18-7Z"/>'
}
</script>

<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <g v-html="paths[name] || paths.spark" />
  </svg>
</template>
