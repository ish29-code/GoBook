Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.hostname = "gobook-vm"

  config.vm.network "forwarded_port", guest: 8080, host: 8080    # Go backend
  config.vm.network "forwarded_port", guest: 5173, host: 5173    # React frontend
  config.vm.network "forwarded_port", guest: 8002, host: 8002    #itinerary-api
  config.vm.network "forwarded_port", guest: 8003, host: 8003    #price
  config.vm.network "forwarded_port", guest: 8004, host: 8004    #geo-api

  config.vm.provision "shell", path: "provision.sh"

  config.vm.synced_folder "Booking app/gobook", "/home/vagrant/gobook"


  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = 2
  end
end

