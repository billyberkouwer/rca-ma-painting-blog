import Navbar from "@/components/Navbar/Navbar";
import PageScrollCounter from "@/components/PageHeightCounter/PageScrollCounter";
import "./global.scss"
import { unstable_ViewTransition as ViewTransition } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ViewTransition>
      <Navbar />
        {children}
        <PageScrollCounter />
      </ViewTransition>
    </main>
  );
}
