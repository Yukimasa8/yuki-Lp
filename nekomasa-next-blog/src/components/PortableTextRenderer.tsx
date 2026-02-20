import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import Link from 'next/link';

const ImageComponent = ({ value }: { value: any }) => {
  if (!value?.asset) {
    return null;
  }
  const imageUrl = value.asset.url || urlFor(value).url();
  const imageAlt = value.alt || 'Blog Image';

  let imageWidth: number;
  let imageHeight: number;

  switch (value.size) {
    case 'small':
      imageWidth = 300;
      imageHeight = 200;
      break;
    case 'large':
      imageWidth = 1000;
      imageHeight = 600;
      break;
    case 'medium':
    default:
      imageWidth = 700;
      imageHeight = 400;
      break;
  }

  return (
    <div className="my-8 flex justify-center">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="rounded-lg shadow-md max-w-full h-auto"
      />
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
    customImage: ImageComponent,
    affiliate: ({ value }: { value: { code: string } }) => {
      if (!value?.code) {
        return null;
      }
      return <div dangerouslySetInnerHTML={{ __html: value.code }} />;
    },
  },
  block: {
    // Customize block types if needed, otherwise default rendering
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    normal: ({ children }: any) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      const isInternal = value.href.startsWith('/');

      if (isInternal) {
        return (
          <Link href={value.href} className="text-blue-600 hover:underline">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

const PortableTextRenderer = ({ blocks }: { blocks: any[] }) => {
  return <PortableText value={blocks} components={components} />;
};

export default PortableTextRenderer;
