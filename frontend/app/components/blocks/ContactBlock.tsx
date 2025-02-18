import { Button } from "@/app/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export interface ContactBlockProps {
  email: string;
  phone: string;
  address: string;
  contactName: string;
}

export function ContactBlock({ email, phone, address, contactName }: ContactBlockProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-8 max-w-[1400px]">
        <h2 className="font-['EB_Garamond'] text-4xl text-center mb-12 text-[#D40000]">
          Kontakt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-[#D40000]" />
              <a href={`mailto:${email}`} className="text-lg text-gray-900 hover:text-[#D40000] transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-[#D40000]" />
              <a href={`tel:${phone}`} className="text-lg text-gray-900 hover:text-[#D40000] transition-colors">
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-[#D40000]" />
              <span className="text-lg text-gray-900">
                {address.split(',').map((line, index) => (
                  <span key={index}>{line.trim()}<br /></span>
                ))}
              </span>
            </div>
            <Button
              variant="default"
              className="bg-[#D40000] hover:bg-[#990000] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
            >
              Kontaktiere uns
            </Button>
          </div>
          {/* <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${address}+(${contactName})&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div> */}
        </div>
      </div>
    </section>
  );
} 