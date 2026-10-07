import Image from "next/image";

export default function Logo({ variant = "color", showTagline = false, title = "Pavan Homecare", height = "4.0rem" }) {
  let logoSrc = "/images/pavan-logo/PavanHomecare_Transparent.webp";
  
  if (variant === "white") {
    logoSrc = "/images/pavan-logo/White_Version.webp";
  } else if (variant === "icon") {
    logoSrc = "/images/pavan-logo/PavanHomecare_IconOnly.webp";
  }

  return (
    <div 
      className="logo-container shrink-0 flex items-center gap-3" 
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        height: height,
        width: "auto"
      }}
    >
      <Image
        src={logoSrc}
        alt={title}
        width={1536}
        height={1024}
        quality={100}
        style={{
          height: height,
          width: "auto",
          maxHeight: height,
          objectFit: "contain"
        }}
        priority
      />
      {showTagline && (
        <span className={`text-[12px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full border hidden sm:inline-block ${
          variant === "white" 
            ? "text-[#8A97AC] border-white/15 bg-white/5" 
            : "text-[#0061FF] border-[#0061FF]/20 bg-[#E8F2FF]"
        }`}>
          Love driven care
        </span>
      )}
    </div>
  );
}
