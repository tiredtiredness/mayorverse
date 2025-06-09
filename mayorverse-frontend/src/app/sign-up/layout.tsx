import { JSX } from "react";

export default function SignUpLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="w-dvw min-h-[calc(100dvh_-_48px_-_66px)] flex items-center justify-center">
      {children}
    </div>
  );
}
