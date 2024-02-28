import { Outlet } from "react-router-dom";
import { BaseHeader } from "../components/layout/BaseHeader";
import { BaseFooter } from "../components/layout/BaseFooter";

export const BaseLayout = () => {
  return (
    <>
      <BaseHeader />
      <Outlet />
      <BaseFooter />
    </>
  );
};
