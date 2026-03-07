---
name: frontend-feature-dev
description: Use this skill when making any changes to the frontend (`frontend` app) or working with any React components (and any other UI code).
---

# Guidelines

1. We use `shadcn` library for the frontend UI components. Installed `shadcn` components are installed at `apps/frontend/src/shared/components/ui/`. You must use those component when they are relevant. For example, if you need a button in some component, you must use `<Button />` from `ui` package instead basic button or any other custom button components.
2. You must use custom `shadcn` tailwind colors classes. Try to avoid using standard tailwind colors like `neutral-500`, `red-100`, etc. Instead you must use existing custom classes like `bg-accent`, `text-accent-foreground`, `border-border`, etc. DO NOT create new custom color classes, because we already have existing classes for all needed colors.
3. For partially opaque colors, for example, hover background color of context menu button, use `muted/60` color.
4. `apps/frontend/src/shared/components` directory is meant EXCLUSIVELY for reusable components like buttons, forms, etc. Mainly for the ones installed with `shadcn/ui` tool. If you need to create a new component that is not reusable, create it in the relevant feature or enttity directory.
5. Using `Record<string, ...>` is fine, but if it's not guaranteed that the value for some key is defined, you must use `Record<string, ... | undefined>`.
6. This project has tanstack query installed. You must be careful and not overuse it, since we already have our own data fetching and managing system based on `effector`. Usually, it makes sense if you have to load some data that is "local" to the current component and is not going to be edited or deleted. Otherwise, you must use `effector` stores and effects.

## Bad Practices

Here are some examples of things that must be avoided in this project while making changes to the frontend:

1. DO NOT use `any` type.
2. DO NOT use `useUnit` to get the status of the effect. For example:

```tsx
const [isLoadingUser, isLoggingOut] = useUnit([
  fetchAuthorizedUserFx.pending,
  submitLogoutFx.pending,
]);
```

In such cases, you must store the status in the related store. For example, `fetchStatus: 'not_loaded' | 'loading' | 'loaded' | 'error'`

# Colors

Here are main colors that can be used:

## Primary Theme Colors

- Background
- Foreground
- Primary
- Primary Foreground

## Secondary & Accent Colors

- Secondary
- Secondary Foreground
- Accent
- Accent Foreground

## UI Component Colors

- Card
- Card Foreground
- Popover
- Popover Foreground
- Muted
- Muted Foreground

## Utility & Form Colors

- Border
- Input
- Ring

## Status & Feedback Colors

- Destructive
- Destructive Foreground

## Chart & Visualization Colors

- Chart 1, 2, ..., 5

## Sidebar & Navigation Colors

- Sidebar
- Sidebar Foreground
- Sidebar Primary
- Sidebar Primary Foreground
- Sidebar Accent
- Sidebar Accent Foreground
- Sidebar Border
- Sidebar Ring

**Note!** Pay attention, that other colors may be available, they can be found at `globals.css`. If they are relevant, don't hesitate to use them.

# Specific solutions

## Popups system

Out of the box popups in `shadcn` are implemented declaratively, by adding `<Dialog />` component to the page. But it can be not convenient in a lot of cases, so the custom system for invoking popups programmatically is used.
If current component is used inside `<PopupProvider />`, we can use

```tsx
const popupManager = usePopupManager();
```

in component. Then, you can invoke the popup in the following way:

```tsx
const openDeleteEmailPopup = useCallback(() => {
  popupManager.openPopup(
    <DialogPopup
      title="Delete email"
      description="Are you sure you want to delete this email?"
      buttons={[
        { text: "Cancel", onClick: () => popupManager.closePopups() },
        {
          text: "Delete",
          variant: "destructive",
          onClick: () => {
            deleteEmails({ emailsIds: [props.email.id] });
            popupManager.closePopups();
          },
        },
      ]}
    />,
  );
}, [popupManager, deleteThreads, props.thread.id]);
```

where `<DialogPopup />` component looks smth like that

```tsx
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';

...

<Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
  <DialogTitle>{props.title}</DialogTitle>
  <DialogContent className="w-[511px]">
      ...
  </DialogContent>
</Dialog>
```

Pay attention that it's just an example, you may not always use `DialogPopup` component, other popups can be created.
