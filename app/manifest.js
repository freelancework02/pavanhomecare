export default function manifest() {
  return {
    name: "Pavan Homecare",
    short_name: "Pavan",
    description: "Licensed in-home senior care and caregiver services across Pennsylvania. Love driven care.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0061FF",
    icons: [
      {
        src: "/icon.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/favicon.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
