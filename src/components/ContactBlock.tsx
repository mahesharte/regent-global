import { forwardRef } from "react";
import camelCase from "lodash/camelCase";

import { FormProps } from "@/lib/hooks/useFormAction";
import { Button } from "./ui/button";
import RichText from "./richtext/RichText";

type Props = {
  className?: string;
  form?: FormProps;
};

const ContactBlock = forwardRef<HTMLDivElement, Props>(
  ({ className, form }, ref) => {
    return (
      <div className={className} ref={ref}>
        {!!form?.title && (
          <h2 className="mb-14 text-3xl font-black text-blue">{form.title}</h2>
        )}
        <form method="post" onSubmit={form?.onSubmit}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-neutral-900">
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
                    <label key={index} className="block">
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
            <div className="gap col-span-2 flex justify-between">
              {!!form?.content && (
                <span className="max-w-[48ch]">
                  <RichText value={form.content} />
                </span>
              )}
              <Button disabled={form?.state?.isSubmitting} type="submit">
                {form?.cta ?? "Send"}
              </Button>
            </div>
          </div>
          {!!form?.message && (
            <span className="block pt-4 text-sm text-neutral-900">
              {form.message}
            </span>
          )}
        </form>
      </div>
    );
  },
);

ContactBlock.displayName = "ContactBlock";

export { ContactBlock };

{
  /* <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <span class="text-gray-700">Full name</span>
                <input type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="">
              </label>
              <label class="block">
                <span class="text-gray-700">Email address</span>
                <input type="email" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="john@example.com">
              </label>
              <label class="block">
                <span class="text-gray-700">When is your event?</span>
                <input type="date" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
              </label>
              <label class="block">
                <span class="text-gray-700">What type of event is it?</span>
                <select class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label class="block">
                <span class="text-gray-700">Additional details</span>
                <textarea class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="3"></textarea>
              </label>
              <div class="block">
                <div class="mt-2">
                  <div>
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500">
                      <span class="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div> */
}
