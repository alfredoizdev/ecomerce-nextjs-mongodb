const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <a href="#products" className="hover:text-gray-300">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gray-300">
                FAQ
              </a>
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
            <a
              href="https://facebook.com"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.03 3.693 9.207 8.5 9.878v-6.988H7.667v-2.89H10.5V9.823c0-2.841 1.627-4.436 4.118-4.436 1.195 0 2.446.215 2.446.215v2.686h-1.378c-1.358 0-1.776.843-1.776 1.707v2.043h3.026l-.484 2.89h-2.542v6.988C18.307 21.207 22 17.03 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.383-4.094 11.588-11.588 11.588-2.302 0-4.437-.676-6.238-1.842.318.038.636.051.964.051 1.901 0 3.647-.63 5.042-1.695-1.776-.038-3.267-1.208-3.785-2.826.248.038.51.063.772.063.374 0 .736-.05 1.082-.138-1.861-.376-3.26-2.015-3.26-3.987v-.05c.547.303 1.174.487 1.84.51-1.088-.727-1.801-1.971-1.801-3.379 0-.743.2-1.44.547-2.038 1.986 2.435 4.957 4.038 8.305 4.208-.063-.298-.088-.609-.088-.923 0-2.244 1.813-4.063 4.063-4.063 1.17 0 2.23.493 2.973 1.28a8.086 8.086 0 002.582-.985c-.328 1.024-1.024 1.887-1.93 2.43.916-.1 1.79-.353 2.6-.712-.624.91-1.406 1.71-2.31 2.349z" />
              </svg>
            </a>
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
