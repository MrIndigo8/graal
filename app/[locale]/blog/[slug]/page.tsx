import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/sanity";

type BlogPostPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, params.locale);
  if (!post) {
    notFound();
  }

  return (
    <main className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <article className="mx-auto w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]">
          {post.publishedAt}
        </p>
        <h1 className="mt-4 text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {post.title}
        </h1>
        <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-[var(--text-secondary)]">
          {post.body}
        </p>
      </article>
    </main>
  );
}
