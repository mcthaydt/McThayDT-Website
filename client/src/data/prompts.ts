export interface Prompt {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  order: number;
}

export const prompts: Prompt[] = [
  {
    id: 1,
    title: "Implementation Prompt",
    subtitle: "Engineering",
    content: `Now implement precisely as planned, in full.

Implementation Requirements:

- Write elegant, minimal, modular code.
- Adhere strictly to existing code patterns, conventions, and best practices.
- Include thorough, clear comments/documentation within the code.
- As you implement each step:
  - Update the markdown tracking document and overall progress percentage dynamically.`,
    order: 1
  },
  {
    id: 2,
    title: "Depth Prompt",
    subtitle: "Strategy",
    content: `What am I not seeing here? What else should I know?`,
    order: 2
  },
  {
    id: 3,
    title: "Audit Prompt",
    subtitle: "Quality Assurance",
    content: `Audit all of your work for completeness, consistency, cohesion, and harmony, both within itself and relative to the spec and relative to the codebase. Assume nothing. Verify everything. Investigate any incomplete implementations or incomplete integrations. Do your best work.`,
    order: 3
  },
  {
    id: 4,
    title: "Debugging Prompt",
    subtitle: "Engineering",
    content: `Reflect on 5-7 different possible sources of the problem, distill those down to 1-2 most likely sources, and then add logs to validate your assumptions before we move onto implementing the actual code fix`,
    order: 4
  },
  {
    id: 5,
    title: "Continuation Template",
    subtitle: "Workflow",
    content: `# Continuation Prompt Template

## Current Focus

- Feature / story:
- Branch:
- Status summary:

## Recent Progress

- Update 1
- Update 2

## Required Readings

- Document1.md
- Document2.md

## Next Steps

1. Immediate task
2. Follow-up task

## Outstanding Risks

- Risk item

## Links

- Plan:
- Tasks:
- PRD:`,
    order: 5
  },
  {
    id: 6,
    title: "Implementation Plan",
    subtitle: "Project Management",
    content: `# Implementation Plan Template

## Summary

- Feature / area:
- Owner:
- Current status:

## Milestones

1. Milestone name – expected deliverable
2. Milestone name – expected deliverable

## Work Breakdown

- [ ] Task group 1
  - Notes / blockers
- [ ] Task group 2

## Testing Strategy

- Unit tests:
- Integration tests:

## Risks & Mitigations

- Risk:
  - Mitigation:

## References

- Link to PRD
- Link to task list`,
    order: 6
  },
  {
    id: 7,
    title: "PRD Template",
    subtitle: "Product Management",
    content: `# Feature PRD Template

## Overview

- Feature name:
- Owner:
- Target release:

## Problem Statement

- What user problem are we solving?
- Why now?

## Goals

- Goal 1
- Goal 2

## Non-Goals

- Out of scope item 1

## User Experience Notes

- Primary entry points
- Critical interactions

## Technical Considerations

- Dependencies
- Risks / mitigations

## Success Metrics

- Metric 1
- Metric 2

## Open Questions

- Question 1`,
    order: 7
  },
  {
    id: 8,
    title: "Task Checklist",
    subtitle: "Workflow",
    content: `# Task Checklist Template

**Progress:** 0% (0 / N tasks complete)

## Task Groups

- [ ] Task summary (owner)
- [ ] Task summary (owner)

## Notes

- Record decisions, follow-ups, or blockers here.

## Links

- Plan:
- Continuation prompt:`,
    order: 8
  }
];
