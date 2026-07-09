'use client';

import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { system } from "./theme";

export function Provider(props: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'chakra' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>
        {props.children}
      </ChakraProvider>
    </CacheProvider>
  );
}
