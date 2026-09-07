## Smartschool Ultra
A basic browser extension with QoL modifications for Smartschool.

---

Built by [Wannes](https://wannesg.be) for the [Smartschool Ultra](https://discord.gg/GZyNYQJfKS) project, inspired by [Smartschool++](https://smpp.be) and based on styling by Brecht Van Acker Voorspoels

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

---

### Licensing

- Code in this repository is licensed under **GNU GPLv3** (`/LICENSE`).
- Style assets in `/extension/styles/ssu` are licensed under
  **CC BY-NC 4.0** (`/LICENSES/CC-BY-NC-4.0.txt` and `/extension/styles/LICENSE`).
- The CC BY-NC 4.0 style assets include a **NonCommercial** restriction; commercial
  use of those assets is not permitted under that license.
- Attribution details and modification notes for style sources are in `/NOTICE`.

---

### Todo:
- [x] Implement dark theme
- [ ] Fix visual bugs in dark theme
- [ ] release 1.0.0
- [ ] Add theme customization (accent colors, background image, ...)
- [ ] Add automatic accent colors based on background image
- [ ] Small games (tetris, snake, pong, breakout, ...)
- [ ] ... ?
