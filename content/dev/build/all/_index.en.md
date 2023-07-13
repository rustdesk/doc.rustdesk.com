---
title: All with Github Actions
weight: 35
---

{{% notice note %}}
This build uses GitHub Actions, you will need a GitHub account, also building can be slow, however this requires no development environment.
{{% /notice %}}

## Make a fork

Goto https://github.com/rustdesk/rustdesk/fork and click "Create fork".

## Set your environment variables (optional)

{{% notice note %}}
You only need to do this if you want to change the default server and public key.

The server URL and key you are using is hidden from other users on Github however they can download your client and connect to your server. If you require a fully private repo you can import the rustdesk client repo using https://github.com/new/import. **If you use a private repo you have limited amounts of builds you can create per month, if you need more you will need to have a paid Github account.**
{{% /notice %}}

On your fork you just created goto "Settings -> Secrets and variables -> Actions".

Click "New repository secret", for the name put RENDEZVOUS_SERVER, for the secret put your servers name/ip address.

Click "Add secret".

Click "New repository secret", for the name put RS_PUB_KEY, for the secret put your servers public key.

Click "Add secret".

## Enable workflows

On your fork you just created goto "Settings -> Actions -> General".

On the right, select "Allow all actions and reusable workflows".

Once workflows are enabled you can goto “Actions”.

On the left, select "Flutter Nightly Build". Then on the right, click "Enable workflow".

Finally you can click "Run workflow" to build the rustdesk clients for all of the supported platforms.

## Enable upload permissions for workflows

On your fork you just created goto "Settings -> Actions -> General".

Scroll down and under Workflow permissions enable "Read and write permissions".

## Download your built packages

After the workflow is done running you can download the packages it built.

Goto the main page of your fork, on the right click "Releases". The packages you just built will show up under "Nightly".
