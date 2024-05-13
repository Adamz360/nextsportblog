import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { client } from "../lib/sanity";
import { blogcarousel } from "../lib/interface";

export const revalidate = 30; // revalidate at most every 30sec



async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
      titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}


export async function BlogCarousel() {
  const data: blogcarousel[] = await getData();
 
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>  
      {data.map((post, idx)=>(
        <CarouselItem key={idx}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
            <div>
              {post.titleImage}
            </div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
      ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
//   return (
//     <Carousel className="w-full max-w-xs">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-4xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }
