import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'dark' });

let mermaidIdCounter = 0;

export default function MermaidBlock({ source }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const id = `mermaid-diagram-${mermaidIdCounter++}`;
    setError(null);
    try {
      mermaid.render(id, source, (svgCode) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svgCode;
        }
      });
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
