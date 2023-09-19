import { Button } from "./ui/button";

const ContactBlock = () => {
  return (
    <div className="">
      <h2 className="mb-14 text-3xl font-black text-blue">
        Book a chat with our advisors
      </h2>
      <form>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-neutral-900">
          <label className="block">
            <span>First name</span>
            <input
              className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
              type="text"
            />
          </label>
          <label className="block">
            <span>Last name</span>
            <input
              className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
              type="text"
            />
          </label>
          <label className="block">
            <span>Email</span>
            <input
              className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
              type="email"
            />
          </label>
          <label className="block">
            <span>Phone</span>
            <input
              className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
              type="tel"
            />
          </label>
          <label className="col-span-2 block">
            <span>Message</span>
            <textarea
              className="mt-1 block w-full border-transparent bg-neutral-100 focus:border-neutral-500 focus:bg-white focus:ring-0"
              rows={3}
            />
          </label>
          <div className="gap col-span-2 flex justify-between">
            <span className="max-w-[48ch]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              aliquam volutpat ornare. Duis dui purus.
            </span>
            <Button type="submit">Send</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

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
