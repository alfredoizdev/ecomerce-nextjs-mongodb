import { THEME_DEFAULT } from "@/constants/theme";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandFacebook } from "react-icons/tb";

type Props = {
  footerBackgroundColor?: string;
  footerColorTitle?: string;
  footerColorText?: string;
  backgroundBtn?: string;
  textBtn?: string;
};

const Footer = ({
  footerBackgroundColor,
  footerColorTitle,
  footerColorText,
  backgroundBtn,
  textBtn,
}: Props) => {
  return (
    <footer
      className="py-10"
      style={{
        color: `${footerColorText || THEME_DEFAULT.footerColorText}`,
        backgroundColor: `${
          footerBackgroundColor || THEME_DEFAULT.footerBackgroundColor
        }`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: `${footerColorTitle || THEME_DEFAULT.footerColorTitle}`,
            }}
          >
            About Us
          </h3>
          <p
            className="text-sm"
            style={{
              color: `${footerColorText || THEME_DEFAULT.footerColorText}`,
            }}
          >
            We provide the best quality shoes for all your needs. Our mission is
            to deliver comfort and style in every step.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: `${footerColorTitle || THEME_DEFAULT.footerColorTitle}`,
            }}
          >
            Useful Links
          </h3>
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
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: `${footerColorTitle || THEME_DEFAULT.footerColorTitle}`,
            }}
          >
            Customer Support
          </h3>
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
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: `${footerColorTitle || THEME_DEFAULT.footerColorTitle}`,
            }}
          >
            Contact Us
          </h3>
          <p
            className="text-sm"
            style={{
              color: `${footerColorText || THEME_DEFAULT.footerColorText}`,
            }}
          >
            Email: support@shoes.com <br />
            Phone: +1 234 567 890
          </p>
          <div className="mt-4 flex space-x-4">
            {/* Social Icons */}
            <Link
              style={{
                backgroundColor: backgroundBtn || THEME_DEFAULT.backgroundBtn,
              }}
              href="https://facebook.com"
              className="p-2 rounded-full"
              aria-label="Facebook"
            >
              <TbBrandFacebook
                color={`${textBtn || THEME_DEFAULT.textBtn}`}
                size={24}
              />
            </Link>
            <Link
              style={{
                backgroundColor: backgroundBtn || THEME_DEFAULT.backgroundBtn,
              }}
              href="https://twitter.com"
              className="p-2 rounded-full"
              aria-label="Twitter"
            >
              <FaXTwitter
                color={`${textBtn || THEME_DEFAULT.textBtn}`}
                size={24}
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="mt-10 text-center text-sm"
        style={{
          color: `${footerColorText || THEME_DEFAULT.footerColorText}`,
        }}
      >
        &copy; 2024 Shoes.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
