// Base event
export interface BaseAgentEvent {
  eventId: string;
  prId: string;
  prNumber: number;
  prTitle: string;
  repository: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
}

// Agent started
export interface AgentStartedEvent extends BaseAgentEvent {
  type: "agent_started";
  suggestionId: string;
  agentType: string;
  agentName: string;
  agentIcon: string;
  status: "analyzing";
}

// Agent completed
export interface AgentCompletedEvent extends BaseAgentEvent {
  type: "agent_completed";
  suggestionId: string;
  agentType: string;
  agentName: string;
  agentIcon: string;
  status: "completed";
  score: number;
  issuesFound: number;
  summary: string;
}

// Agent handoff
export interface AgentHandoffEvent extends BaseAgentEvent {
  type: "agent_handoff";
  fromAgent: string;
  toAgent: string;
  reason: string;
  timestamp: string;
}

// PR timeline event
export interface PRTimelineEvent {
  prId: string;
  prNumber: number;
  prTitle: string;
  repository: string;
  status: "in_progress" | "completed";
  agents: {
    agentType: string;
    status: "pending" | "analyzing" | "completed" | "failed";
    score?: number;
    completedAt?: string;
  }[];
}

export type SocketEvent =
  | AgentStartedEvent
  | AgentCompletedEvent
  | AgentHandoffEvent
  | PRTimelineEvent;
