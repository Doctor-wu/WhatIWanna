#!/bin/bash
WEB_PATH='/www/wwwroot/root/'$1
WEB_USER='root'
WEB_USERGROUP='root'
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git pull
git checkout master
echo "changing permissions..."
cnpm i
echo "installing dependency..."
forever restartall
echo "restarting serves.."
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo "Finished."
