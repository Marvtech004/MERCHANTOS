# Release APK Build Setup

This guide walks you through setting up signed release APK builds for distribution on Google Play Store or direct installation.

## Step 1: Create a Keystore (One-Time Setup)

The keystore is a file that contains your signing key. **Keep it safe—you'll need it for all future releases.**

```bash
cd frontend/android/app

# Generate keystore with your details
keytool -genkeypair -v -keystore merchantos-release-key.jks -alias merchantos \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Your Name,O=Your Company,L=City,S=State,C=Country"
```

When prompted:
- **Keystore password**: Use a strong password (e.g., 20+ chars, mix uppercase/lowercase/numbers/symbols)
- **Key password**: Same as keystore password (press Enter to use same)

**Save the keystore file securely** (e.g., `~/.android/merchantos-release-key.jks` or similar).

## Step 2: Configure GitHub Secrets

To use the keystore in GitHub Actions, encode it as base64 and add it as a secret:

### On your local machine:

```powershell
# Windows PowerShell
$keystore = [Convert]::ToBase64String([IO.File]::ReadAllBytes('path\to\merchantos-release-key.jks'))
Write-Output $keystore | Out-File -FilePath keystore-base64.txt
# Copy contents of keystore-base64.txt
```

Or on macOS/Linux:
```bash
base64 -i path/to/merchantos-release-key.jks > keystore-base64.txt
cat keystore-base64.txt  # copy the output
```

### Add secrets to GitHub:

1. Go to: https://github.com/Marvtech004/MERCHANTOS/settings/secrets/actions
2. Click **New repository secret** and add these four secrets:

   - **KEYSTORE_BASE64**: (paste the base64-encoded keystore from above)
   - **KEYSTORE_PASSWORD**: (the password you set in Step 1)
   - **KEY_ALIAS**: `merchantos` (the alias you used)
   - **KEY_PASSWORD**: (same as KEYSTORE_PASSWORD)

## Step 3: Build Release APK

To trigger a release build, create a Git tag and push it:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will automatically:
1. Decode the keystore
2. Build a signed release APK
3. Create a GitHub Release with both debug and release APKs

## Step 4: Download the Release APK

1. Go to: https://github.com/Marvtech004/MERCHANTOS/releases
2. Find the release matching your tag (v1.0.0)
3. Download `app-release.apk`

## Step 5: Distribute

### Option A: Google Play Store

1. Create a developer account: https://play.google.com/console
2. Create a new app in Play Console
3. Upload `app-release.apk` to internal testing → closed testing → production
4. Submit for review

### Option B: Direct Distribution

- Share `app-release.apk` file directly
- Users can install via Android or sideload on devices

## Security Notes

- ⚠️ **Never commit the keystore file to Git**
- ⚠️ **Keep the keystore password secure**
- ⚠️ **If keystore is compromised, you'll need a new one for future releases**
- Use a hardware security key or password manager to store the keystore password

## Troubleshooting

**"Keystore not found"**: Ensure keystore path is correct in build command

**"Invalid password"**: Double-check keystore password matches the GitHub secret

**Build fails in CI**: Check that all 4 GitHub secrets are set and have no extra whitespace
