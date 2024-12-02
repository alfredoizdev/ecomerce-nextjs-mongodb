import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            We provide the best quality shoes for all your needs. Our mission is
            to deliver comfort and style in every step.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-gray-300">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#shipping" className="hover:text-gray-300">
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href="#returns" className="hover:text-gray-300">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="#terms" className="hover:text-gray-300">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">
            Email: support@shoes.com <br />
            Phone: +1 234 567 890
          </p>
          <div className="mt-4 flex space-x-4">
            {/* Social Icons */}
            <Link
              href="https://facebook.com"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              aria-label="Facebook"
            >
              <Image
                src="/icons/fb.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://twitter.com"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              aria-label="Twitter"
            >
              <Image src="/icons/tw.svg" alt="Twitter" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; 2024 Shoes.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
