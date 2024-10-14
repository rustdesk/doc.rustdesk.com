 #!/usr/bin/env bash
 npm run build
 cd dist
 ln -s pricing/index.html pricing.html
 ln -s terms/index.html terms.html
 ln -s success/index.html success.html
 ln -s cancel/index.html cancel.html
 ln -s privacy/index.html privacy.html
 ln -s team/index.html team.html
 ln -s careers/index.html careers.html
 ln -s open-source/index.html open-source.html
 cp -rf ../zh ./
 tar czf x *
 scp x ot:/tmp/
 ssh ot "sudo tar xzf /tmp/x -C /var/www/html/v3 && /bin/rm /tmp/x && sudo chown www-data:www-data /var/www/html/v3 -R"
 /bin/rm x
 cd -
