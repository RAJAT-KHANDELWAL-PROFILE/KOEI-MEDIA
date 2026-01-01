# Deployment Setup Guide

This guide helps you set up automatic deployment for your website on your Google Cloud VM (`website-server`).

## 1. Push Code to GitHub

I have already configured your local repository to point to `https://github.com/RAJAT-KHANDELWAL-PROFILE/KOEI-MEDIA`.
If the push command failed (likely due to missing login), please run this in your terminal:

```bash
git push -u origin main
```

You may be prompted to log in.

## 2. Prepare Your VM

I have created a script `setup_vm.sh` that handles all the complex work (generating keys, setting permissions) for you.

1.  **Open SSH**: Click the "SSH" button in your Google Cloud Console for `website-server`.
2.  **Run the Setup**:
    Since the code isn't on the VM yet, copy-paste these commands into the SSH window to run the setup manually:

    ```bash
    # Generate Key
    ssh-keygen -t rsa -b 4096 -C "deploy@website-server" -f ~/.ssh/id_rsa -N ""

    # Authorize Key
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys

    # Show the Key (You need this for the next step)
    cat ~/.ssh/id_rsa
    ```

3.  **Get Public IP**:
    Your VM's external IP is `34.72.244.129`. This will be your `SSH_HOST`.

## 3. Configure GitHub Secrets

1.  Go to your repo: [RAJAT-KHANDELWAL-PROFILE/KOEI-MEDIA](https://github.com/RAJAT-KHANDELWAL-PROFILE/KOEI-MEDIA)
2.  Click **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
3.  Add the following secrets:
    - `SSH_HOST`: `34.72.244.129`
    - `SSH_USERNAME`: `rajat` (or your VM username, usually shown in the SSH terminal prompt)
    - `SSH_KEY`: Paste the **Private Key** you copied from the terminal output above (include `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`).

## 4. Push Code to Start Deployment

Now that Secrets are set up, you need to push the code from your computer to GitHub. I have already configured the remote.

**Run this command in your local terminal (VS Code):**

```bash
git push -u origin main
```

_Note: If it asks for a password, you may need to use a GitHub Personal Access Token if you don't have SSH set up locally, or sign in via the browser popup if available._

Once pushed, go to the **Actions** tab in GitHub to see your deployment running!

## 4. Invite Your Developer Friend

To give your friend full access to change the code:

1.  Go to **Settings** > **Collaborators**.
2.  Click **Add people**.
3.  Enter their GitHub username or email.
4.  Once they accept, they can push to this repo, and the changes will automatically deploy to your VM!

## 5. Verify Deployment

Once you've done this, any push to `main` will run the deploy script.
On the VM, your new website will be located in `~/new-website`.

> [!NOTE] > **Web Server Configuration**: since you mentioned "keeping it separate", the files are just sitting in the `~/new-website` folder.
> To view this new site in your browser, you will need to configure your web server (Nginx or Apache) to serve this folder, perhaps on a different port (like 8080) or a different subdirectory.
