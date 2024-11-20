import { ReactNode } from "react";

export interface ILinkButton {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}