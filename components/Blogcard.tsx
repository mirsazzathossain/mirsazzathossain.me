import Image from "next/image";

export default function Blogcard() {
    return (
        <div className="group relative flex flex-col h-full">
            <a className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden" href="/ciscryp/blog-single">
                <div className="absolute inset-0">
                    <Image src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" layout="fill" objectFit="cover" alt="blog-1" className="object-cover w-full h-full" />
                    {/* <img src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className="object-cover w-full h-full" alt="title" /> */}
                </div>
            </a>
            <div className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300">
                <a href="#" className="rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100" title="Share on Facebook">
                    <i className="lab la-facebook-f"></i>
                </a>
                <a href="#" className="rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100" title="Share on Twitter">
                    <i className="lab la-twitter"></i>
                </a>
                <a href="#" className="rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100" title="Share on Linkedin">
                    <i className="lab la-linkedin-in"></i>
                </a>
                <a href="#" className="rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100" title="Share on Instagram">
                    <i className="lab la-instagram"></i>
                </a>
            </div>
            
            <div className=" mt-8 pr-10 flex flex-col">
                <h2 className="nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl">
                    <a className="line-clamp-2 capitalize" title="title" href="/ciscryp/blog-single">in arcu cursus euismod quis viverra nibh cras pulvinar mattis</a>
                </h2>
                <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
                    <span className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vero perspiciatis ullam ea? Nihil accusamus similique debitis tempore mollitia? Aperiam.</span>
                </span>
                
                <div className="nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm mt-5" data-nc-id="PostCardMeta">
                    <a className="flex-shrink-0 relative flex items-center space-x-2" href="/ciscryp/blog">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
                            {/* <img className="absolute inset-0 w-full h-full object-cover rounded-full" src="#" alt="John Doe" /> */}
                            <span className="wil-avatar__name">J</span>
                        </div>
                        
                        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">Jameson Dick</span>
                    </a>
                    
                    <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">·</span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">May 20, 2021</span>
                </div>
            </div>
        </div>
    );
}