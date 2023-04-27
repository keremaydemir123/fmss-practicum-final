import React from 'react';

interface ICardContainer {
  children: React.ReactNode;
}

function CardContainer({ children }: ICardContainer) {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center py-2">
      {children}
    </div>
  );
}

export default CardContainer;
