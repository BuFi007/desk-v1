"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@bu/ui/breadcrumb";
import { cn } from "@bu/ui/cn";

interface BreadcrumbProps {
  className?: string;
}

export function DynamicBreadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean).slice(1);

  // If we're at the root path, don't show breadcrumbs
  if (pathSegments.length === 0) return null;

  // Convert path segments to breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    const label = segment
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <Breadcrumb className={cn("flex-1", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbItems.map(({ href, label, isLast }, index) => (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
