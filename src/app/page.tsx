import PageContentWrapper from "@/components/PageContentWrapper/PageContentWrapper";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageMetaQuery, homepageQuery } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import ElementGenerator from "@/components/ElementGenerator/ElementGenrator";
import { HomepageMetaQueryResult } from "@/types/sanityTypes";

export async function generateMetadata() {
  const { data }: { data: HomepageMetaQueryResult } = await sanityFetch({
    query: homepageMetaQuery, perspective: "published"
  })

  const metadata = data?.pageMeta;

  return {
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: metadata?.keywords ?? "",
    title: metadata?.title ?? metadata?.ogTitle ?? "",
    creator: "Billy Myles-Berkouwer",
    publisher: "Billy Myles-Berkouwer",
    description: metadata?.description ?? "",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      images: metadata?.ogImage?.url ?? "",
      title: metadata?.ogTitle ?? "",
      type: "website",
      description: metadata?.description ?? "",
      publishedTime: metadata?._updatedAt ?? "",
      authors: ["Billy Myles-Berkouwer"],
    },
  };
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  const { data } = await sanityFetch({
    query: homepageQuery, perspective: isEnabled ? "previewDrafts" : "published", params: {
      tags: ["homepage"]
    }
  })

  if (!data) {
    return null;
  }

  return (
    <PageContentWrapper>
      {data.elements?.map((el, i) => (
        <ElementGenerator key={el._ref + i} dataEl={el} isFirst={i === 0} />
      ))}
    </PageContentWrapper>
  );
}
