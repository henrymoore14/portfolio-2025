import React from "react";

interface ColumnScaffoldProps {
  show?: boolean;
}

/**
 * A reusable 12-column layout scaffold for visual design.
 * Margins: 48px, Gutters: 16px. Toggle with `show` prop.
 * Uses Tailwind grid-cols-12 and gap-4 for alignment.
 */
export default function ColumnScaffold({ show = false }: ColumnScaffoldProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full" style={{ top: 0, left: 0 }}>
      <div className="grid grid-cols-12 gap-4 h-full w-full px-12">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(100,100,100,0.07) 0%, rgba(100,100,100,0.07) 100%)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
