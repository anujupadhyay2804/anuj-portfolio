import { useState, useRef, type FormEvent, useEffect, useCallback } from "react";
import {
  useLoaderData,
  redirect,
  useNavigate,
  useFetcher,
} from "react-router";
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";
import type { UIMessage } from "@ai-sdk/react";
import { MarkdownRenderer } from "~/components/markdown-renderer";
import type { Route } from "./+types/chat";
import type { ChatSessionRow } from "../../workers/chat-sessions";

/**
 * Chat route using Cloudflare Agents SDK.
 *
 * IMPORTANT: Always use MarkdownRenderer for AI responses!
 * AI models return markdown (code blocks, lists, tables) that must be
 * rendered properly. Never use plain <p> tags for assistant messages.
 *
 * Key features:
 * - Real-time streaming responses via WebSocket
 * - Automatic conversation history persistence (SQLite in Durable Object)
 * - Resumable streaming (reconnects continue where they left off)
 * - Full conversation context passed to AI on every message
 * - Chat history sidebar backed by a ChatSessionsDO (per anonymous user)
 *
 * How conversation continuity works:
 * - The Chat Durable Object stores all messages in SQLite via `this.messages`
 * - On each new message, ALL previous messages are passed to the AI model
 * - This happens automatically via `convertToModelMessages(this.messages)` in chat.ts
 * - The SDK handles persistence, so conversations survive page refreshes
 *
 * Session isolation:
 * - Each unique `name` in useAgent creates a separate Durable Object instance
 * - WITHOUT a unique name, ALL users share the same DO ("default") and see
 *   each other's conversations — this is the #1 deployment bug
 * - The session ID lives in the URL (/chat?session=<id>) so users can have
 *   multiple conversations and share/bookmark them
 * - Visiting /chat with no ?session redirects to a fresh session automatically
 *
 * Anonymous ownership:
 * - A `chat-owner` cookie (set in workers/app.ts) identifies the browser
 * - A ChatSessionsDO keyed by that cookie stores the session index
 * - No auth required — swap cookie for a real user ID when you add login
 *
 * API notes (AI SDK v3):
 * - useAgentChat does NOT return input/setInput/handleSubmit — manage your
 *   own input state with useState and use sendMessage() to send
 * - sendMessage accepts { text } shorthand or { role, parts } for rich content
 */

// --- Helpers ---

function getSessionsStub(context: Route.LoaderArgs["context"]) {
  const { env, ownerId } = context.cloudflare;
  // Cast: CHAT_SESSIONS binding is commented out by default in wrangler.jsonc;
  // it's only present when the AI chat feature is enabled (see CLAUDE.md).
  const binding = (env as any).CHAT_SESSIONS as DurableObjectNamespace;
  const doId = binding.idFromName(ownerId);
  return binding.get(doId);
}

// --- Loader ---

/**
 * Creates a new session and redirects when no ?session= is present.
 * When a session ID is in the URL, verifies it belongs to the current
 * owner — unknown IDs redirect to a new chat instead of auto-claiming.
 * This prevents an attacker from "adopting" another owner's session ID
 * into their index and then deleting it to wipe the Chat DO.
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session");
  const stub = getSessionsStub(context);

  // No session in URL → create one in the index and redirect
  if (!sessionId) {
    const newId = crypto.randomUUID();
    await stub.ensureSession(newId);
    url.searchParams.set("session", newId);
    throw redirect(url.pathname + url.search);
  }

  const sessions = await stub.listSessions();
  const isOwned = sessions.some((s) => s.id === sessionId);

  if (!isOwned) {
    // Unknown session ID — don't auto-register it; redirect to a new chat
    url.searchParams.delete("session");
    throw redirect(url.pathname);
  }

  return { sessionId, sessions };
}

// --- Action ---

/**
 * Handles session mutations: delete and update-title.
 * Uses React Router `<Form>` / `useFetcher` for server-driven mutations.
 */
export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const stub = getSessionsStub(context);

  if (intent === "delete") {
    const id = formData.get("id") as string;
    if (id) {
      // deleteSession returns true only if the session belonged to this owner.
      // This prevents a crafted request from wiping another owner's Chat DO.
      const deleted = await stub.deleteSession(id);
      if (deleted) {
        // Also clear the Chat DO's messages so the conversation is fully removed.
        // The Chat binding exists only when the AI chat feature is enabled.
        const chatBinding = (context.cloudflare.env as any).Chat as
          | DurableObjectNamespace
          | undefined;
        if (chatBinding) {
          try {
            const chatStub = chatBinding.get(chatBinding.idFromName(id));
            await (chatStub as any).deleteAllMessages();
          } catch {
            // Chat DO not available — index entry is still removed
          }
        }
      }
    }
    return { ok: true };
  }

  if (intent === "update-title") {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    if (id && title) await stub.updateTitle(id, title);
    return { ok: true };
  }

  return { ok: false };
}

// --- Components ---

export default function ChatPage() {
  const { sessionId, sessions } = useLoaderData<typeof loader>();
  const [mounted, setMounted] = useState(false);


[376 more lines in file. Use offset=151 to continue.]