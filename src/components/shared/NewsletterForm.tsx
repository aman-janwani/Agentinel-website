"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus("success");
        setEmail("");
        setMessage("Subscribed successfully!");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="relative z-10 w-full md:w-auto flex flex-col items-start gap-2">
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-[#050505] border border-gray-800 rounded-xl p-1.5 focus-within:border-gray-600 transition-colors w-full md:w-auto"
      >
        <div className="pl-3 text-[#00E5CC] font-mono text-sm opacity-70">
          {">"}
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dev@company.com"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full md:w-64 bg-transparent border-none text-sm px-2 py-2 focus:outline-none text-gray-300 placeholder-gray-600 font-mono disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-white text-[#0A0A0A] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : status === "success" ? "Done" : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className={`text-xs pl-3 font-mono ${status === "success" ? "text-[#00E5CC]" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
