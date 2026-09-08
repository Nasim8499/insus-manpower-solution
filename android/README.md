# Android wrapper

This directory is the generated Trusted Web Activity wrapper for the live INSUS PWA.

The GitHub Actions workflow creates a temporary signing key, builds the release APK with
Gradle, signs it, publishes it to `public/downloads/`, and writes the matching Digital Asset
Links file to `public/.well-known/assetlinks.json`.
