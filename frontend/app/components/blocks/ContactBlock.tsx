import { Phone, Mail } from 'lucide-react';

interface ContactBlockProps {
  email: string;
  phone: string;
}

export function ContactBlock({ email, phone }: ContactBlockProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <a href={`tel:${phone}`} className="hover:text-primary">
              {phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <a href={`mailto:${email}`} className="hover:text-primary">
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 