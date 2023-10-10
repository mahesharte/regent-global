import { forwardRef } from "react";
import camelCase from "lodash/camelCase";

import { FormProps } from "@/lib/hooks/useFormAction";
import { Button } from "./ui/button";
import RichText from "./richtext/RichText";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  form?: FormProps;
};

const ContactBlock = forwardRef<HTMLDivElement, Props>(
  ({ className, form }, ref) => {
    return (
      <div className={cn(className, "container mx-auto max-md:px-4")} ref={ref}>
        {!!form?.title && (
          <h2 className="mb-14 text-center text-3xl font-black text-blue md:text-left">
            {form.title}
          </h2>
        )}
        <form method="post" onSubmit={form?.onSubmit}>
          <div className="grid gap-x-6 gap-y-4 text-sm text-neutral-900 md:grid-cols-2">
            {form?.inputs.map((input, index) => {
              switch (input.type) {
                case "textarea":
                  return (
                    <label key={index} className="col-span-2 block">
                      {!!input.title && <span>{input.title}</span>}
                      <textarea
                        className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
                        rows={3}
                        disabled={form?.state?.isSubmitting}
                        placeholder={input.placeholder}
                        required={input.required}
                        {...form?.register?.(camelCase(input.title ?? "email"))}
                      />
                    </label>
                  );
                default:
                  return (
                    <label key={index} className="block max-md:col-span-2">
                      {!!input.title && <span>{input.title}</span>}
                      <input
                        className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
                        disabled={form?.state?.isSubmitting}
                        placeholder={input.placeholder}
                        required={input.required}
                        type={input.type ?? "email"}
                        {...form?.register?.(camelCase(input.title ?? "email"))}
                      />
                    </label>
                  );
              }
            })}
            <div className="gap col-span-2 flex items-end justify-between gap-4 max-md:flex-col md:pt-4">
              {!!form?.content && (
                <span className="max-w-[64ch]">
                  <RichText value={form.content} />
                </span>
              )}
              <Button disabled={form?.state?.isSubmitting} type="submit">
                {form?.cta ?? "Send"}
              </Button>
            </div>
            {!!form?.message && (
              <span className="block pt-4 text-sm text-neutral-900">
                {form.message}
              </span>
            )}
          </div>
        </form>
      </div>
    );
  },
);

ContactBlock.displayName = "ContactBlock";

export { ContactBlock };
