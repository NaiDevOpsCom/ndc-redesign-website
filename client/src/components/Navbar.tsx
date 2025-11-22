import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X, Sun, Moon, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#events", label: "Events" },
    { href: "#blog", label: "Blog" },
    { href: "#community", label: "Community" },
  ];

  const handleNavClick = (href: string) => {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-[#F5F5F580] border-b text-black border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <img src="https://res.cloudinary.com/nairobidevops/image/upload/v1751295185/My%20Brand/devOpsLogo-EpoD6axe_wgwtya.png" alt="Nairobi DevOps" className="w-36 object-contain" />
              </a>
            </div>
            
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-black hover:text-primary focus:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            
            <Button
              className="hidden md:inline-flex bg-primary text-white hover:bg-[#023047] transition-colors duration-200"
              onClick={() => window.open('/partners-sponsorship', '_self')}
            >
              <Handshake className="mr-2 h-5 w-5" />
              Partner With Us
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>


            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left text-black hover:text-primary focus:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
