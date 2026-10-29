import React from 'react';

interface ProzLogoProps {
  variant?: 'light' | 'dark' | 'white';
  className?: string;
  showSubtitle?: boolean;
}

export const ProzLogo: React.FC<ProzLogoProps> = ({ 
  variant = 'dark', 
  className = '',
  showSubtitle = true 
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? '#FFFFFF' : '#3B0764';
  const subColor = isWhite ? '#E2E8F0' : '#475569';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Símbolo Proz: Figura / Estrela Geométrica Laranja */}
      <svg 
        viewBox="0 0 40 40" 
        className="h-9 w-9 shrink-0 drop-shadow-xs" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Cabeça / Círculo Superior */}
        <circle cx="28" cy="11" r="5" fill="#EA580C" />
        {/* Corpo / Braços Estilizados em V */}
        <path 
          d="M13 14C13 14 17 9 24 10C24 10 19 16 20 23C20 23 23 21 27 21C27 21 21 29 14 26C11 24.5 9 20 13 14Z" 
          fill="#F97316" 
        />
        {/* Perna / Base com Curva Dinâmica */}
        <path 
          d="M12 25C14 28 17 31 22 32C22 32 18 30 16 27C14 24 12 25 12 25Z" 
          fill="#C2410C" 
        />
        <circle cx="12" cy="19" r="3.2" fill="#FB923C" />
      </svg>

      {/* Tipografia Oficial: Proz + Educação */}
      <div className="flex flex-col leading-none">
        <span 
          style={{ color: textColor }} 
          className="text-2xl font-black tracking-tight"
        >
          Proz
        </span>
        {showSubtitle && (
          <span 
            style={{ color: subColor }} 
            className="text-[9px] font-semibold tracking-wider uppercase mt-0.5"
          >
            Educação
          </span>
        )}
      </div>
    </div>
  );
};
