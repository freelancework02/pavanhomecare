import Image from "next/image";

export default function Logo({ variant = "color", title = "Pavan Homecare", height = "4.0rem" }) {
  const isWhite = variant === "white";
  const logoSrc = isWhite 
    ? "/images/pavan-logo/White_Version.png" 
    : "/images/pavan-logo/PavanHomecare_Transparent.png";

  return (
    <div 
      className="logo-container shrink-0" 
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
    </div>
  );
}
