const generateShelfData = (usecases) => {
  let shelfData = []
  for (const [ucsGroup, ucs] of Object.entries(usecases)) {
    let useCases = []
    for (const uc of ucs) {
      useCases.push(uc.doc())
    }
    shelfData.push({ section: ucsGroup, useCases })
  }
  return shelfData
}

const html = (shelfData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Herbs Shelf</title>

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap");

      /* color definition */
      :root {
        --primary: #958b6e;
        --dark: #3f3f3f;
        --light: #f1f1f1;
        --lighter: #fafafa;
      }

      /* browser default configuration reset */
      * {
        padding: 0;
        margin: 0;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
      }

      body {
        background-color: var(--primary);
        color: var(--dark);
        font-family: "Open Sans", sans-serif;
      }

      main {
        background-color: var(--lighter);
        max-width: 1200px;
        min-width: 1200px;
        margin: 0 auto;
        min-height: 100vh;
        position: relative;
        display: flex;
      }

      nav {
        width: 30%;
        height: 100%;
        min-height: 100vh;
        padding-bottom: 50px;
        position: relative;
        background-color: var(--light);
      }

      .contribute {
        position: fixed;
        width: calc(1200px * 0.3);
        padding: 20px;
        display: block;
        text-align: center;
        bottom: 0;

        color: var(--dark);
        background-color: var(--light);
      }

      .text-center {
        text-align: center;
      }

      .logo {
        width: 250px;
        max-width: 100%;
      }

      section.content {
        width: 70%;
        height: 100%;
        position: relative;
        padding: 30px;
      }

      h1,
      h2,
      h3 {
        font-weight: 400;
      }

      .shelf-title {
        margin-bottom: 40px;
        font-size: 48px;
        font-weight: lighter;
        text-align: center;
      }

      .arrow-to-nav {
        width: 150px;
        margin-top: 100px;
        color: var(--primary);
        animation: arrowMove infinite 2s alternate ease-in-out;
      }

      @keyframes arrowMove {
        from {
          filter: drop-shadow(0px 0px 0px var(--dark));
          transform: translateX(0px);
        }
        to {
          filter: drop-shadow(18px 0px 0px var(--dark));
          transform: translateX(50px);
        }
      }

      ul.uc-nav,
      ul.uc-list-nav,
      ul.steps-list {
        list-style: none;
        position: relative;
        padding: 20px;
      }

      ul.if-steps-list {
        list-style: none;
        position: relative;
        padding: 0 20px;
      }

      ul.uc-nav li {
        margin-bottom: 10px;
      }

      .icon {
        position: relative;
        padding-left: 30px;
      }

      .i-folder::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTAgNEg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yaC04bC0yLTJ6Ii8+PC9zdmc+");
      }

      .i-folder-open::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjAgNmgtOGwtMi0ySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAxOGMwIDEuMS45IDIgMiAyaDE2YzEuMSAwIDItLjkgMi0yVjhjMC0xLjEtLjktMi0yLTJ6bTAgMTJINFY4aDE2djEweiIvPjwvc3ZnPg==");
      }

      .i-code::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik05LjQgMTYuNkw0LjggMTJsNC42LTQuNkw4IDZsLTYgNiA2IDYgMS40LTEuNHptNS4yIDBsNC42LTQuNi00LjYtNC42TDE2IDZsNiA2LTYgNi0xLjQtMS40eiIvPjwvc3ZnPg==");
      }

      .i-play::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGc+PHJlY3QgaGVpZ2h0PSIyIiB3aWR0aD0iOSIgeD0iMTMiIHk9IjciLz48cmVjdCBoZWlnaHQ9IjIiIHdpZHRoPSI5IiB4PSIxMyIgeT0iMTUiLz48cmVjdCBoZWlnaHQ9IjIiIHdpZHRoPSI2IiB4PSIxNiIgeT0iMTEiLz48cG9seWdvbiBwb2ludHM9IjEzLDEyIDgsNyA4LDExIDIsMTEgMiwxMyA4LDEzIDgsMTciLz48L2c+PC9nPjwvc3ZnPg==");
      }

      .i-if::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTQgNGwyLjI5IDIuMjktMi44OCAyLjg4IDEuNDIgMS40MiAyLjg4LTIuODhMMjAgMTBWNHptLTQgMEg0djZsMi4yOS0yLjI5IDQuNzEgNC43VjIwaDJ2LTguNDFsLTUuMjktNS4zeiIvPjwvc3ZnPg==");
      }

      .i-then::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHg9IjAiLz48L2c+PGc+PGc+PGc+PHBhdGggZD0iTTMsOC40MWw5LDlsNy03VjE1aDJWN2gtOHYyaDQuNTlMMTIsMTQuNTlMNC40MSw3TDMsOC40MXoiLz48L2c+PC9nPjwvZz48L3N2Zz4=");
      }

      .selected {
        font-weight: 600;
      }

      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <main id="shelf">
      <nav>
        <div class="text-center">
          <img
            class="logo"
            src="https://avatars3.githubusercontent.com/u/60399865"
            alt="HerbsJS Logo"
          />
        </div>
        <ul class="uc-nav">
          <li
            v-for="(item,index) in shelfData"
            :key="item.section"
            class="icon"
            :class="[navOpen !== index ? 'i-folder' : 'i-folder-open']"
          >
            <span @click="openNav(index)">{{ item.section }}</span>
            <ul class="uc-list-nav" v-if="navOpen === index">
              <li
                v-for="(uc, ucIndex) in item.useCases"
                :key="uc.description"
                class="icon i-code"
                :class="{selected : page === ucIndex }"
                @click="openPage(ucIndex)"
              >
                {{uc.description}}
              </li>
            </ul>
          </li>
        </ul>
        <div class="contribute">
          <a href="https://github.com/herbsjs">
            <h3>Contribute on Github</h3>
          </a>
        </div>
      </nav>
      <section class="content" v-if="page < 0">
        <h1 class="shelf-title">Herbs Shelf</h1>
        <h2>Welcome to the shelf!</h2>
        <p>
          This is a self-generate documentation, here you can see all the flow
          of information in the application.
        </p>
        <p>
          You can use the lateral panel to navigate into
          <strong>Use Cases</strong> of this application.
        </p>
        <div class="arrow-to-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            fill="black"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
        </div>
      </section>
      <section class="content" v-else>
        <h1 class="shelf-title">Herbs Shelf</h1>
        <h1>{{selectedPage.description}}</h1>
        <h3>Steps:</h3>

        <ul class="steps-list">
          <template v-for="step in selectedPage.steps">
            <template v-if="step.type === 'if else'">
              <ul class="if-steps-list">
                <li class="icon i-if">[if] {{step.if.description}}</li>
                <li class="icon i-then">[then] {{step.then.description}}</li>
                <li class="icon i-then">[else] {{step.else.description}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="icon i-play">{{step.description}}</li>
            </template>
          </template>
        </ul>
      </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      var shelf = new Vue({
        el: "#shelf",
        data: {
          page: -1,
          navOpen: -1,
          selectedPage: {},
          shelfData: ${JSON.stringify(shelfData)},
        },
        methods: {
          openNav: function (value) {
            this.navOpen = this.navOpen === value ? -1 : value
            this.page = -1
            this.$forceUpdate()
          },
          openPage: function (value) {
            this.page = this.page === value ? -1 : value
            this.selectedPage = this.shelfData[this.navOpen].useCases[
              this.page
            ]
            this.$forceUpdate()
          },
        },
      })
    </script>
  </body>
</html>
`

function renderShelfHTML(usecases) {
  const shelfData = generateShelfData(usecases)
  return html(shelfData)
}

module.exports = renderShelfHTML
