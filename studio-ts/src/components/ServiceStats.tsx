'use client'

import { useTranslations } from 'next-intl'

import { StatList, StatListItem } from '@/components/StatList'

// Honest, connector-model trust badges shown in place of the former
// (fabricated) project-count / satisfaction-rate statistics. The wording
// lives in the `ServiceStats` namespace of each locale file, so it can be
// edited in one place. No numeric track-record claims.
export function ServiceStats() {
  const t = useTranslations('ServiceStats')
  return (
    <StatList>
      <StatListItem value={t('s1.value')} label={t('s1.label')} />
      <StatListItem value={t('s2.value')} label={t('s2.label')} />
      <StatListItem value={t('s3.value')} label={t('s3.label')} />
    </StatList>
  )
}
