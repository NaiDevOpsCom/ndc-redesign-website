import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#d1e2f2] dark:bg-[#6B7280CC] text-[#22223B] pt-10 pb-4 px-2 md:px-0 border-t border-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Affiliates */}
          <div>
            <div className="flex items-center gap-6 mb-6">
              <img
                src="https://res.cloudinary.com/nairobidevops/image/upload/v1751295185/My%20Brand/devOpsLogo-EpoD6axe_wgwtya.png"
                alt="DevOps Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="font-bold mb-1 mt-4 text-base">Our Affiliates</div>
            <div className="text-sm mb-2 text-[#444]">
              In collaboration with{" "}
              <a
                href="https://africadevops.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#219EBC] underline"
              >
                Africa DevOps Summit
              </a>
            </div>

            <div className="flex flex-row items-center space-x-5 mt-6 mb-2">
              <a
                href="https://x.com/nairobidevops"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg
                  className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.53 2.477h3.924l-8.56 9.85 10.09 13.196h-7.98l-6.25-8.19-7.16 8.19H.07l9.13-10.51L0 2.477h8.13l5.77 7.57zm-1.13 17.03h2.17L7.1 4.36H4.8z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nairobidevops/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors" />
              </a>
              <a
                href="https://instagram.com/nairobidevops"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@NairobiDevopsCommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/p/Nairobi-DevOps-Community-61562060464876/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors" />
              </a>
              <a
                href="https://www.whatsapp.com/channel/0029VbB0nYp4tRrwhzvySL1S"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg
                  className="h-5 w-5 text-[#22223B] hover:text-[#219EBC] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.97.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-bold mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/learn"
                  className="hover:text-[#219EBC] transition-colors"
                >
                  Learn with Us
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-[#219EBC] transition-colors"
                >
                  Shop our Merchants
                </a>
              </li>
              <li>
                <a
                  href="/faqpage"
                  className="hover:text-[#219EBC] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/partners"
                  className="hover:text-[#219EBC] transition-colors"
                >
                  Partners & Sponsors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <div className="font-bold mb-2">Contact Us</div>
            <div className="flex items-center text-sm mb-2">
              <Phone className="h-4 w-4 text-[#219EBC] mr-2" />
              <a
                href="tel:+254796445130"
                className="hover:underline text-[#219EBC]"
              >
                +254 796 445130
              </a>
            </div>
            <div className="flex items-center text-sm mb-2">
              <Mail className="h-4 w-4 text-[#219EBC] mr-2" />
              <a
                href="mailto:info@nairobidevops.org"
                className="hover:underline text-[#219EBC]"
              >
                info@nairobidevops.org
              </a>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-[#219EBC] mr-2" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          {/* Newsletter */}
          <div id="newsletter">
            <div className="font-bold mb-2">Subscribe to our newsletter</div>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter you email Address"
                className="bg-white border border-gray-300 text-[#22223B] placeholder:text-gray-400 focus:border-[#219EBC] h-10 rounded"
              />
              <Button
                type="submit"
                className="bg-[#219EBC] hover:bg-[#023047] text-white rounded h-8 text-sm font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#22223B] gap-2">
          <div>
            &copy; 2023–{currentYear} Nairobi DevOps Community. Powered by the
            Community.
          </div>
          <div className="flex gap-4">
            <Link
              href="/code-of-conduct"
              className="hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Code of Conduct
            </Link>
            <Link
              href="/terms"
              className="hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#219EBC] text-white shadow-lg hover:bg-[#023047] hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
