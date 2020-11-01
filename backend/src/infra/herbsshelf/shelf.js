const fs = require('fs')
const path = require('path')

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

const getCssStyle = () => {
  const cssFilePath = path.resolve(__dirname, 'shelf.css')
  return fs.readFileSync(cssFilePath, "utf-8")
}

const html = (shelfData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Herbs Shelf</title>
  </head>
  <style>
    ${getCssStyle()}
  </style>
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
