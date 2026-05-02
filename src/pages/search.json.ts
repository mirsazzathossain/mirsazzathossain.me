import { getCollection } from 'astro:content';
import publications from '@/data/publications.json';
import projects from '@/data/projects.json';
import courses from '@/data/courses.json';

export async function GET() {
  const out: any[] = [];

  // Publications
  publications.forEach((p: any) => {
    out.push({
      kind: 'Publication',
      title: p.title,
      sub: `${p.journal || p.booktitle || ''} · ${p.year}`,
      href: '/#publications',
      keywords: `${p.title} ${p.author || ''} ${p.journal || p.booktitle || ''} ${p.keywords || ''}`.toLowerCase(),
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
