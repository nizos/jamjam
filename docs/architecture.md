# JamJam Architecture

## Overview

JamJam is a FigJam-like collaborative whiteboard application built with React, TypeScript, and Konva.js. The architecture follows Domain-Driven Design (DDD) principles with a focus on testability through dependency injection and clean separation of concerns.

## Core Principles

1. **Test-Driven Development (TDD)** - All features start with failing tests
2. **Dependency Injection** - Interfaces define contracts, implementations are injected
3. **Clean Architecture** - Business logic is independent of UI framework
4. **Immutability** - State changes create new objects rather than mutating
5. **Type Safety** - Leverage TypeScript for compile-time guarantees

## Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│                  (React Components)                      │
├─────────────────────────────────────────────────────────┤
│                    Application Layer                     │
│              (Hooks, Event Handlers)                    │
├─────────────────────────────────────────────────────────┤
│                      Domain Layer                        │
│              (Business Logic, Models)                    │
├─────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                    │
│              (Stores, External APIs)                     │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── domain/              # Pure business logic
│   ├── canvas/         # Canvas-related logic
│   ├── objects/        # Object models
│   ├── selection/      # Selection logic
│   └── transformations/# Transformation logic
├── application/        # Application services
│   ├── hooks/         # React hooks
│   └── services/      # Application services
├── presentation/      # UI components
│   ├── components/    # React components
│   └── styles/        # Component styles
├── infrastructure/    # External concerns
│   ├── stores/        # Zustand stores
│   └── konva/         # Konva-specific code
└── shared/           # Shared utilities
    ├── types/        # Type definitions
    └── utils/        # Utility functions
```

## Domain Models

### Core Interfaces

```typescript
// Base object interface
interface CanvasObject {
  id: ObjectId
  type: ObjectType
  position: Point
  size: Size
  rotation: number
  style: Style
  zIndex: number
}

// Renderer interface for dependency injection
interface ObjectRenderer<T extends CanvasObject> {
  render(object: T): KonvaNode
  updateVisualState(node: KonvaNode, object: T): void
}

// Transformer interface
interface ObjectTransformer {
  canTransform(object: CanvasObject, transformation: Transformation): boolean
  transform(object: CanvasObject, transformation: Transformation): CanvasObject
}

// Selection manager interface
interface SelectionManager {
  select(objectIds: ObjectId[]): Selection
  deselect(): void
  toggle(objectId: ObjectId): Selection
  clear(): void
}
```

### Value Objects

```typescript
// Immutable value objects
class Point {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}
  add(other: Point): Point
  subtract(other: Point): Point
  scale(factor: number): Point
}

class Size {
  constructor(
    readonly width: number,
    readonly height: number
  ) {}
  scale(factor: number): Size
}

class Bounds {
  constructor(
    readonly position: Point,
    readonly size: Size
  ) {}
  contains(point: Point): boolean
  intersects(other: Bounds): boolean
}
```

## State Management

### Zustand Stores

```typescript
// Canvas store
interface CanvasState {
  viewport: Viewport
  zoom: number
  actions: {
    pan(delta: Point): void
    zoom(factor: number, center: Point): void
    reset(): void
  }
}

// Objects store
interface ObjectsState {
  objects: Map<ObjectId, CanvasObject>
  actions: {
    add(object: CanvasObject): void
    update(id: ObjectId, updates: Partial<CanvasObject>): void
    remove(id: ObjectId): void
    transform(id: ObjectId, transformation: Transformation): void
  }
}

// Selection store
interface SelectionState {
  selectedIds: Set<ObjectId>
  actions: {
    select(ids: ObjectId[]): void
    deselect(): void
    toggle(id: ObjectId): void
    clear(): void
  }
}
```

## Dependency Injection Pattern

### Service Registration

```typescript
// Service container
class ServiceContainer {
  private services = new Map<string, any>()

  register<T>(token: string, factory: () => T): void
  resolve<T>(token: string): T
}

// Usage in components
function CanvasComponent() {
  const renderer = useService<ObjectRenderer>('ObjectRenderer')
  const transformer = useService<ObjectTransformer>('ObjectTransformer')
  // ...
}
```

### Testing with DI

```typescript
// Test with mock implementations
describe('Selection', () => {
  it('should select objects', () => {
    const mockRenderer: ObjectRenderer = {
      render: jest.fn(),
      updateVisualState: jest.fn(),
    }

    const container = new ServiceContainer()
    container.register('ObjectRenderer', () => mockRenderer)

    // Test with mocked dependencies
  })
})
```

## Event Flow

```
User Input → UI Component → Hook → Domain Action → State Update → UI Update
     ↑                                                                ↓
     └────────────────────── Visual Feedback ←──────────────────────┘
```

### Example: Moving an Object

1. User drags object (mouse event)
2. Canvas component captures event
3. `useObjectManipulation` hook processes drag
4. Calls domain `transformer.move(object, delta)`
5. Updates object in store
6. Store notifies subscribers
7. Canvas re-renders with new position
8. Visual feedback shows during drag

## Testing Strategy

### Unit Tests (Domain Layer)

- Test pure functions in isolation
- No UI framework dependencies
- Mock boundaries with interfaces
- 100% coverage target

### Integration Tests (Application Layer)

- Test hooks with React Testing Library
- Test store interactions
- Mock external dependencies

### E2E Tests (Presentation Layer)

- Test user workflows with Playwright
- Test visual feedback
- Test keyboard interactions
- Performance benchmarks

## Performance Considerations

### Rendering Optimization

- Virtual rendering for objects outside viewport
- Debounced updates for expensive operations
- Layer caching for static content
- Batched state updates

### Memory Management

- Object pooling for frequent allocations
- Weak references for event handlers
- Cleanup on unmount
- Limit undo/redo history

## Security Considerations

- Input validation for all user data
- Sanitize text content
- Limit object counts per canvas
- Rate limiting for operations

## Future Extensibility

### Plugin System

```typescript
interface Plugin {
  name: string
  initialize(context: PluginContext): void
  registerTools?(): Tool[]
  registerObjects?(): ObjectType[]
  registerTransformers?(): Transformer[]
}
```

### Collaboration (Future)

- CRDT for conflict resolution
- WebSocket for real-time sync
- Presence indicators
- Collaborative cursors

## Development Workflow

1. **Feature Planning**

   - Define user stories
   - Design domain models
   - Plan test scenarios

2. **TDD Implementation**

   - Write failing tests
   - Implement minimal code
   - Refactor with green tests

3. **Integration**

   - Wire up UI components
   - Add visual feedback
   - Write integration tests

4. **Review & Deploy**
   - Code review
   - Performance testing
   - Documentation update
