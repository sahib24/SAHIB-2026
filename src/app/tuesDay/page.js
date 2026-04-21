"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <Button
        text="Primary"
        onClick={() => alert("Primary")}
        variant="primary"
        size="md"
      />

      <Button text="Delete" variant="danger" onClick={() => alert("Deleted")} />

      <Button text="Success" variant="success" size="lg" />

      <Button text="Loading" loading={true} />

      <Button text="Disabled" disabled={true} />

      <Button text="Full Width" fullWidth={true} className="max-w-xs" />
    </div>
  );
}
