import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";



export const revalidate = 30 // revalidate at most every sec

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
        title,
        "currentSlug": slug.current,
        content,
        titleImage   
      }[0]`;

  const data = await client.fetch(query); 
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
    const data: fullBlog = await getData(params.slug);
  return (
    <div className="mt-8">
        <h1>
            <span className="block text-center text-primary font-semibold tracking-wide uppercase ">
                sportBlog
            </span>
            <span className="mt-2 block text-3xl text-center font-bold tracking-tight sm:text-4xl ">
                {data.title}
            </span>
        </h1>

        <Image src={urlFor(data.titleImage).url()} 
        width={800}
        height={800}
        alt='titleImage'
        priority
        className="rounded-lg mt-8 border"/>

        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data.content} />
        </div>
    </div>
  );
}
