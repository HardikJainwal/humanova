"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { createOtp, verifyOtp, getStudentDetails } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "@/components/ui/LanguageSelector";


export default function LoginPage() {
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (step !== "otp") return;
    setTimer(30);
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

const handleSendOtp = async (e) => {
  e.preventDefault();

  if (!email) return;

  try {
    await createOtp(email);

    setStep("otp");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const handleVerify = async (e) => {
  e.preventDefault();

  const code = otp.join("");

  if (code.length !== 4) {
    alert("Please enter the 4 digit OTP");
    return;
  }

  try {
    const response = await verifyOtp(email, code);
    const authToken = response.token;

    /* Fetch user details, then persist auth state */
    let userData = null;
    try {
      const details = await getStudentDetails(authToken);
      userData = details.student ?? details;
    } catch { /* details fetch can fail — login still valid */ }

    login(authToken, userData);
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  const handleOtpChange = (val, i) => {
    if (val && !/^[0-9]$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").trim().slice(0, 4);
    if (!/^\d+$/.test(text)) return;
    e.preventDefault();
    const next = text.split("");
    while (next.length < 4) next.push("");
    setOtp(next);
    inputsRef.current[Math.min(text.length, 3)]?.focus();
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white">
      {/* LEFT — illustration panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-[#0E3D39] p-12 overflow-hidden">
        {/* dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* logo */}
       <div className="relative z-10">
  <Image
    src="https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
    alt="Humanova Logo"
    width={220}
    height={44}
    priority
    className="h-12 w-auto object-contain"
  />
</div>

        {/* illustration */}
<div className="relative z-10 flex-1 flex items-center justify-center">
  <div className="relative w-full max-w-[480px] h-[420px]">
    <Image
      src="https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/Secure_login_and_sign_up_concept_illustration_qbpi2y.png"
      alt="Employee Login Illustration"
      fill
      priority
      className="object-contain"
    />
  </div>
</div>

        {/* copy + trust line */}
        <div className="relative z-10">
          <h2
            className="text-white text-3xl font-bold leading-tight"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("login.workplaceWellness")}{" "}
            <span
              className="italic font-normal text-[#8FD9C9]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {t("login.madeSimple")}
            </span>
          </h2>
          <p className="mt-3 text-white/60 max-w-sm text-sm leading-6">
            {t("login.leftDesc")}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#D4F04A", "#8FD9C9", "#F2C879"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0E3D39]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p className="text-white/60 text-xs">
              {t("login.trustedBy")} <span className="text-white font-medium">{t("login.schools")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div className="flex items-center justify-center px-6 py-16 relative">
        {/* Language selector - top right */}
        <div className="absolute top-6 right-6">
          <LanguageSelector />
        </div>

        <div className="w-full max-w-sm">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#0E3D39] grid place-items-center font-bold text-[#D4F04A]">
              H
            </div>
            <span className="text-[#0E3D39] text-lg font-semibold">Humanova</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <h1
                  className="text-[#0E3D39] text-3xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t("login.welcomeBack")}
                </h1>
                <p className="mt-2 text-[#5C7570] text-sm">
                  {t("login.enterEmail")}
                </p>

                <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
                  <div>
                    <label className="block text-[#0E3D39] text-sm font-medium mb-2">
                      {t("login.emailLabel")}
                    </label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FA8A3]"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@org.com"
                        className="w-full bg-[#F4F9F8] text-[#0E3D39] placeholder-[#8FA8A3] rounded-xl pl-11 pr-4 py-3.5 outline-none border border-[#E3EEEC] focus:border-[#215B54] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#0E3D39] text-white font-semibold rounded-xl py-3.5 hover:bg-[#215B54] transition-colors"
                  >
                    {t("login.sendOtp")}
                    <ArrowRight size={16} />
                  </motion.button>
                </form>

                <p className="mt-8 text-center text-xs text-[#8FA8A3]">
                  {t("login.trouble")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  onClick={() => setStep("email")}
                  className="flex items-center gap-1.5 text-[#5C7570] text-sm mb-6 hover:text-[#0E3D39] transition-colors"
                >
                  <ArrowLeft size={15} />
                  {t("login.back")}
                </button>

                <div className="w-11 h-11 rounded-full bg-[#EAF6F4] grid place-items-center mb-5">
                  <ShieldCheck size={20} className="text-[#215B54]" />
                </div>

                <h1
                  className="text-[#0E3D39] text-3xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t("login.enterCode")}
                </h1>
                <p className="mt-2 text-[#5C7570] text-sm">
                  {t("login.sentCode")}{" "}
                  <span className="font-medium text-[#0E3D39]">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                  <div className="flex gap-3" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputsRef.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        className="w-14 h-14 text-center text-xl font-semibold bg-[#F4F9F8] text-[#0E3D39] rounded-xl border border-[#E3EEEC] outline-none focus:border-[#215B54] focus:bg-white transition-all"
                      />
                    ))}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#0E3D39] text-white font-semibold rounded-xl py-3.5 hover:bg-[#215B54] transition-colors"
                  >
                    {t("login.verifyLogin")}
                    <ArrowRight size={16} />
                  </motion.button>

                  <p className="text-center text-sm text-[#8FA8A3]">
                    {timer > 0 ? (
                      <>{t("login.resendIn")} {timer}s</>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setTimer(30)}
                        className="text-[#215B54] font-medium hover:underline"
                      >
                        {t("login.resendCode")}
                      </button>
                    )}
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WellnessIllustration() {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="160" cy="160" r="130" fill="#154C46" />
      <circle cx="160" cy="160" r="130" stroke="#2E6B63" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="225" cy="95" r="34" fill="#D4F04A" opacity="0.9" />
      <circle cx="90" cy="230" r="22" fill="#8FD9C9" opacity="0.8" />
      <rect x="105" y="130" width="110" height="90" rx="20" fill="#EAF6F4" />
      <circle cx="160" cy="160" r="26" fill="#215B54" />
      <path
        d="M148 160c0-8 6-14 12-14s12 6 12 14-6 20-12 20-12-12-12-20Z"
        fill="#D4F04A"
      />
      <path
        d="M60 160c0-55 45-100 100-100"
        stroke="#8FD9C9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
    </svg>
  );
}