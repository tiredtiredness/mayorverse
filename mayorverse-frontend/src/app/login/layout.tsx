export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-dvw min-h-[calc(100dvh_-_48px_-_66px)] flex items-center justify-center'>
      {children}
    </div>
  );
}
