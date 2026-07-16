# Connecting Wizarr

If you use [Wizarr](https://wizarr.dev/) for invite links and account
creation, you can wire it together with Jellyfin Onboarding so that
after someone creates their account, they land straight into this
wizard to get their device set up.

Wizarr's own step-management system has changed across versions — newer
versions manage steps through a database-backed admin UI, while older
versions support importing/exporting steps as JSON. Use whichever
matches your version.

## Option A: Newer Wizarr (database-backed steps)

1. In your Wizarr admin panel, go to **Settings → Wizard**
2. Add a new step for the **Jellyfin** server type
3. Set **Category** to **"After Invite Acceptance"** (post-invite)
4. Use this content:

   **Title:**
   ```
   Get set up on your device
   ```

   **Markdown:**
   ```
   ## 🚀 You're all set!

   Your account is ready. The last step is getting Jellyfin installed
   and connected on your device — we've built a quick guided setup
   that detects your device automatically and walks you through it.

   [➡️ Continue Setup](https://your-onboarding-domain/){:target="_blank" .btn}
   ```

5. Replace `https://your-onboarding-domain/` with wherever you deployed
   Jellyfin Onboarding (e.g. `https://watch.yourdomain.com/`)
6. Save. This step will now show right after someone finishes creating
   their account through Wizarr.

## Option B: Older Wizarr (JSON step import)

If your Wizarr version still supports importing steps from a file, you
can use [`wizard_steps_jellyfin.json`](wizard_steps_jellyfin.json) in
this folder as a starting point:

1. Open `wizard_steps_jellyfin.json` and replace
   `https://your-onboarding-domain/` with your actual deployed URL
2. Import it through Wizarr's step management UI (look for an
   import/restore option under wizard/step settings)
3. This adds two steps: a brief "what is Jellyfin" welcome step, and
   the "get set up on your device" step that links to your wizard

## The reverse direction

You don't have to route people through Wizarr first. Jellyfin
Onboarding can also be the front door — see the "Connecting Wizarr"
section in the main [README](../../README.md#connecting-wizarr) for
sending people to `https://your-onboarding-domain/?invite=CODE`
instead of a raw Wizarr link.
