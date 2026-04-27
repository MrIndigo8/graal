import { createClient } from "@sanity/client";
import groq from "groq";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
};

export type CaseStudy = {
  niche: string;
  challenge: string;
  team: string;
  result: string;
};

export type CareerPosition = {
  title: string;
  requirement: string;
};

const fallbackPosts: BlogPost[] = [
  {
    slug: "build-revenue-machine-in-14-days",
    title: "How to build a revenue machine in 14 days",
    excerpt: "A practical rollout plan for startups that cannot wait three months.",
    body: "Discovery, assembly and launch can be compressed when team and infrastructure are designed together.",
    publishedAt: "2026-04-27",
  },
];

const fallbackCases: CaseStudy[] = [
  {
    niche: "SaaS",
    challenge: "Launch outbound from zero",
    team: "Fractional RoS + SDR pod",
    result: "Pipeline and reporting setup in 14 days",
  },
];

const fallbackCareers: CareerPosition[] = [
  {
    title: "Fractional RoS",
    requirement: "5+ years in SaaS, Fintech or EdTech sales",
  },
];

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.SANITY_API_VERSION ?? "2025-01-01",
    token: process.env.SANITY_READ_TOKEN,
    useCdn: process.env.NODE_ENV === "production",
  });
}

const blogPostsQuery = groq`*[_type == "post" && (!defined(locale) || locale == $locale)] | order(publishedAt desc){
  "slug": slug.current,
  title,
  excerpt,
  "body": coalesce(pt::text(body), ""),
  "publishedAt": string(publishedAt)
}`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug && (!defined(locale) || locale == $locale)][0]{
  "slug": slug.current,
  title,
  excerpt,
  "body": coalesce(pt::text(body), ""),
  "publishedAt": string(publishedAt)
}`;

const caseStudiesQuery = groq`*[_type == "caseStudy" && (!defined(locale) || locale == $locale)] | order(_createdAt desc){
  niche,
  challenge,
  team,
  result
}`;

const careersQuery = groq`*[_type == "careerPosition" && (!defined(locale) || locale == $locale)] | order(_createdAt desc){
  title,
  requirement
}`;

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) return fallbackPosts;

  try {
    const posts = await client.fetch<BlogPost[]>(blogPostsQuery, { locale });
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  const client = getSanityClient();
  if (!client) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const post = await client.fetch<BlogPost | null>(postBySlugQuery, { slug, locale });
    if (!post) {
      return fallbackPosts.find((item) => item.slug === slug) ?? null;
    }
    return post;
  } catch {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getCaseStudies(locale: string): Promise<CaseStudy[]> {
  const client = getSanityClient();
  if (!client) return fallbackCases;

  try {
    const cases = await client.fetch<CaseStudy[]>(caseStudiesQuery, { locale });
    return cases.length ? cases : fallbackCases;
  } catch {
    return fallbackCases;
  }
}

export async function getCareerPositions(locale: string): Promise<CareerPosition[]> {
  const client = getSanityClient();
  if (!client) return fallbackCareers;

  try {
    const positions = await client.fetch<CareerPosition[]>(careersQuery, { locale });
    return positions.length ? positions : fallbackCareers;
  } catch {
    return fallbackCareers;
  }
}
