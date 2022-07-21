import React from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
//@ts-ignore
import GitHubForkRibbon from "react-github-fork-ribbon";

type Props = {
  children: React.ReactNode;
};

export const TopLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <GitHubForkRibbon
        href="https://github.com/splaplapla/procon_bypass_man_setting_editor"
        target="_blank"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
      <ThemeProvider breakpoints={["md", "sm"]}>{children}</ThemeProvider>
    </>
  );
};
