import React from "react";
import type { TokenSymbolT } from "../../../types";
import style from "./style.module.scss";
import { Button } from "antd";

type Props = {
  onClick?: () => void;
  tokenSymbol: TokenSymbolT;
};

const Component = ({ onClick = () => {}, tokenSymbol }: Props) => (
  <Button onClick={onClick} className={`${style.loginBtn} ${style[tokenSymbol.toLowerCase()]}`}>
    Log in with Github
  </Button>
);

export const LoginWithGithub = React.memo(Component);
