import AdminSidebar from "@/components/AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin",
  },
  description: "Admin sahifasi",
  robots: { index: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 bg-muted/30">{children}</div>
    </div>
  );
}
