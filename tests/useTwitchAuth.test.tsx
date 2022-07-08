import React from "react";
import { render } from "@testing-library/react";
import { useTwitchAuth } from "../src/useTwitchAuth";

// eslint-disable-next-line react/function-component-definition
const TestElement = () => {
  const twitchAuth = useTwitchAuth();
  return <div>TestElement {JSON.stringify(twitchAuth)}</div>;
};

const mockTwitchExtensionContext = () => {
  Object.defineProperty(window, "Twitch", {
    value: {
      ext: {
        onAuthorized: jest.fn().mockImplementation((callback) => {
          callback({
            authorized: true,
            channelId: "test_channel_id",
            token: "test_token",
            clientId: "test_client_id",
            userId: "test_user_id",
          });
        }),
      },
    },
    writable: true,
  });
};

const resetTwitchExtensionContext = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Twitch = null;
};

describe("useTwitchAuth", () => {
  it("should return Twitch authorization object when authorization passes", () => {
    mockTwitchExtensionContext();
    const { container } = render(<TestElement />);
    expect(container).toMatchSnapshot();
    resetTwitchExtensionContext();
  });

  it("should return object with empty values outside of a Twitch Extension context", () => {
    const { container } = render(<TestElement />);
    expect(container).toMatchSnapshot();
  });
});
