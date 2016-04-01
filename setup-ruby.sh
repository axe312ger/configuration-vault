#!/bin/bash

# Install RVM
if which rvm >/dev/null
then
  echo "RVM is already installed."
else
  echo "Installing RVM..."
  \curl -L https://get.rvm.io | bash -s stable --ruby

  source ~/.rvm/scripts/rvm
fi

# Speed up gem installation by disabling documentation
echo "gem: --no-document" >> ~/.gemrc

# Update RubyGems
gem update --system 

# Update all stale gems
gem update

# Install Bundler
if which bundler >/dev/null
then
  echo "Bundler is already installed."
else
  echo "Installing Bundler..."
  gem install bundler
fi

# Install Nokogiri
if which nokogiri >/dev/null
then
  echo "Nokogiri is already installed."
else
  echo "Installing Nokogiri..."
  gem install nokogiri
fi

# Install Rails
echo "Installing Ruby on Rails..."
# Create Gemset
rvm use ruby-2.2.3@rails4.2 --create

# Install Rails
gem install rails
rails -v

