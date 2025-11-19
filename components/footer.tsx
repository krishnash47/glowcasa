import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { getCategories } from "@/lib/products"

export function Footer() {
  const categories = getCategories()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Glowcasa Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">Glowcasa</span>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Leading provider of innovative lighting solutions for residential, commercial, and industrial
              applications.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <a 
                  href="Tool Free Number:1800-8900-686" 
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  1800-8900-686
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <a 
                  href="Mailto :glowcasapvtltd@gmail.com" 
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  glowcasapvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Khasara No. 188/2, Ramsinghpura Urf Rampura,Sanganer, Jaipur, Rajasthan,302029</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/careers"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Careers
                </Link>
              </li> */}
              <li>
                <Link
                  href="/news"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Technical Support
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Downloads
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} Glowcasa. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}