# We need your help to translate this document to your native language

[**Preview**](https://rustdesk.com/docs/)

## Preview and build at local

1. Install [Hugo](https://gohugo.io/installation)

2. Clone the repo, if you want to submit changes, please [Fork](https://github.com/rustdesk/doc.rustdesk.com/fork) and clone your fork.

```sh
git clone --recursive https://github.com/rustdesk/doc.rustdesk.com.git
```

3. Change to the folder:

```sh
cd docs.rustdesk.com
```

4. Start Hugo Server

```sh
hugo server
```

If you found any bugs, stop the server and delete `public` folder and run again.

You could make changes and than push and create PR.

## Update branch/fork

Sync your fork at GitHub UI or create new branch that points to upstream.

Make sure you've checkout to right branch, and run:

```sh
git pull --recurse-submodules
```

If you're cloned from here, just run the command.
