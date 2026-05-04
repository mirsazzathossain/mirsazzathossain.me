import { getCollection } from 'astro:content';
import publications from '@/data/publications.json';
import publicationOverrides from '@/data/publications.override.json';
import projects from '@/data/projects.json';
import courses from '@/data/courses.json';
import { mergePublicationOverrides } from '@/utils/publications';

export async function GET() {
  const out: any[] = [];
  const mergedPublications = mergePublicationOverrides(publications, publicationOverrides);

  // Publications
  mergedPublications.forEach((p: any) => {
    const authorNames = Array.isArray(p.authors)
      ? p.authors.map((a: any) => a.name).join(' ')
      : '';
    const keywords = Array.isArray(p.keywords)
      ? p.keywords.join(' ')
      : (p.keywords || '');
    out.push({
      kind: 'Publication',
      title: p.title,
      sub: `${p.venue_short || p.venue || ''} · ${p.year}`,
      href: `/publications/${p.id}`,
      keywords: `${p.title} ${authorNames} ${p.venue || ''} ${keywords}`.toLowerCase(),
    });
  });

  // Projects
  projects.forEach((p: any) => {
    out.push({
      kind: 'Project',
      title: p.title,
      sub: p.description,
      href: '/projects',
      keywords: `${p.title} ${p.description}`.toLowerCase(),
    });
  });

  // Courses
  courses.forEach((c: any) => {
    out.push({
      kind: 'Course',
      title: c.title,
      sub: `${c.totalDuration} · ${c.publishedDate}`,
      href: '/courses',
      keywords: `${c.title} ${c.description} ${c.author}`.toLowerCase(),
    });
  });

  // Articles
  const articles = await getCollection('articles');
  articles.forEach((a) => {
    out.push({
      kind: 'Post',
      title: a.data.title,
      sub: a.data.publishedAt ? `${new Date(a.data.publishedAt).toISOString().split('T')[0]}` : '',
      href: `/articles/${a.id}`,
      keywords: `${a.data.title} ${a.data.description}`.toLowerCase(),
    });
  });

  // Snippets
  const snippets = await getCollection('snippets');
  snippets.forEach((s) => {
    out.push({
      kind: 'Snippet',
      title: s.data.title,
      sub: s.data.language,
      href: `/snippets/${s.id}`,
      keywords: `${s.data.title} ${s.data.description} ${s.data.language}`.toLowerCase(),
    });
  });

  return new Response(JSON.stringify(out), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
