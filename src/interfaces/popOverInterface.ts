import { TooltipPlacement } from "antd/es/tooltip";
import React, { ReactNode } from "react";

export interface IPopOverProps {
  children: React.ReactNode;
  title?: string;
  content: ReactNode;
  placement?: TooltipPlacement;
}
