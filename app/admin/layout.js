export const metadata = {
  title: "Admin Portal | Pavan Homecare",
  description: "Pavan Homecare Internal Inquiries & Lead Management Portal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1
    }
  }
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-portal-wrapper min-h-screen bg-[#F1F5F9] text-[#0F172A] font-sans antialiased">
      {children}
    </div>
  );
}
