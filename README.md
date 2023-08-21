# We need your help to translate this document to your native language

[**Preview**](https://rustdesk.com/docs/)

Install [hugo](https://gohugo.io/getting-started/installing/)

The clone this repo
`git clone https://github.com/rustdesk/doc.rustdesk.com.git`

Change to this folder:

`cd docs.rustdesk.com`

Then run the following commands:
```
hugo new site quickstart
cd quickstart
git init
git clone https://github.com/matcornic/hugo-theme-learn themes/hugo-theme-learn
echo "theme = 'hugo-theme-learn'" >> hugo.toml
hugo server
```

Make any changes and then reupload.
