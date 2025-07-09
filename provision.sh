#!/bin/bash

echo "Updating packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "Installing Go (v1.20.5)..."
wget https://go.dev/dl/go1.20.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.20.5.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> /home/vagrant/.bashrc
export PATH=$PATH:/usr/local/go/bin

echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo systemctl enable mongod
sudo systemctl start mongod

# Optional: Verify MongoDB is running
if systemctl status mongod | grep -q "active (running)"; then
     echo "MongoDB is running."
else
     echo "MongoDB failed to start."
fi

echo "Setup complete. Run './start-all.sh' after 'vagrant ssh'."
