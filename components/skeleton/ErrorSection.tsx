import { Container } from "components/Container";
import { InfoIcon, ReloadIcon } from "components/Icons";
import { useState } from "react";

export default function AboutError() {
  let [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      {isExpanded && (
        <Container className="mt-9">
          <div
            className="max-w-3xl p-4 border border-zinc-100 dark:border-zinc-700/40 rounded-lg dark:bg-zinc-800/90"
            role="alert"
          >
            <div className="flex items-center">
              <InfoIcon className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300" />
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Oops something went wrong!
              </h3>
            </div>
            <div className="mt-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
              Was not able to fetch the data for this section. You can continue
              browsing the site, but this section will not be available. You can
              try reloading the page to see if the issue is resolved.
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <ReloadIcon className="-ml-0.5 mr-2 h-4 w-4" />
                Reload
              </button>
              <button
                type="button"
                className="text-gray-700 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white"
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
