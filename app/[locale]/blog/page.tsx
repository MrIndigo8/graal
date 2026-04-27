import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";
import { getBlogPosts } from "@/lib/sanity";

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.blog" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });
  const posts = await getBlogPosts(params.locale);

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${params.locale}/blog/${post.slug}`}
            className="block border border-[var(--border)] p-4"
          >
            <h2 className="text-lg">{post.title}</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </SimplePage>
  );
}
