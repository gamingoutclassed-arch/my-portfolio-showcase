import { Github, Linkedin, Mail, Phone } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/MurtazaMajid", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/murtaza-majid", label: "LinkedIn" },
  { icon: Mail, href: "mailto:Murtazamajid.123@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+923115747189", label: "Phone" },
];

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6 text-center">
      <div className="flex justify-center gap-5 mb-6">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Murtaza Majid. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
