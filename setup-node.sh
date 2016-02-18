# Make sure npm is installed
if ! which npm >/dev/null
then
  echo "Node & npm needs to be installed before you run this script!"
  exit
fi

npm install -g babel-core eslint git-stats knex npm-check-updates wifi-password
