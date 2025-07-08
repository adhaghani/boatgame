import React from "react";
import br from "./flag-br-svgrepo-com.svg";
import es from "./flag-es-svgrepo-com.svg";
import fr from "./flag-fr-svgrepo-com.svg";
import gb from "./flag-gb-eng-svgrepo-com.svg";
import gr from "./flag-gr-svgrepo-com.svg";

const flagMap: Record<string, string> = {
  Brazilian: br,
  Spanish: es,
  French: fr,
  English: gb,
  Greek: gr
};

export const Flag: React.FC<{ country: string; className?: string }> = ({
  country,
  className
}) => {
  const src = flagMap[country];
  if (!src) return null;
  return <img src={src} alt={`${country} flag`} className={className} />;
};
