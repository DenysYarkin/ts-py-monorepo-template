---
name: effector-best-practices
description: Use this skill when any changes to the frontend effector stores, effects or events are needed, including creating new stores, effects or events.
---

TODO:

1. add about entities pattern
2. splitting between several files, like effects, stores, etc.
3. loading state
4. do not use effect.doneData effet.pending etc in useUnit (but they can be use in samples and .on() handlers)
5. stores must be located at shared/ dir or entities/.../store.

### 1. Events (Signals & Intents)

- **Naming conventions:** Name events as explicit user actions (e.g., `submitFormEvent`) and and end with `Event` suffix.

### 2. Stores (State)

- **Explicit updates:** Only update stores using `.on()`. Never mutate the state inside the handler; always return a newly constructed value.

### 3. Effects (Side Effects & Async)

- **Naming conventions:** Name effects as the action they perform (e.g., `fetchUsersFx`) and end with `Fx` suffix.
- **Never use `$store.getState()`:** Reading state imperatively inside an effect breaks reactivity and causes race conditions. Use `attach` instead.

### 4. Advanced Logic & Wiring

- **Use `sample` for complex wiring:** Use it to read state, filter executions, and pass data between events, stores, and effects.
- **Never use `.watch()` for business logic:** `.watch()` is strictly for debugging or bridging legacy code. Never trigger an event or effect inside `.watch()`.
- **Use `attach` for Dependency Injection:** When an effect needs state (like an auth token), use `attach`. It safely injects store data into the effect.

### 5. React Integration (`effector-react`)

- **Use `useUnit`:** This is the modern standard hook. It batches updates and seamlessly binds stores, events, and effects. Avoid older hooks like `useStore` or `useEvent`.
- **Use `useStoreMap` for prop-based mapping:** When a child component needs a specific slice of a store _based on a React prop_ (e.g., extracting one user from a list using an `id` prop), use `useStoreMap`. It prevents unnecessary re-renders. If props aren't involved, just use `$store.map()` in your model instead.
- **Keep components pure:** Components should strictly map Effector state to UI and user interactions to Effector events. Try to avoid writing business logic in `useEffect`. Use `createGate` to tie component lifecycles to Effector.

### 6. Architecture & Testing

- **Complete decoupling:** Your Effector model should never import from your React components. The model should be 100% testable in a Node.js environment without rendering the UI.
