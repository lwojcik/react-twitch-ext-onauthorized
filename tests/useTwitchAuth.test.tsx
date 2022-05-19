import React from "react";
import { render } from "@testing-library/react";
import { useTwitchAuth } from "../src/useTwitchAuth";

const TestElement = () => {
  const twitchAuth = useTwitchAuth();
  return <div>TestElement {JSON.stringify(twitchAuth)}</div>;
};

const mockTwitchExtensionContext = () => {
  Object.defineProperty(window, "Twitch", {
    value: {
      ext: {
        onAuthorized: jest.fn().mockImplementation((callback: Function) => {
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
