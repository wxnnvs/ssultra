## Smartschool Ultra
A basic browser extension with QoL modifications for Smartschool.

---

Built by [Wannes](https://wannesg.be) for the [Smartschool Ultra](https://discord.gg/7nDphk7BSc) project, inspired by [Smartschool++](https://smpp.be) and based off styling by Brecht Van Acker Voorspoels

---

### recommended building process:

1. install web-ext
    ```bash
    npm install -g web-ext    
    ```
2. go into the extension folder and build the extension
    ```bash
    cd extension
    web-ext build
    // or
    web-ext build --overwrite-dest
    ```
3. find build inside extension/web-ext-artifacts

### other option:

run `build.sh` from root of the project