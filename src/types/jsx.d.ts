import 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

// Definición para el componente RotatingText
declare module '../components/RotatingText.jsx' {
  import { ForwardRefExoticComponent, RefAttributes } from 'react';

  interface RotatingTextProps {
    texts: string[];
    transition?: object;
    initial?: object;
    animate?: object;
    exit?: object;
    animatePresenceMode?: string;
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: string;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
    [key: string]: any; // Para permitir propiedades adicionales
  }

  const RotatingText: ForwardRefExoticComponent<RotatingTextProps & RefAttributes<any>>;
  export default RotatingText;
}
