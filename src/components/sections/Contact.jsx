import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Mail, Send, ArrowUpRight } from 'lucide-react'
// Note: Agar pichli dafa 'GitHub' use kiya tha toh line 3 aur 6 mein change kar lein
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
const SOCIAL_LINKS = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/muhammad-talha236' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/in/your-profile' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/your-handle' },
]

function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      alert('Message sent successfully! 🚀')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  if (!mounted) return null

  const content = (
    <section 
  id="contact" 
  className="relative z-20 w-full min-h-screen flex flex-col justify-center bg-[#0a0a0a] py-16 md:py-20 text-white lg:pl-72"
>
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Column: Text & Socials */}
          <div className="flex flex-col lg:col-span-5">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f0ff3d]">
              <Mail size={14} strokeWidth={2.5} /> Contact
            </span>
            
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Let's work <br className="hidden lg:block" /> together<span className="text-[#f0ff3d]">.</span>
            </h2>
            
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Email
                </span>
                <a 
                  href="mailto:talha@example.com" 
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold text-white transition-colors hover:text-[#f0ff3d]"
                >
                  talha@example.com
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              <div>
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Socials
                </span>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#f0ff3d] hover:bg-[#f0ff3d] hover:text-black hover:scale-105"
                      >
                        <Icon size={16} strokeWidth={2.5} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Contact Form */}
          <div className="lg:col-span-7 lg:pl-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <div className="flex-1">
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="What's your name?"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#f0ff3d]"
                  />
                </div>

                <div className="flex-1 mt-6 md:mt-0">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#f0ff3d]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="How can I help you?"
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#f0ff3d]"
                />
              </div>

              <div className="mt-2 flex justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-[#f0ff3d] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-[#d9e636] hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={14} strokeWidth={3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
  
  return createPortal(content, document.body)
}

export default Contact