# Web Junk

A repository for experimenting with and storing my random web junk.

### Usage notes

It's not advised to load the HTML file locally, instead, load them from a web server. However, sometimes it's quicker and easier to load the files locally, from say a folder on your desktop. If you enjoy living life on hte edge, keep reading for tips on you can load the files locally in Firefox and Chrome.

1. If running locally in Firefox, you'll need to set 'security.fileuri.strict_origin_policy' to 'false' within Firefox's about:config editor.

2. If running locally in Chrome, you'll need to start Chrome with the '--allow-file-access-from-files' argument. On OS X, the start command is:

    open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files