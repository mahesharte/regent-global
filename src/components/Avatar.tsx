import { cn } from "@/lib/utils";

const Avatar = ({
  image,
  name,
  className,
}: {
  image?: string;
  name?: string;
  className?: string;
}) => {
  return (
    <div className={cn(className, "flex items-center justify-center gap-12")}>
      {image && <img className="h-14 w-14 rounded-full" src={image} />}
      {name && <span>John Isaiah Smith</span>}
    </div>
  );
};

export { Avatar };
