# Capacitor Test App

This is a test application for `capacitor-exampleplugin`.

## Features

- Built with Ionic and Angular.
- Uses `@capgo/capacitor-updater` for live updates.
- Gets the current GPS location using `capacitor-exampleplugin`.
- Displays the location on a Leaflet map.
- Has an "Emergency" button that toggles a visual effect.

## How to Use

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the app in your browser:
    ```bash
    npm start
    ```
4.  Build the app for a native platform (iOS or Android):
    ```bash
    npx cap sync
    ```
5.  Open the native project in the corresponding IDE (Xcode or Android Studio):
    ```bash
    npx cap open ios
    ```
    or
    ```bash
    npx cap open android
    ```
6.  Run the app on a device or simulator.

## Plugin Functionality

The main functionality of the app is to test the `capacitor-exampleplugin`. The `home.page.ts` file contains the code that calls the plugin's `getCurrentPosition` method.

The `callAllMethod` function in `home.page.ts` is triggered when the "Location Set" button is clicked. It retrieves the device's current latitude and longitude and then displays these coordinates on a map.

## Capgo Updater

The app is configured to use Capgo for live updates. The `app.component.ts` file listens for the `updateAvailable` event from the `@capgo/capacitor-updater` service. When a new update is available, a notification is displayed to the user, who can then choose to install the update.
