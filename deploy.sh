#!/usr/bin/env bash
rm -rf public/*
hugo --minify
# Bing flags meta descriptions outside ~120-160 characters; see the script.
node scripts/fit-meta-descriptions.mjs public
cd public; tar czf x *
scp x ot:/tmp/
ssh ot "sudo rm -rf /var/www/html/rustdesk.com/docs/* && sudo tar xzf /tmp/x -C /var/www/html/rustdesk.com/docs/ && /bin/rm /tmp/x && sudo chown www-data:www-data /var/www/html/rustdesk.com/docs/ -R"
/bin/rm x
cd -
