#!/bin/bash
# setup_vm.sh

echo "========================================================"
echo "      Setting up your VM for Deployment"
echo "========================================================"

# 1. Generate SSH Key if not exists (No passphrase for automation)
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "[*] Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -C "deploy@website-server" -f ~/.ssh/id_rsa -N ""
else
    echo "[!] SSH key already exists. Skipping generation."
fi

# 2. Authorize the key (allows self-login for testing and GitHub action login)
echo "[*] Authorizing key..."
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 3. Create the destination directory
echo "[*] Creating web directory (~/new-website)..."
mkdir -p ~/new-website

# 4. Print info for GitHub
echo ""
echo "========================================================"
echo "SUCCESS! Now go to GitHub Secrets and add these details:"
echo "--------------------------------------------------------"
echo "Name: SSH_HOST"
echo "Value: 34.72.244.129"
echo ""
echo "Name: SSH_USERNAME"
echo "Value: $(whoami)"
echo ""
echo "Name: SSH_KEY"
echo "Value: (Copy the block below, from BEGIN to END)"
echo "--------------------------------------------------------"
cat ~/.ssh/id_rsa
echo "--------------------------------------------------------"
echo "========================================================"
