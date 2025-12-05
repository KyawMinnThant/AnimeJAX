// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a]/90 text-gray-300 text-center py-4 mt-auto flex items-center justify-center gap-2 font-mono">
      <p>&copy; {new Date().getFullYear()} AnimeJAX.</p>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
