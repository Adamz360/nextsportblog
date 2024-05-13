import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30 // revalidate at most every 30sec


async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}  

export default async function Home() {
const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-3">
      {data.map((post, idx ) => (
        <Card key={idx} >
        <Image src={urlFor(post.titleImage).url()}
         alt="image"
          width={500}
          height={500}
        className="rounded-t-lg h-[200px] object-cover"/>

        <CardContent className="mt-5 bg-gray-100 dark:bg-transparent">
          <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
          <p className="line-clamp-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
            {post.smallDescription}
          </p>
          <Button asChild className="w-full mt-2">
          <Link href={`/blog/${post.currentSlug}`}>
          Read more
          </Link>
          </Button>
        </CardContent>



        </Card>
      ))}
    </div>
  );
}
