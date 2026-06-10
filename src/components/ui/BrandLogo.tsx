import Image from "next/image";
import { cn } from "@/lib/utils";
import logoBlanco from "@/../public/ludema-blanco.svg";
import logoNegro from "@/../public/ludema-negro.svg";
import logoArcade from "@/../public/ludema-arcade.svg";

// Logo de marca con la variante correcta por tema, vía CSS puro (las clases
// dark/theme-arcade viven en <html>, así que no hay estado ni hidratación).
export function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <>
      {/* Claro (por defecto) */}
      <Image
        src={logoBlanco}
        alt=""
        priority={priority}
        className={cn("dark:hidden", className)}
      />
      {/* Oscuro (dark sin arcade) */}
      <Image
        src={logoNegro}
        alt=""
        priority={priority}
        className={cn(
          "hidden dark:block dark:[.theme-arcade_&]:hidden",
          className,
        )}
      />
      {/* Arcade */}
      <Image
        src={logoArcade}
        alt=""
        priority={priority}
        className={cn("hidden [.theme-arcade_&]:block", className)}
      />
    </>
  );
}
