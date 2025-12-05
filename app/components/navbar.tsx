"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaBookmark,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import useSWR from "swr";
import { usePathname } from "next/navigation";

// Firebase
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { clearAuthCookie } from "../action/authActions";
import toast from "react-hot-toast";

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Navbar = () => {
  const pathname = usePathname();

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auth States
  const [user, setUser] = useState<any>(null);
  const [hasAuthCookie, setHasAuthCookie] = useState(false);

  // Firebase auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Check cookie login (Next.js API)
  useEffect(() => {
    const checkCookie = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = await res.json();
        setHasAuthCookie(data.loggedIn);
      } catch (error) {
        console.error("Cookie check failed:", error);
      }
    };
    checkCookie();
  }, []);

  // Search API via SWR
  const { data: searchRes } = useSWR(
    searchTerm.length > 1
      ? `/api/anime/search?q=${encodeURIComponent(searchTerm)}`
      : null,
    fetcher
  );

  // Close search dropdown when clicking outside (desktop)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Navbar scroll blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide mobile search bar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileSearch) {
        setMobileSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // Also run once on mount to check initial size
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileSearch]);

  // Active route detection
  const isActive = (href: string) => {
    if (href === "/anime") {
      return pathname === "/anime";
    }
    return pathname === href || pathname.startsWith(href + "/anime");
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    await clearAuthCookie();

    toast.success("Logged out!");
    setShowLogoutModal(false);
    await fetch("/api/auth/logout", { method: "POST" });
  };

  const isLoggedIn = hasAuthCookie && user;

  // Handle Enter key for search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      window.location.href = `/anime/search?query=${encodeURIComponent(
        searchTerm.trim()
      )}`;
      setSearchOpen(false);
      setMobileSearch(false);
    }
  };

  // Handle clicking a search result
  const handleSelectResult = (title: string) => {
    setSearchTerm(title);
    setSearchOpen(false);
    setMobileSearch(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`w-full font-mono text-white px-4 py-3 fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800 shadow-lg"
            : "bg-[#0a0a0a]/30 backdrop-blur-md border-b border-gray-700/20"
        }`}
      >
        <div className="max-w-[92%] mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/anime"
            className="text-2xl font-bold italic flex items-center"
          >
            <span className="text-white">Anime</span>
            <span className="text-purple-500">JAX</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/anime"
              className={`text-md ${
                isActive("/anime")
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-purple-400"
              }`}
            >
              Home
            </Link>

            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-md ${
                  isActive("/anime")
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-400"
                }`}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Anime <FaChevronDown size={12} />
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-[#111] border border-gray-700 rounded-md mt-2 w-40 shadow-lg p-2 z-40 animate-fadeIn">
                  {[
                    ["All Anime", "/anime/top"],
                    ["Popular Anime", "/anime/popular"],
                    ["Top Movie", "/anime/movie"],
                    ["Most Favourited", "/anime/favourited"],
                    ["Top Airing", "/anime/airing"],
                    ["Seasonal Anime", "/anime/seasonal"],
                    ["Upcoming Anime", "/anime/upcoming"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block px-3 py-2 text-sm rounded ${
                        isActive(href)
                          ? "bg-gray-800 text-purple-400"
                          : "text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/anime/bookmark"
              className={`flex items-center gap-1 text-md ${
                isActive("/anime/bookmark")
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-purple-400"
              }`}
            >
              <FaBookmark /> Bookmark
            </Link>
          </div>

          {/* SEARCH + AUTH (DESKTOP) */}
          <div
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-3 relative"
          >
            {/* SEARCH INPUT */}
            <div className="relative text-gray-400 w-56">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search anime..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchOpen(e.target.value.length > 1);
                }}
                onKeyDown={handleKeyDown}
                className="pr-9 pl-2 py-1.5 rounded-md bg-gray-900/70 border border-gray-700 text-white text-sm w-full"
                aria-label="Search anime"
                autoComplete="off"
              />
              <Link
                href={
                  searchTerm.trim()
                    ? `/anime/search?query=${encodeURIComponent(
                        searchTerm.trim()
                      )}`
                    : "#"
                }
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Search button"
                onClick={(e) => {
                  if (!searchTerm.trim()) e.preventDefault();
                  setSearchOpen(false);
                }}
              >
                <FaSearch size={14} />
              </Link>
            </div>

            {/* SEARCH DROPDOWN */}
            {searchOpen && (
              <div
                className="
                absolute
                top-12
                right-0
                bg-[#111]
                border
                border-gray-700
                rounded-md
                shadow-xl
                max-h-80
                overflow-y-auto
                z-50
                animate-fadeIn
                w-56
                sm:w-72
                md:w-80
                lg:w-96
                sm:right-0
                left-1/2
                -translate-x-1/2
                px-2
              "
              >
                {!searchRes?.data && (
                  <p className="p-3 text-gray-400 text-sm">Searching...</p>
                )}
                {searchRes?.data?.map((anime: any) => (
                  <div
                    key={anime.mal_id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleSelectResult(anime.title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSelectResult(anime.title);
                    }}
                  >
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-10 h-14 rounded object-cover"
                    />
                    <p className="text-white text-sm">{anime.title}</p>
                  </div>
                ))}
              </div>
            )}

            {/* AUTH DESKTOP */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  className="w-[30px] h-[30px] rounded-full"
                  alt="User avatar"
                />
                <span className="text-sm text-gray-300">
                  {user.displayName || "User"}
                </span>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-1.5 rounded-md text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-purple-500 hover:bg-purple-600 px-4 py-1.5 rounded-md text-white text-sm font-semibold"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex items-center gap-4 lg:hidden">
            <FaSearch
              size={18}
              className="text-gray-300 cursor-pointer"
              onClick={() => {
                setMobileSearch((prev) => !prev);
                setSearchOpen(false);
              }}
              aria-label="Open mobile search"
            />
            <button
              onClick={() => setMobileMenu((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {mobileSearch && (
          <div className="relative flex items-center text-gray-400 w-full max-w-xs mx-auto mt-2 px-4">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search anime..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchOpen(e.target.value.length > 1);
              }}
              onKeyDown={handleKeyDown}
              className="pr-9 pl-2 py-1.5 rounded-md bg-gray-900/70 border border-gray-700 text-white text-sm w-full"
              aria-label="Mobile search anime"
              autoComplete="off"
              autoFocus
            />
            <Link
              href={
                searchTerm.trim()
                  ? `/anime/search?query=${encodeURIComponent(
                      searchTerm.trim()
                    )}`
                  : "#"
              }
              className="absolute right-6 top-1/2 -translate-y-1/2"
              aria-label="Mobile search button"
              onClick={(e) => {
                if (!searchTerm.trim()) e.preventDefault();
                setSearchOpen(false);
                setMobileSearch(false);
              }}
            >
              <FaSearch size={14} />
            </Link>

            {/* Mobile search dropdown */}
            {searchOpen && (
              <div
                className="
                absolute
                top-full
                left-1/2
                -translate-x-1/2
                mt-1
                bg-[#111]
                border
                border-gray-700
                rounded-md
                shadow-xl
                max-h-80
                overflow-y-auto
                z-50
                animate-fadeIn
                w-full
              "
              >
                {!searchRes?.data && (
                  <p className="p-3 text-gray-400 text-sm">Searching...</p>
                )}
                {searchRes?.data?.map((anime: any) => (
                  <div
                    key={anime.mal_id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleSelectResult(anime.title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSelectResult(anime.title);
                    }}
                  >
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-10 h-14 rounded object-cover"
                    />
                    <p className="text-white text-sm">{anime.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-[#0d0d0d] border-t border-gray-700 px-4 py-3 space-y-2">
            <Link
              href="/anime"
              className={`block py-2 ${
                isActive("/anime") ? "text-purple-400" : "text-gray-300"
              }`}
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>

            {/* MOBILE DROPDOWN */}
            <details className="group" open>
              <summary
                className={`py-2 cursor-pointer ${
                  isActive("/anime") ? "text-purple-400" : "text-gray-300"
                }`}
              >
                Anime
              </summary>
              <div className="pl-3 space-y-1 text-sm">
                {[
                  ["All Anime", "/anime/top"],
                  ["Popular", "/anime/popular"],
                  ["Movies", "/anime/movie"],
                  ["Favourited", "/anime/favourited"],
                  ["Airing", "/anime/airing"],
                  ["Seasonal", "/anime/seasonal"],
                  ["Upcoming", "/anime/upcoming"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block py-1 ${
                      isActive(href) ? "text-purple-400" : "text-gray-400"
                    }`}
                    onClick={() => setMobileMenu(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </details>

            {/* MOBILE BOOKMARK */}
            <Link
              href="/anime/bookmark"
              className={`block py-2 ${
                isActive("/anime/bookmark")
                  ? "text-purple-400"
                  : "text-gray-300"
              }`}
              onClick={() => setMobileMenu(false)}
            >
              Bookmark
            </Link>

            {/* MOBILE AUTH */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setShowLogoutModal(true);
                  setMobileMenu(false);
                }}
                className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-md mt-2"
              >
                Logout ({user.displayName || "User"})
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full block text-center bg-purple-500 hover:bg-purple-600 py-2 rounded-md mt-2"
                onClick={() => setMobileMenu(false)}
              >
                Sign Up
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] font-mono">
          <div className="bg-[#0d0b13] border border-purple-700/40 rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">
              Logout Confirmation
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
