"use client";

import { useState } from "react";
import { definePlugin, useClient } from "sanity";
import { getPlaceholderDocuments } from "./placeholderDocs";

function SeedView() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const docs = getPlaceholderDocuments();

  const loadPlaceholders = async () => {
    setStatus("saving");
    setMessage("");
    try {
      for (const doc of docs) {
        await client.createOrReplace(doc);
      }
      setStatus("done");
      setMessage(`Published ${docs.length} placeholder documents. Open Site Settings, Home, Work, Contact, and Projects to edit.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not publish placeholders.");
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 640, fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Load placeholders</h2>
      <p style={{ lineHeight: 1.5, marginBottom: 16 }}>
        Writes the current site copy into Sanity: brand settings, home, work, contact, and the six placeholder projects.
      </p>
      <button
        type="button"
        onClick={loadPlaceholders}
        disabled={status === "saving"}
        style={{
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid currentColor",
          background: "transparent",
          cursor: status === "saving" ? "wait" : "pointer",
        }}
      >
        {status === "saving" ? "Publishing…" : "Publish placeholder content"}
      </button>
      {message ? (
        <p style={{ marginTop: 16, lineHeight: 1.5, color: status === "error" ? "#e11d48" : "inherit" }}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

export const seedTool = definePlugin({
  name: "placeholder-seed",
  tools: [
    {
      name: "placeholders",
      title: "Load placeholders",
      component: SeedView,
    },
  ],
});
