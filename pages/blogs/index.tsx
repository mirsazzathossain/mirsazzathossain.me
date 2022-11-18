import Blogcard from "components/Blogcard";
import { Button } from "flowbite-react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Blog: NextPage = () => {
    return (
        <div className="overflow-hidden relative">
            <div className="absolute inset-x-0 md:top-10 min-h-0 pl-20 py-24 flex overflow-hidden z-0">
                <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
                <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
            </div>

            <div className="container relative">
                <div className="pt-12 pb-16 lg:pb-28">
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        <div className="group relative flex flex-col h-full"> 
                            <Link className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden" href={'/'}>
                                <div className="absolute inset-0">
                                    <Image className="object-cover w-full h-full" src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" height={750} width={1260} alt="blog" layout="fill" />
                                </div>
                            </Link>

                            <div className="mt-8 pr-10 flex flex-col">
                                <h2 className="nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl">
                                    <a className="line-clamp-2 capitalize" title="title" href="/ciscryp/blog-single">natoque penatibus et magnis dis parturient montes nascetur ridiculus mus</a>
                                </h2>
                                
                                <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
                                    <span className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vero perspiciatis ullam ea? Nihil accusamus similique debitis tempore mollitia? Aperiam.</span>
                                </span>
                                
                                <div className="inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm mt-5">
                                    <a className="flex-shrink-0 relative flex items-center space-x-2" href="/ciscryp/blog">
                                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
                                            <Image className="absolute inset-0 w-full h-full object-cover rounded-full" src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="John Doe" layout='fill' />
                                            <span className="wil-avatar__name">J</span>
                                        </div>
                                        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                                            
                                        </span>
                                    </a>
                                    <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">·</span>
                                    <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">May 20, 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;