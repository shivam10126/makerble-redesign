import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-pink-500 text-2xl font-bold">Makerble</Link>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-pink-500">About us</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-500">Privacy & Cookies</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">ORGANISATIONS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/control-panel" className="hover:text-pink-500">Control Panel</Link></li>
              <li><Link href="/marketplace" className="hover:text-pink-500">Discover the Marketplace</Link></li>
              <li><Link href="/create-account" className="hover:text-pink-500">Create Organisation Account</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">YOUR ACCOUNT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/library" className="hover:text-pink-500">Library</Link></li>
              <li><Link href="/profile" className="hover:text-pink-500">Profile</Link></li>
              <li><Link href="/projects" className="hover:text-pink-500">Projects</Link></li>
              <li><Link href="/help" className="hover:text-pink-500">Help</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">EXPLORE</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/metrics" className="hover:text-pink-500">Metrics</Link></li>
              <li><Link href="/networks" className="hover:text-pink-500">Networks</Link></li>
              <li><Link href="/strategies" className="hover:text-pink-500">Strategies</Link></li>
              <li><Link href="/projects" className="hover:text-pink-500">Projects</Link></li>
              <li><Link href="/studies" className="hover:text-pink-500">Studies</Link></li>
              <li><Link href="/surveys" className="hover:text-pink-500">Surveys</Link></li>
              <li><Link href="/tips" className="hover:text-pink-500">Tips</Link></li>
              <li><Link href="/vouchers" className="hover:text-pink-500">Vouchers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">FOLLOW THE MAKERBLE STORY</h3>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/company/makerble" className="text-blue-600 hover:text-blue-700">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://www.youtube.com/makerble" className="text-red-600 hover:text-red-700">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://www.instagram.com/makerble" className="text-pink-600 hover:text-pink-700">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com/makerble" className="text-blue-400 hover:text-blue-500">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.facebook.com/makerble" className="text-blue-800 hover:text-blue-900">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span className="font-semibold">Contact Us:</span>
            <Link href="mailto:contact@makerble.com" className="hover:text-pink-500">
              contact@makerble.com
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="tel:02081236255" className="hover:text-pink-500">
              020 8123 6255
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}