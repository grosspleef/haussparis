import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { Blockquote } from '@/components/Blockquote'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import imageHaussinterior1 from '@/images/haussinterior1.jpg'
import imageHaussinterior2 from '@/images/haussinterior2.jpg'
import imageHaussinterior3 from '@/images/haussinterior3.jpg'
import imageHaussinterior4 from '@/images/haussinterior4.jpg'
import imageHaussinterior5 from '@/images/haussinterior5.jpg'

type SectionProps = {
  title: string
  image: ComponentPropsWithoutRef<typeof StylizedImage>
  children: ReactNode
}

function Section({ title, image, children }: SectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

type SectionOverrideProps = {
  title?: string
}

//
// Sections for the Home Page (Restored Original Content)
//

export function HomeDiscoverSection({
  title = 'Découverte',
}: SectionOverrideProps) {
  return (
    <Section title={title} image={{ src: imageHaussinterior1, alt: "Intérieur parisien élégant - Hauss Paris" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          À Paris, chaque projet est unique. Trouver l’architecte réellement
          aligné avec votre vision demande une sélection précise — c’est là que
          nous intervenons, avec <strong className="font-semibold text-neutral-950">clarté</strong> et <strong className="font-semibold text-neutral-950">exigence</strong>.
        </p>
        <p>
          Nous identifions pour vous l’architecte répondant à vos <strong className="font-semibold text-neutral-950">critères essentiels</strong> : style, langue parlée, disponibilité et type de projet — du petit
          studio au grand appartement haussmannien, de la rénovation intégrale
          au simple ameublement.
        </p>
        <p>
          Avec un <strong className="font-semibold text-neutral-950">brief unique</strong>, vous accédez à une sélection fiable et sur mesure de professionnels qualifiés, pour un projet qui démarre simplement et sereinement.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Inclus dans notre accompagnement
      </h3>
      <TagList className="mt-4">
        <TagListItem>Analyse des besoins</TagListItem>
        <TagListItem>Sélection d'architectes</TagListItem>
        <TagListItem>Mise en relation qualifiée</TagListItem>
        <TagListItem>Vérification des références</TagListItem>
        <TagListItem>Suivi de la relation</TagListItem>
      </TagList>
    </Section>
  )
}

export function HomeBuildSection({ title = 'Conception' }: SectionOverrideProps) {
  return (
    <Section title={title} image={{ src: imageHaussinterior2, shape: 1, alt: "Projet d'architecture d'intérieur professionnel" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Pour les professionnels, nous offrons un accès rapide et structuré à
          des architectes d’intérieur capables d’accompagner tous types de
          projets : <strong className="font-semibold text-neutral-950">bureaux, commerces, restaurants, hôtels</strong>.
        </p>
        <p>
          Nous sélectionnons le profil le plus pertinent — de l’architecte indépendant au <strong className="font-semibold text-neutral-950">cabinet d’envergure</strong> — selon la nature du projet, son identité, ses contraintes techniques
          et son calendrier.
        </p>
        <p>
          Qu’il s’agisse d’un espace restreint ou d’un <strong className="font-semibold text-neutral-950">immeuble entier à repenser</strong>, vous gagnez du temps et bénéficiez d’une expertise immédiatement
          opérationnelle, parfaitement adaptée à vos besoins professionnels.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Marc L.', role: 'Directeur Immobilier' }}
        className="mt-12"
      >
        Grâce à Hauss Paris, nous avons trouvé le cabinet idéal pour la rénovation de notre siège social en un temps record.
      </Blockquote>
    </Section>
  )
}

//
// Sections for the Process Page (New Content)
//

export function ProcessDiscoverSection({
  title = 'Définition',
}: SectionOverrideProps) {
  return (
    <Section title={title} image={{ src: imageHaussinterior4, alt: "Définition de projet d'architecture d'intérieur" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Démarrer un projet d'architecture peut être intimidant. Notre première mission est de vous aider à <strong className="font-semibold text-neutral-950">franchir le pas</strong>.
          Nous transformons vos idées, parfois floues, en un projet concret et réalisable.
        </p>
        <p>
          Nous prenons le temps d'analyser vos besoins profonds, votre style de vie et vos ambitions. 
          Qu'il s'agisse d'une résidence à Paris ou d'un projet <strong className="font-semibold text-neutral-950">international</strong>, 
          nous structurons votre demande pour qu'elle soit parfaitement compréhensible par les professionnels.
        </p>
        <p>
          Cette étape cruciale permet de définir un <strong className="font-semibold text-neutral-950">cahier des charges clair</strong>, 
          fondation indispensable pour solliciter les bons interlocuteurs.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Notre accompagnement initial
      </h3>
      <TagList className="mt-4">
        <TagListItem>Audit des besoins</TagListItem>
        <TagListItem>Clarification du style</TagListItem>
        <TagListItem>Cadrage budgétaire</TagListItem>
        <TagListItem>Définition du planning</TagListItem>
        <TagListItem>Rédaction du brief</TagListItem>
      </TagList>
    </Section>
  )
}

export function ProcessBuildSection({ title = 'Sélection' }: SectionOverrideProps) {
  return (
    <Section title={title} image={{ src: imageHaussinterior5, shape: 1, alt: "Sélection d'architectes d'intérieur à Paris" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Une fois le projet défini, nous activons notre réseau. Notre force est de vous <strong className="font-semibold text-neutral-950">proposer des alternatives</strong>. 
          Nous ne vous imposons pas un choix unique, mais vous présentons une sélection restreinte des meilleurs profils.
        </p>
        <p>
          Cette sélection s'opère parmi le top 1% des architectes, à Paris comme à l'<strong className="font-semibold text-neutral-950">international</strong>. 
          Nous cherchons l'adéquation parfaite : talent créatif, expertise technique et compatibilité humaine.
        </p>
        <p>
          Vous avez déjà un nom en tête ? Un architecte que vous admirez mais qui semble inaccessible ? 
          Nous nous chargeons de <strong className="font-semibold text-neutral-950">vous connecter</strong> avec les architectes que vous avez choisis, 
          en facilitant l'approche et la négociation.
        </p>
      </div>
    </Section>
  )
}

export function ProcessDeliverSection() {
  return (
    <Section title="Lancement" image={{ src: imageMeeting, shape: 2, alt: "Réunion de lancement de projet avec architecte" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Notre rôle ne s'arrête pas à la recommandation. Nous sommes là pour <strong className="font-semibold text-neutral-950">faciliter la mise en relation</strong>. 
          Nous organisons les rencontres, aidons à la lecture des propositions et sécurisons le cadre contractuel.
        </p>
        <p>
          Que votre projet soit local ou que nous pilotions une collaboration <strong className="font-semibold text-neutral-950">internationale</strong>, 
          nous agissons comme un tiers de confiance. Nous levons les barrières linguistiques et culturelles pour que seul le projet compte.
        </p>
        <p>
          En choisissant Hauss Paris, vous démarrez votre projet avec l'assurance d'être entouré des meilleurs, 
          prêt à voir vos ambitions prendre forme sans friction inutile.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Les garanties de nos partenaires
      </h3>
      <List className="mt-8">
        <ListItem title="Excellence reconnue">
          Des architectes sélectionnés pour la qualité exceptionnelle de leur portfolio et leurs références.
        </ListItem>
        <ListItem title="Mobilité internationale">
          Une capacité à intervenir à Paris comme à l'étranger, avec une maîtrise des enjeux logistiques.
        </ListItem>
        <ListItem title="Sérénité contractuelle">
          Des professionnels vérifiés (assurances, solidité financière) pour un engagement en toute confiance.
        </ListItem>
      </List>
    </Section>
  )
}
