"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchIpAndLocation() {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        setIp(ipData.ip);
        const locRes = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locData = await locRes.json();
        setLocation(locData);
      } catch (err) {
        setIp("Error fetching IP");
      } finally {
        setLoading(false);
      }
    }
    fetchIpAndLocation();
  }, []);

  const handleCopy = () => {
    if (ip) {
      navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex items-center justify-center bg-[#70b990] text-white py-5 shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="drop-shadow rounded-full"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow">
            What's My IP?
          </h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center w-full px-2 sm:px-0">
        <section className="w-full max-w-2xl bg-white dark:bg-[#222] rounded-2xl shadow-2xl p-6 sm:p-12 flex flex-col items-center gap-8 border border-[#70b990] dark:border-[#70b990] mt-6 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold text-[#70b990] dark:text-[#70b990] mb-2 text-center">
            Your Public IPv4 Address
          </h2>
          {loading ? (
            <span className="text-gray-500 text-xl">Loading...</span>
          ) : (
            <>
              <div className="flex flex-col items-center gap-3 w-full">
                <span className="text-2xl sm:text-4xl font-mono font-bold text-[#70b990] bg-[#eaf7f2] px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-[#70b990] shadow w-full text-center break-all">
                  {ip}
                </span>
                <button
                  className="mt-2 px-3 sm:px-4 py-2 rounded-lg bg-[#70b990] text-white hover:bg-[#5ca77d] transition text-base font-medium shadow cursor-pointer w-full sm:w-auto"
                  onClick={handleCopy}
                  disabled={!ip}
                >
                  {copied ? "Copied!" : "Copy IP"}
                </button>
              </div>
              {location && (
                <>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="city">
                        🏙️
                      </span>
                      <strong>City:</strong> {location.city || "-"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="region">
                        🗺️
                      </span>
                      <strong>Region:</strong> {location.region || "-"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="country">
                        🌍
                      </span>
                      <strong>Country:</strong> {location.country_name || "-"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="isp">
                        💻
                      </span>
                      <strong>ISP:</strong> {location.org || "-"}
                    </div>
                  </div>
                  {location.latitude && location.longitude && (
                    <div className="mt-6 w-full flex justify-center">
                      <iframe
                        title="Google Maps Location"
                        width="100%"
                        height="300"
                        style={{
                          border: 0,
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=8&output=embed`}
                      ></iframe>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </main>
      <footer className="w-full flex items-center justify-center bg-[#70b990] text-white py-4 mt-6 sm:mt-10 shadow-lg">
        <span className="text-xs sm:text-sm text-center">
          © {new Date().getFullYear()} What's My IP. Proudly developed by{" "}
          <a
            href="https://www.bitsplease.org"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            bitsplease.org
          </a>
        </span>
      </footer>
    </div>
  );
}
