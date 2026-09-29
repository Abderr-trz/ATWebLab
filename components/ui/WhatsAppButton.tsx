import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="Discuter sur WhatsApp">
      <MessageCircle size={22} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
