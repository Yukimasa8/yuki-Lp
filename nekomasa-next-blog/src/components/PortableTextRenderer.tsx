import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';

// Custom components for PortableText rendering
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            className="w-full h-auto rounded-lg shadow-md"
            src={urlFor(value).url()}
            alt={value.alt || ''}
            width={800} // Adjust as needed
            height={500} // Adjust as needed
            sizes="(max-width: 800px) 100vw, 800px"
            priority={false} // Load images lazily
          />
          {value.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>}
        </figure>
      );
    },
    affiliate: ({ value }: { value: any }) => {
      if (!value?.code) return null;
      return (
        <div className="my-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">【広告】</p>
          <div dangerouslySetInnerHTML={{ __html: value.code }} />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: any, value: any }) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer sponsored' : undefined;
      return (
        <Link href={value.href} rel={rel} target={rel ? '_blank' : '_self'}>
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: { children: any }) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }: { children: any }) => <h2 className="text-2xl font-bold my-5">{children}</h2>,
    h3: ({ children }: { children: any }) => <h3 className="text-xl font-bold my-4">{children}</h3>,
    h4: ({ children }: { children: any }) => <h4 className="text-lg font-bold my-3">{children}</h4>,
    blockquote: ({ children }: { children: any }) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic">{children}</blockquote>,
    normal: ({ children }: { children: any }) => <p className="my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children: any }) => <ul className="list-disc list-inside ml-4 my-2">{children}</ul>,
    number: ({ children }: { children: any }) => <ol className="list-decimal list-inside ml-4 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: any }) => <li className="mb-1">{children}</li>,
    number: ({ children }: { children: any }) => <li className="mb-1">{children}</li>,
  },
};

interface PortableTextRendererProps {
  blocks: any[];
}

export default function PortableTextRenderer({ blocks }: PortableTextRendererProps) {
  return <PortableText value={blocks} components={components} />;
}
