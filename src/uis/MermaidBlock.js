import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'dark' });

let mermaidIdCounter = 0;

export default function MermaidBlock({ source }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const id = `mermaid-${mermaidIdCounter++}`;
    setError(null);
    try {
      // mermaid@8: render(id, source) retorna o SVG como string
      const svg = mermaid.render(id, source);
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    } catch (e) {
      setError('Erro ao renderizar diagrama Mermaid.');
    }
  }, [source]);

  if (error) {
    return <pre style={{ color: 'red' }}>{error}</pre>;
  }

  return (
    <div
      ref={containerRef}
      style={{ maxWidth: '100%', overflowX: 'auto', margin: '16px 0' }}
    />
  );
}
