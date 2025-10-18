import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value).url();
      const imageAlt = value.alt || 'Blog Image';
      const imageWidth = value.width || 700; // Use provided width or default
      const imageHeight = value.height || 400; // Use provided height or default

      return (
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      );
    },
  },
  block: {
    // Customize block types if needed, otherwise default rendering
    h1: ({children}: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    normal: ({children}: any) => <p className="my-2">{children}</p>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc list-inside my-2">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal list-inside my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li>{children}</li>,
    number: ({children}: any) => <li>{children}</li>,
  },
};

const PortableTextRenderer = ({ blocks }: { blocks: any[] }) => {
  return <PortableText value={blocks} components={components} />;
};

export default PortableTextRenderer;
