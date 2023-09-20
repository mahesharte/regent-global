import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

const Hero = ({
  children,
  heading,
  subheading,
  className,
  imageUrl,
  style,
}: {
  children?: ReactNode;
  heading: string;
  subheading?: string;
  className?: string;
  imageUrl?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={clsx('relative text-white py-28 px-14', className)}
      style={style}
    >
      {!!imageUrl && (
        <img
          className="absolute inset-0 object-cover -z-10 w-full h-full"
          src={imageUrl}
        />
      )}
      <h1 className="text-hero">{heading}</h1>
      {children}
    </div>
  );
};

export { Hero };
