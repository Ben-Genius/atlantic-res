'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown, Facebook, Instagram, Linkedin, ShieldCheck, Award, CheckSquare, Star } from 'lucide-react'
import { companyInfo } from '@/lib/constants'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Corporate Catering', message: '' })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setModalMessage("Thank you for contacting Atlantic Catering & Logistics. Your inquiry has been received. Our team will review your message and write back to you within 24 hours.")
    setIsSubmitted(true)
  }

  const handleNewsletterSubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request 
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    setModalMessage("Thank you for subscribing to our newsletter! You will now receive our latest updates, culinary stories, and news directly in your inbox.")
    setIsSubmitted(true)
    setNewsletterEmail('')
  }

  const closeSuccessModal = () => {
    setIsSubmitted(false)
    setFormData({ name: '', email: '', phone: '', subject: 'Corporate Catering', message: '' })
  }

  return (
    <main className="w-full min-h-screen text-slate-800 bg-white relative">

      {/* ── Hero/Header Section (Styled with Brand Green and Texture) ── */}
      <section className="relative w-full px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden text-white transition-colors duration-300">
        {/* Background image & overlays matching About Us page */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/premium-green-texture.png')" }}
        />
        <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Giant ghost background text */}
        <div
          className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden top-0 z-0"
          aria-hidden
        >
          <span
            className="block font-black uppercase leading-none tracking-tighter text-[18vw] md:text-[16vw] text-transparent mb-[14rem] pt-[2.4rem] ml-[-14rem]"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.08)' }}
          >
            ATLANTIC
          </span>
          <span
            className="block font-black uppercase leading-none tracking-tighter text-[16vw] md:text-[14vw] text-transparent ml-[35vw] mt-[1rem]"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.06)' }}
          >
            CONTACT
          </span>
        </div>

        {/* Floating Dish Images in Hero */}
        {/* Top-Left: Lobster Cutout */}
        <motion.div
          className="absolute left-16 top-10 z-10 w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-20 lg:opacity-30 xl:opacity-55 pointer-events-none select-none hidden lg:block"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/dishes/dish1.png"
            alt="Premium Lobster"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Top-Right: Steak Cutout */}
        <motion.div
          className="absolute -right-16 top-10 z-10 w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-20 lg:opacity-70 xl:opacity-55 pointer-events-none select-none hidden lg:block"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/dishes/dish4.png"
            alt="Premium Steak"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Decorative Chevron Arrays Left & Right */}
        <div className="absolute left-6 md:left-14 top-36 opacity-90 select-none pointer-events-none flex gap-1.5 z-10">
          <svg className="w-16 h-8 text-white/40" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10 10 L20 20 L10 30" />
            <path d="M25 10 L35 20 L25 30" />
            <path d="M40 10 L50 20 L40 30" />
            <path d="M55 10 L65 20 L55 30" />
            <path d="M70 10 L80 20 L70 30" />
          </svg>
        </div>
        <div className="absolute right-6 md:right-14 bottom-8 opacity-20 select-none pointer-events-none flex gap-1.5 z-10">
          <svg className="w-16 h-8 text-white/40" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10 10 L20 20 L10 30" />
            <path d="M25 10 L35 20 L25 30" />
            <path d="M40 10 L50 20 L40 30" />
            <path d="M55 10 L65 20 L55 30" />
            <path d="M70 10 L80 20 L70 30" />
          </svg>
        </div>

        {/* Hero Middle: Big Header and Wavy Line */}
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-20">
          <span className="text-[10px] md:text-sm font-bold text-[#EF9419] uppercase tracking-[0.35em] mb-2 block">
            Reach Out to Us
          </span>

          <h1 className="font-extrabold uppercase leading-[1.1] tracking-tighter m-0 text-center">
            <span className="block overflow-hidden py-1">
              <span
                className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
              >
                CONTACT
              </span>
            </span>

            <span className="block overflow-hidden py-1">
              <span
                className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-[#EF9419]"
              >
                US
              </span>
            </span>
          </h1>

          <p className="text-xs md:text-base leading-relaxed text-white/80 font-medium max-w-2xl mx-auto pt-6">
            Ready to plan your offshore operations catering, corporate dining logistics, or premium events? Reach out and we will help you build a bespoke solution.
          </p>
        </div>
      </section>

      {/* ── Content Body Section ── */}
      <section className="relative w-full bg-white px-6 md:px-12 pb-16 overflow-hidden">
        {/* Subtle background watermarks (specific dishes from assets) */}
        {/* Left Side: Ghanaian Jollof Rice */}
        <motion.div
          className="absolute -left-24 top-[15%] z-0 w-[320px] h-[320px] md:w-[450px] md:h-[450px] opacity-[0.5] md:opacity-[0.7] pointer-events-none select-none hidden lg:block"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, 0]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/dishes/dish6.png"
            alt="Ghanaian Jollof Rice"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Right Side: Gourmet Seafood Platter */}
        <motion.div
          className="absolute -right-24 bottom-[20%] z-0 w-[320px] h-[320px] md:w-[450px] md:h-[450px] opacity-[0.035] md:opacity-[0.65] pointer-events-none select-none hidden lg:block"
          animate={{
            y: [0, 18, 0],
            rotate: [0, -4, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/dishes/dish3.png"
            alt="Gourmet Seafood"
            fill
            className="object-contain"
          />
        </motion.div>
        <div className="relative z-20 -translate-y-8 w-full md:w-[84%] lg:w-[76%] bg-white rounded-r-lg border-t border-r border-b border-slate-100/90 py-4 pl-6 md:pl-8 pr-10 flex flex-wrap items-center justify-start gap-6 md:gap-8 shadow-md mb-12 select-none mr-auto">
          {/* Cert 1 */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <ShieldCheck size={14} className="text-green" />
            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">ISO 9001:2015</span>
          </div>
          {/* Cert 2 */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <Award size={14} className="text-green" />
            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">ISO 22000:2018</span>
          </div>
          {/* Cert 3 */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <ShieldCheck size={14} className="text-green" />
            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">ISO 45001:2018</span>
          </div>
          {/* Cert 4 */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <CheckSquare size={14} className="text-green" />
            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">FDA Certified</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* B2B Certifications Seam Tab (Reduced Rounded Corners to rounded-r-lg) */}


          {/* Form & Newsletter Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            {/* Left Form Area (col span 7) */}
            <form onSubmit={handleFormSubmission} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email field (rounded-md) */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 pl-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full bg-[#CFDAD9]/40 hover:bg-[#CFDAD9]/65 focus:bg-white text-slate-800 text-xs rounded-md py-3 px-4 outline-none border border-transparent focus:border-green smooth-transition"
                  />
                </div>
                {/* Phone field (rounded-md) */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 pl-2">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 501 502 441"
                    className="w-full bg-[#CFDAD9]/40 hover:bg-[#CFDAD9]/65 focus:bg-white text-slate-800 text-xs rounded-md py-3 px-4 outline-none border border-transparent focus:border-green smooth-transition"
                  />
                </div>
              </div>

              {/* Name field (rounded-md) */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 pl-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your complete name"
                  className="w-full bg-[#CFDAD9]/40 hover:bg-[#CFDAD9]/65 focus:bg-white text-slate-800 text-xs rounded-md py-3 px-4 outline-none border border-transparent focus:border-green smooth-transition"
                />
              </div>

              {/* Inquiry Type field (rounded-md) */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 pl-2">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-[#CFDAD9]/40 hover:bg-[#CFDAD9]/65 focus:bg-white text-slate-800 text-xs rounded-md py-3 pl-4 pr-10 outline-none border border-transparent focus:border-green smooth-transition cursor-pointer appearance-none"
                >
                  <option value="Offshore Catering">Offshore Catering & Logistics</option>
                  <option value="Corporate Catering">Corporate Catering Services</option>
                  <option value="Event Management">Premium Event Management</option>
                  <option value="Others">General Inquiry / Others</option>
                </select>
                <div className="pointer-events-none absolute right-4 bottom-3.5 flex items-center text-slate-500">
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* Message field (rounded-md) */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 pl-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your requirements..."
                  className="w-full bg-[#CFDAD9]/40 hover:bg-[#CFDAD9]/65 focus:bg-white text-slate-800 text-xs rounded-md py-3 px-4 outline-none border border-transparent focus:border-green smooth-transition resize-none"
                />
              </div>

              {/* Submit button (Clipped brand button) */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative inline-flex items-center justify-center gap-3 py-3 px-8 overflow-hidden group bg-green hover:bg-green-light text-white font-bold uppercase tracking-[0.2em] text-[12px] transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <span>{loading ? 'Sending...' : 'Submit Message'}</span>
                  <Send size={12} />
                </button>
              </div>
            </form>

            {/* Right Newsletters Card Column (col span 5 - Styled with Brand Green Light) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-green-light to-[#134E4A] text-white p-6 md:p-8 rounded-md space-y-4 shadow-lg transition-colors duration-300">
              <h3 className="text-xl font-bold">Our Newsletters</h3>
              <p className="text-[12px] leading-relaxed opacity-90 font-light">
                Sign up for our newsletters to receive the latest updates, event details, offshore catering case studies, and culinary inspiration directly in your inbox.
              </p>

              {/* Newsletter form (rounded-md input) */}
              <form onSubmit={handleNewsletterSubmission} className="space-y-3 pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-white text-slate-800 text-xs rounded-md py-3 px-4 outline-none border border-transparent focus:ring-2 focus:ring-gold smooth-transition"
                />
                <button
                  type="submit"
                  className="w-full bg-[#EF9419] hover:bg-[#FBC02D] text-white font-bold text-xs py-3 px-4 rounded-md shadow smooth-transition cursor-pointer text-center uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards Grid Row (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card 1: Phone (Styled with Brand Green) */}
            <div className="bg-green text-white p-6 rounded-md flex flex-col items-center text-center space-y-2.5 shadow-md hover:scale-[1.02] smooth-transition transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-xl mb-1">
                <Phone size={18} />
              </div>
              <span className="text-md font-bold tracking-tight">{companyInfo.phone}</span>
              <p className="text-[12px] opacity-85 leading-relaxed max-w-[200px]">
                Call our office lines for immediate corporate client support and event catering bookings.
              </p>
            </div>

            {/* Card 2: Email (Styled with Soft Green/Teal Tint) */}
            <div className="bg-[#CFDAD9]/40 text-[#134E4A] p-6 rounded-md flex flex-col items-center text-center space-y-2.5 shadow-sm hover:scale-[1.02] smooth-transition">
              <div className="w-12 h-12 rounded-full bg-white/65 flex items-center justify-center text-xl text-green mb-1">
                <Mail size={18} />
              </div>
              <div className="flex flex-col text-md font-bold tracking-tight">
                <a href={`mailto:${companyInfo.email}`} className="hover:underline">{companyInfo.email}</a>
                <a href={`mailto:${companyInfo.salesEmail}`} className="hover:underline">{companyInfo.salesEmail}</a>
              </div>
              <p className="text-[12px] opacity-85 leading-relaxed text-[#2D6A4F] max-w-[200px]">
                Drop us a line and our administrative team will dispatch your request to the appropriate division.
              </p>
            </div>

            {/* Card 3: Address */}
            <div className="bg-white text-slate-700 border border-slate-200/80 p-6 rounded-md flex flex-col items-center text-center space-y-2.5 shadow-sm hover:scale-[1.02] smooth-transition">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xl text-green border border-slate-100 mb-1">
                <MapPin size={18} />
              </div>
              <span className="text-md font-bold tracking-tight text-slate-800">{companyInfo.address}</span>
              <p className="text-[12px] opacity-85 leading-relaxed text-slate-500 max-w-[200px]">
                Visit our main administrative and operations headquarters in Accra. Digital Address: {companyInfo.digitalAddress}.
              </p>
            </div>
          </div>

          {/* Map Container Area */}
          <div className="mt-16 rounded-[14px] overflow-hidden relative shadow-lg border border-slate-200/80 h-[420px] mb-[5rem]">
            <iframe
              id="gmap-frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6277874944983!2d-0.14772922417751765!3d5.62145399435976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11e7fd0c9d7d13eb%3A0x33446df0dfd7d91e!2sEast%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1719273600000!5m2!1sen!2sgh"
              className="w-full h-full border-0  opacity-90"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            {/* Map Pin Info Overlay Box */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl max-w-[280px] border border-slate-100 text-left space-y-1.5 z-10 hidden sm:block">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-tight">Atlantic Catering & Logistics</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">{companyInfo.address}</p>
                </div>
                <div className="text-green flex flex-col items-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center">
                    <MapPin size={12} />
                  </div>
                  <span className="text-[7px] font-bold uppercase tracking-wider mt-1 text-green">Accra</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] border-t border-slate-100 pt-1.5">
                <span className="font-bold text-slate-800">4.8</span>
                <div className="text-amber-400 flex text-[8px] gap-0.5">
                  <Star size={8} fill="currentColor" />
                  <Star size={8} fill="currentColor" />
                  <Star size={8} fill="currentColor" />
                  <Star size={8} fill="currentColor" />
                  <Star size={8} fill="currentColor" />
                </div>
                <span className="text-slate-400 text-[8px]">(Accra Operations)</span>
              </div>
              <a
                href="https://maps.google.com/?q=20+Suya+Street,+East+Legon,+Accra,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold text-green hover:underline block pt-0.5"
              >
                View larger map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Success Modal overlay ── */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center space-y-5 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-green flex items-center justify-center text-3xl mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-black text-slate-800 font-display uppercase tracking-tight">Success!</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {modalMessage}
                </p>
              </div>
              <button
                onClick={closeSuccessModal}
                className="w-full py-3 bg-gradient-to-r from-green to-green-light hover:from-green-light hover:to-green text-white font-bold rounded-xl shadow-md transition-all duration-300 cursor-pointer transform active:scale-98 text-xs uppercase tracking-wider"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
