import katex from 'katex';
import 'katex/dist/katex.css';
import { useEffect, useRef } from 'preact/hooks';

export default function EquationRenderer({children}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // console.log(children)
      katex.render(children, containerRef.current, {
        throwOnError: false,  // Set to true if you want to handle errors
      });
  
  }, [containerRef]);

  return <div ref={containerRef}>{children}</div>;
};
