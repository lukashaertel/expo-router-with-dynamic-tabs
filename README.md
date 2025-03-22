# Expo router with dynamic tabs

This example shows how to render a swipe-able top-tab view with dynamic elements used in
conjunction with `expo-router` and integrated into the navigation.

The key takeaway is that a `+not-found` route is used to handle all dynamically retrieved
routes. That way, the component instance stays the same, as opposed to using a dynamic
route like `[id]`, which would create a new instance on navigation.

With the component instance staying the same, we can leverage the `react-native-tab-view`
component and sync it with the current navigation state. The currently displayed index
will be retrieved from our dynamic data, and setting the index (from the tab view) will
perform a proper `expo-router` navigation.

## Locations

The meat of the logic is found in `(tabs)/events/days/+not-found.tsx`. The logic is documented in the
file.

There is an additional helper route to allow some basic navigation functionality. 
Having `(tabs)/events/days/index` match the `events/days` path and redirecting to the first dynamic
route instead allows proper navigation to the "top level" route.

The layout component in `(tabs)/_layout.tsx` has some setup to allow for the
`+not-found` route to be shown as active when a day is viewed. It also hides the
index route from the tabs layout.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
