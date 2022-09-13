import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Goerli Network. */}
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Cüzdanını Siteye Bağla
          </button>
        </div>
      </div>
    </div>
  );
}
