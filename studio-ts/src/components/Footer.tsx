'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/routing'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import {
  aboutSlugs,
  processSlugs,
  contactSlugs,
  servicesSlugs,
  type Locale,
} from '@/lib/routes'

function Navigation() {
  const t = useTranslations('Footer')
  const params = useParams()
  const locale = (params?.locale as Locale) || 'fr'

  // Determine URLs based on locale using centralized routes
  const aboutUrl = `/${aboutSlugs[locale]}`
  const processUrl = `/${processSlugs[locale]}`
  const contactUrl = `/${contactSlugs[locale]}`
  const servicesUrl = `/${servicesSlugs[locale]}`
  const renovationUrl = locale === 'de' ? '/dienstleistungen/renovierung' : locale === 'it' ? '/servizi/ristrutturazione' : locale === 'es' ? '/servicios/renovacion' : '/services/renovation'
  const decorationUrl = locale === 'de' ? '/dienstleistungen/dekoration' : locale === 'it' ? '/servizi/decorazione' : locale === 'es' ? '/servicios/decoracion' : '/services/decoration'
  const furnishingUrl = locale === 'en' ? '/services/furnishing' : locale === 'fr' ? '/services/ameublement' : locale === 'it' ? '/servizi/arredamento' : locale === 'de' ? '/dienstleistungen/einrichtung' : '/servicios/mobiliario'

  // Helper function to check if a URL is external
  const isExternalLink = (href: string) => {
    return href.startsWith('http://') || href.startsWith('https://')
  }

  // Determine legal URLs based on locale
  const privacyPolicyUrl = locale === 'en' ? '/privacy-policy' : locale === 'fr' ? '/politique-de-confidentialite' : locale === 'it' ? '/privacy-policy' : locale === 'de' ? '/datenschutz' : locale === 'es' ? '/politica-de-privacidad' : '/privacy-policy'
  const termsOfServiceUrl = locale === 'en' ? '/terms-of-service' : locale === 'fr' ? '/conditions-generales' : locale === 'it' ? '/terms-of-service' : locale === 'de' ? '/nutzungsbedingungen' : locale === 'es' ? '/terminos-de-servicio' : '/terms-of-service'

  const navigation = [
    {
      title: t('services'),
      links: [
        { title: t('renovation'), href: renovationUrl },
        { title: t('decoration'), href: decorationUrl },
        { title: t('furnishing'), href: furnishingUrl },
        ...(locale === 'fr'
          ? [
              {
                title: 'Architecte d\'intérieur Paris',
                href: '/services/architecte-interieur-paris',
              },
              {
                title: 'Décorateur d\'intérieur Paris',
                href: '/services/decorateur-interieur-paris',
              },
            ]
          : locale === 'en'
            ? [
                {
                  title: 'Interior Designer Paris',
                  href: '/services/interior-designer-paris',
                },
                {
                  title: 'Interior Decorator Paris',
                  href: '/services/interior-decorator-paris',
                },
              ]
            : locale === 'it'
              ? [
                  {
                    title: 'Architetto Interni Parigi',
                    href: '/servizi/architetto-interni-parigi',
                  },
                ]
              : locale === 'de'
                ? [
                    {
                      title: 'Innenarchitekt Paris',
                      href: '/dienstleistungen/innenarchitekt-paris',
                    },
                  ]
                : locale === 'es'
                  ? [
                      {
                        title: 'Diseñador Interiores París',
                        href: '/servicios/disenador-interiores-paris',
                      },
                    ]
                  : []),
        {
          title: (
            <>
              {t('explore')} <span aria-hidden="true">&rarr;</span>
            </>
          ),
          href: servicesUrl,
        },
      ],
    },
    {
      title: t('studio'),
      links: [
        { title: t('about'), href: aboutUrl },
        { title: t('process'), href: processUrl },
        { title: t('blog'), href: '/blog' },
        ...(locale === 'fr'
          ? [
              {
                title: 'Trouver un architecte',
                href: '/blog/trouver-architecte-interieur-paris',
              },
              {
                title: 'Tarifs architecte',
                href: '/blog/tarif-architecte-interieur-paris',
              },
            ]
          : locale === 'en'
            ? [
                {
                  title: 'Find a designer',
                  href: '/blog/find-interior-designer-paris',
                },
                {
                  title: 'Designer fees',
                  href: '/blog/interior-designer-fees-paris',
                },
              ]
            : []),
        { title: t('contact'), href: contactUrl },
      ],
    },
    {
      title: t('messaging'),
      links: socialMediaProfiles,
    },
    {
      title: t('legal'),
      links: [
        { title: t('privacyPolicy'), href: privacyPolicyUrl },
        { title: t('termsOfService'), href: termsOfServiceUrl },
      ],
    },
  ]

  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => {
                const isExternal = isExternalLink(link.href)
                const linkProps = {
                  href: link.href,
                  className: 'transition hover:text-neutral-950',
                  ...(isExternal && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }),
                }

                return (
                  <li key={linkIndex} className="mt-4">
                    {isExternal ? (
                      <a {...linkProps}>{link.title}</a>
                    ) : (
                      <Link {...linkProps}>{link.title}</Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <Navigation />
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label={t('home')}>
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
