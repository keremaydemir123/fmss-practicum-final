import React from 'react';

interface ICardContainer {
  children: React.ReactNode;
}

function CardContainer({ children }: ICardContainer) {
  return (
    <section className="w-full flex flex-wrap gap-4 justify-center py-2">
      {children}
    </section>
  );
}

export default CardContainer;
