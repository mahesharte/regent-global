import { ReactNode } from 'react';

type NumberData = {
  imageUrl: string;
  number: string;
  subText: string;
};

const BigNumbers = ({
  headline,
  items,
}: {
  headline: string;
  items: NumberData[];
}) => {
  return (
    <div className="bg-gradient-to-r from-red to-blue text-center text-white pt-20 px-24 pb-28">
      <div className="">
        <h2 className="text-5xl pb-16">{headline}</h2>
        <ul className="flex justify-between max-w-6xl mx-auto">
          {items.map((item, i) => (
            <li key={i} className="grid grid-cols-[auto_32px_auto] grid-rows-2">
              <img
                src={item.imageUrl}
                className="max-w-[96px] h-24 col-span-1 row-span-1 self-center"
              />
              <span className="text-7xl font-black col-start-3 self-center">
                {item.number}
              </span>
              <div className="flex flex-col col-start-3 row-start-2 row-end-3">
                <svg className="w-12 h-1 mt-3 mb-4">
                  <rect className="w-full h-full fill-white" />
                </svg>
                <span className="text-left text-sm">{item.subText}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { BigNumbers };
