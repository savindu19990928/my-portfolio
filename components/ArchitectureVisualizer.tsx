"use client";

import { useState } from "react";

type PipelineKey = "rest" | "ai" | "realtime";

interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  accent: "emerald" | "gold" | "coral";
  detailTitle: string;
  detailBody: string;
  snippet: string;
}

interface PipelineSpec {
  id: PipelineKey;
  tabLabel: string;
  routeLabel: string;
  protocolBadge: string;
  nodes: PipelineNode[];
}

const PIPELINES: PipelineSpec[] = [
  {
    id: "rest",
    tabLabel: "REST & Security",
    routeLabel: "POST /api/v1/orders/checkout",
    protocolBadge: "Django DRF · MySQL · Docker",
    nodes: [
      {
        id: "gateway",
        label: "API Gateway & Validation",
        sublabel: "Schema + Input Controls",
        accent: "coral",
        detailTitle: "Boundary Validation & Security Controls",
        detailBody:
          "Incoming JSON payloads pass serializer type checks, field-level sanitization, and structured error handling before reaching domain logic.",
        snippet: 'HTTP/1.1 201 Created\nContent-Type: application/json\n{ "validated": true, "status": "accepted" }',
      },
      {
        id: "service",
        label: "Backend Service Layer",
        sublabel: "Django / Spring / Node.js",
        accent: "emerald",
        detailTitle: "Modular Application & Business Logic",
        detailBody:
          "Decoupled service endpoints handle authentication, inventory updates, and transactional consistency across multi-step operations.",
        snippet: 'class OrderViewSet(ModelViewSet):\n  permission_classes = [IsAuthenticated]\n  serializer_class = OrderSerializer',
      },
      {
        id: "database",
        label: "Relational Persistence",
        sublabel: "MySQL · PostgreSQL · SQL Server",
        accent: "gold",
        detailTitle: "Normalized Schema & Query Integrity",
        detailBody:
          "Relational tables, foreign-key constraints, and containerized database services preserve clean transactional state.",
        snippet: 'BEGIN;\nINSERT INTO orders (user_id, total) VALUES ($1, $2);\nCOMMIT;',
      },
    ],
  },
  {
    id: "ai",
    tabLabel: "AI Dev Workflow",
    routeLabel: "SKILL /drf-ecommerce-workflow",
    protocolBadge: "AI Skill Sets · DRF Conventions",
    nodes: [
      {
        id: "spec",
        label: "Structured Skill Context",
        sublabel: "Reusable DRF Skill Set",
        accent: "gold",
        detailTitle: "Reusable AI Implementation Rules",
        detailBody:
          "Reusable skill definitions guide API endpoint layout, serializer structure, and e-commerce workflow conventions.",
        snippet: 'skill: "django-drf-api"\ntarget: "serializers, viewsets, urls"\nmode: "deterministic-scaffold"',
      },
      {
        id: "codegen",
        label: "API Workflow Generation",
        sublabel: "Endpoints · Models · Routes",
        accent: "emerald",
        detailTitle: "Consistent Backend Delivery",
        detailBody:
          "Translates domain requirements into cleanly separated models, permissions, and REST endpoints aligned with Django REST Framework patterns.",
        snippet: 'urlpatterns = [\n  path("api/products/", ProductListView.as_view()),\n  path("api/cart/", CartDetailView.as_view()),\n]',
      },
      {
        id: "verify",
        label: "Security & Review Gate",
        sublabel: "Validation · Error Paths",
        accent: "coral",
        detailTitle: "Secure Verification Checklist",
        detailBody:
          "Enforces access checks, input validation boundaries, and predictable exception responses before code ships.",
        snippet: 'CHECK auth_required      [PASS]\nCHECK input_serializer   [PASS]\nCHECK error_envelope     [PASS]',
      },
    ],
  },
  {
    id: "realtime",
    tabLabel: "Full-Stack & Cloud",
    routeLabel: "WSS + HTTPS /client-platform",
    protocolBadge: "Next.js · React · GCP / AWS",
    nodes: [
      {
        id: "client",
        label: "Responsive Web Client",
        sublabel: "React.js · Next.js · Tailwind",
        accent: "gold",
        detailTitle: "Modern Component Frontend",
        detailBody:
          "Accessible TypeScript and React interfaces consuming REST, GraphQL, or WebSocket streams with responsive grid discipline.",
        snippet: 'const res = await fetch("/api/catalog", {\n  headers: { Accept: "application/json" }\n});',
      },
      {
        id: "transport",
        label: "API & Socket Transport",
        sublabel: "REST · GraphQL · WebSockets",
        accent: "emerald",
        detailTitle: "Unified Data Transport Layer",
        detailBody:
          "Supports standard request-response APIs alongside persistent WebSocket event streams when real-time updates are needed.",
        snippet: 'socket.on("inventory:update", (payload) => {\n  syncCatalogState(payload);\n});',
      },
      {
        id: "cloud",
        label: "Cloud & Container Runtime",
        sublabel: "Docker · AWS · GCP · OCI · Azure",
        accent: "coral",
        detailTitle: "Portable Containerized Deployment",
        detailBody:
          "Dockerized workloads built to run consistently across cloud providers including GCP, AWS, OCI, and Azure.",
        snippet: 'FROM python:3.12-slim\nCOPY requirements.txt .\nRUN pip install -r requirements.txt',
      },
    ],
  },
];

function accentDotClass(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") return "bg-[var(--accent-gold)]";
  if (accent === "coral") return "bg-[var(--accent-coral)]";
  return "bg-[var(--accent-emerald)]";
}

function accentBadgeClass(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") {
    return "border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)]";
  }
  if (accent === "coral") {
    return "border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] text-[var(--accent-coral-ink)]";
  }
  return "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald-ink)]";
}

export function ArchitectureVisualizer() {
  const [activePipeline, setActivePipeline] = useState<PipelineKey>("rest");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(1);
  const [isStreaming, setIsStreaming] = useState(true);

  const pipeline = PIPELINES.find((p) => p.id === activePipeline) ?? PIPELINES[0];
  const activeNode = pipeline.nodes[selectedNodeIndex] ?? pipeline.nodes[0];

  return (
    <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-[var(--shadow-card)]">
      {/* Top engineering bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-coral)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-gold)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-emerald)]" />
          </div>
          <span className="font-mono text-xs font-medium text-[var(--text-secondary)]">
            architecture.blueprint
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsStreaming((prev) => !prev)}
          aria-label={isStreaming ? "Pause pipeline flow animation" : "Play pipeline flow animation"}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isStreaming ? "bg-[var(--accent-emerald)]" : "bg-[var(--text-muted)]"
            }`}
            aria-hidden="true"
          />
          <span>{isStreaming ? "Pause flow" : "Play flow"}</span>
        </button>
      </div>

      {/* Pipeline Mode Switcher */}
      <div
        role="tablist"
        aria-label="Architecture workflow modes"
        className="mt-3.5 grid grid-cols-3 gap-1.5 rounded-xl bg-[var(--bg-elevated)] p-1"
      >
        {PIPELINES.map((item) => {
          const selected = item.id === activePipeline;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActivePipeline(item.id);
                setSelectedNodeIndex(1);
              }}
              className={`min-h-[40px] rounded-lg px-2 py-1.5 text-center text-xs sm:text-[13px] font-semibold transition-colors ${
                selected
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--border-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Route & Stack Strip */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-code)] px-3.5 py-2.5">
        <code className="font-mono text-xs text-[var(--accent-emerald-ink)] break-all">
          {pipeline.routeLabel}
        </code>
        <span className="font-mono text-[11px] text-[var(--text-secondary)]">
          {pipeline.protocolBadge}
        </span>
      </div>

      {/* Interactive Node Pipeline */}
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 relative">
          {pipeline.nodes.map((node, index) => {
            const isSelected = selectedNodeIndex === index;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeIndex(index)}
                aria-pressed={isSelected}
                className={`group relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-150 ${
                  isSelected
                    ? "border-[var(--accent-emerald)] bg-[var(--bg-elevated)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]"
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium text-[var(--text-muted)]">
                    0{index + 1}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${accentDotClass(node.accent)}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug text-[var(--text-primary)]">
                  {node.label}
                </div>
                <div className="mt-1 font-mono text-[11px] leading-relaxed text-[var(--text-secondary)]">
                  {node.sublabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Connector Signal Bar (SVG animated stream) */}
        <div className="my-3 px-2" aria-hidden="true">
          <svg
            viewBox="0 0 600 18"
            className="h-[18px] w-full overflow-visible"
            fill="none"
          >
            <line
              x1="12"
              y1="9"
              x2="588"
              y2="9"
              stroke="var(--border-strong)"
              strokeWidth="1.5"
            />
            <line
              x1="12"
              y1="9"
              x2="588"
              y2="9"
              stroke="var(--accent-emerald)"
              strokeWidth="2"
              strokeLinecap="round"
              className="pipeline-stream"
              data-running={isStreaming ? "true" : "false"}
            />
            <circle cx="12" cy="9" r="3.5" fill="var(--accent-coral)" />
            <circle cx="300" cy="9" r="3.5" fill="var(--accent-emerald)" />
            <circle cx="588" cy="9" r="3.5" fill="var(--accent-gold)" />
          </svg>
        </div>

        {/* Selected Node Details & Code Inspector */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {activeNode.detailTitle}
            </p>
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium ${accentBadgeClass(
                activeNode.accent
              )}`}
            >
              {activeNode.sublabel}
            </span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            {activeNode.detailBody}
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3 font-mono text-xs leading-relaxed text-[var(--text-primary)]">
            <code>{activeNode.snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
