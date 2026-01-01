#!/bin/bash
# setup_vm.sh

echo "========================================================"
echo "      Setting up your VM for Deployment"
echo "========================================================"

# 1. Generate SSH Key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "[*] Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -C "deploy@website-server" -f ~/.ssh/id_rsa -N ""
else
    echo "[!] SSH key already exists. Skipping generation."
fi

# 2. Authorize the key (for GitHub Action SSH access)
echo "[*] Authorizing key..."
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 3. Add GitHub to known_hosts (CRITICAL: prevents "Are you sure?" prompt hang)
echo "[*] Adding GitHub to known_hosts..."
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 4. Create the destination directory
echo "[*] Creating web directory (~/new-website)..."
mkdir -p ~/new-website

# 5. Print info for GitHub
echo ""
echo "========================================================"
echo "STEP 1: GitHub Secrets (You might have done this)"
echo "--------------------------------------------------------"
echo "SSH_HOST: 34.72.244.129"
echo "SSH_USERNAME: $(whoami)"
echo "SSH_KEY: (The Private Key printed below)"
echo "--------------------------------------------------------"
echo ""
echo "STEP 2: GitHub Deploy Keys (NEW STEP!)"
echo "Go to Settings -> Deploy Keys -> Add Deploy Key"
echo "Title: VM Key"
echo "Key: (Copy the PUBLIC KEY below)"
echo "--------------------------------------------------------"
cat ~/.ssh/id_rsa.pub
echo "--------------------------------------------------------"
echo ""
echo "STEP 3: Private Key for Secrets (If needed again)"
echo "--------------------------------------------------------"
# cat ~/.ssh/id_rsa  # Uncomment if you need to see only the private key again
echo "(Run 'cat ~/.ssh/id_rsa' to see the private key if you haven't added it to Secrets yet)"
echo "========================================================"
