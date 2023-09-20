import { CSSProperties, ReactNode } from 'react';

type NumberData = {
  imageUrl: string;
  number: string;
  subText: ReactNode;
};

const BigNumbers = ({
  headline,
  items,
  style,
}: {
  headline: string;
  items: NumberData[];
  style?: CSSProperties;
}) => {
  return (
    <div className="text-center text-white px-24" style={style}>
      <div className="">
        <h2 className="pb-16 text-5xl">{headline}</h2>
        <ul className="mx-auto flex max-w-6xl justify-between">
          {items.map((item, i) => (
            <li key={i} className="grid grid-cols-[auto_32px_auto] grid-rows-2">
              <img
                src={item.imageUrl}
                className="col-span-1 row-span-1 h-24 max-w-[96px] self-center"
              />
              <span className="col-start-3 self-center text-7xl font-black">
                {item.number}
              </span>
              <div className="col-start-3 row-start-2 row-end-3 flex flex-col">
                <svg className="mb-4 mt-3 h-1 w-12">
                  <rect className="h-full w-full fill-white" />
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
