<template lang="pug">
.markdown__inner(@drop="loadText" @dragenter="cancelEvent" @dragover="cancelEvent")
  textarea#editor(:value="mdData" @input="update" @scroll="syncScroll")
  #previewer(v-html="compileMarkdown")
</template>
<script lang="babel">
import _ from "lodash";
import hljs from "highlightjs";
import mila from "markdown-it-link-attributes";
import mic from "markdown-it-container";

const md = require("markdown-it")({
  html: true,
  highlight: function (str, lang) {
    return `<pre class="hljs" data-language="${lang.split(":")[1]}"><code lang="${lang.split(":")[0]}">${hljs.highlightAuto(str).value}</pre></code>`;
  },
  linkify: true,
});

md.linkify.add('@', {
  validate: function (text, pos, self) {
    var tail = text.slice(pos);

    if (!self.re.twitter) {
      self.re.twitter =  new RegExp(
        '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
      );
    }
    if (self.re.twitter.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '@') {
        return false;
      }
      return tail.match(self.re.twitter)[0].length;
    }
    return 0;
  },
  normalize: function (match) {
    match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
  }
});
md.use(mila, {
  target: '_blank',
});
md.renderer.rules.hr = (token, idx) => {
  return '</div><div class="slidePage">';
}


export default {
  data() {
    return {
      mdData: "",
      mdOpts: {
        // sanitize: true,
      },
      $previewer: null,
    };
  },
  methods: {
    update: _.debounce(function(evt) {
      this.mdData = evt.target.value;
    }, 340),
    loadText: function(evt) {
      evt.preventDefault();
      // ファイルは複数ドロップされる可能性がありますが, ここでは 1 つ目のファイルを扱います.
      const file = evt.dataTransfer.files[0];
      // ファイルの内容は FileReader で読み込みます.
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (evt) => {
        this.mdData = evt.target.result;
      }
    },
    cancelEvent: function(evt) {
      evt.preventDefault();
      return false;
    },
    syncScroll: function(evt) {
      const heightRate = this.$previewer.scrollHeight / evt.target.scrollHeight;
      this.$previewer.scrollTop = evt.target.scrollTop * heightRate;
    },
  },
  computed: {
    compileMarkdown() {
      return `<div class="slidePage">${md.render(this.mdData)}</div>`;
    }
  },
  mounted: function() {
    this.$previewer = document.getElementById("previewer");
  },
}
</script>
<style lang="postcss">
@import "highlightjs/styles/monokai-sublime";
.markdown__inner {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  height: 100vh;
}
#editor {
  display: block;
  flex: 1;
  width: 50%;
  max-height: 100vh;
  resize: none;
}
#previewer {
  display: block;
  flex: 1;
  width: 50%;
  max-height: 100vh;
  overflow: auto;
}
img {
  max-width: 100%;
  display: block;
}
</style>
