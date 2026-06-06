# Building an Android APK with Capacitor

This guide prepares the `frontend` Vite app for Capacitor and shows how to generate an APK.

Prerequisites
- Node.js and npm installed
- Android Studio + Android SDK installed
- Java JDK installed

Steps

1. Install Capacitor packages (run in `frontend`):

```bash
cd frontend
npm install @capacitor/core @capacitor/cli --save
```

2. Build the web assets:

```bash
npm run build
```

3. Initialize Capacitor (first-time only):

```bash
npx cap init MerchantOS com.marvtech.merchantos --web-dir=dist
```

4. Add Android platform:

```bash
npx cap add android
```

5. Sync web assets to native project:

```bash
npx cap sync android
```

6. Open the Android project in Android Studio and build the APK:

```bash
npx cap open android
# then in Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

Alternative: build from CLI (release APK):

```bash
cd android
./gradlew assembleRelease
# on Windows use gradlew.bat assembleRelease
```

Notes
- You must sign the release APK with your keystore before distribution.
- For debugging, you can run the app on an emulator or attached device from Android Studio.
