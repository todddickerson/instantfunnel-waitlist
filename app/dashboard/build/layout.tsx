export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0F] overflow-y-auto">
      {children}
    </div>
  );
}
