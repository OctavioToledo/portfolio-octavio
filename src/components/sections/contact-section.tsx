'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { contactContent } from '@/content/contact'
import { socialLinks } from '@/content/hero'
import { SectionHeader } from '@/components/blueprint/section-header'
import { ContactForm } from '@/components/contact-form'
import { revealUp, withDelay } from '@/lib/motion'

export function ContactSection() {
  const { language } = useLanguage()
  const content = contactContent[language]

  return (
    <section id="contacto" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={content.sectionTitle} />
      <p className="mb-8 max-w-[60ch] text-[14.5px] text-fg-dim">{content.intro}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div {...revealUp} className="bp-panel grid gap-4 self-start p-6">
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
              {content.emailLabel}
            </span>
            <a href={`mailto:${socialLinks.email}`} className="text-sm hover:text-brand">
              {socialLinks.email}
            </a>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
              {content.locationLabel}
            </span>
            <span className="text-sm">{content.locationValue}</span>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">GitHub</span>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand">
              github.com/OctavioToledo
            </a>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">LinkedIn</span>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand">
              linkedin.com/in/octaviotoledo
            </a>
          </div>
        </motion.div>
        <motion.div {...withDelay(revealUp, 0.08)} className="bp-panel p-6">
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
