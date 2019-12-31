<template>
  <div id="app">
    <div class="colorboxes">
      <Grid :box_objects="this.grid" :selected_color="colors.hex" />
      <GradientView /> <!-- :colors="this.sharedState.gradientColor" -->
    </div>
    <div class="colortools">
      <div class="recentcolors">
        <sketch-picker v-model="colors" />
        <div
          class="color_hint"
          v-bind:style="{ 'background-color': colors.hex }">
            <span
              class="color_hint_text">
              {{colors.hex}}
            </span>
        </div>
      </div>
      <div class="colorpicker">
      </div>
      <div class="tools">
        <button class="btn-tools" @click="exportScheme">Export Scheme</button>
        <button class="btn-tools" @click="scrollToView">Scroll To {{ scrolled ? "View" : "Boxes" }}</button>
      </div>
      <notifications group="color" position="bottom right" />
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color';
import Grid from './components/Grid';
import GradientView from './components/GradientView';
import BoxGrid from './models/Models';
import { saveAs } from 'file-saver';

const colors = {
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
};

export default {
  name: 'app',
  components: {
    'sketch-picker': Sketch,
    Grid,
    GradientView
  },
  created() {
    this.grid = new BoxGrid(777); // 760
  },
  data() {
    return {
      colors,
      grid: this.grid,
      scrolled: false
    }
  },
  methods: {
    scrollToView() {
      var container = document.querySelector('.colorboxes');
      var color_view = document.getElementById('color_view');

      container.scrollTop = this.scrolled ? 0 : color_view.offsetTop;

      this.scrolled = !this.scrolled;
    },
    exportScheme() {
      const data = this.grid.export();
      if(data == "[]") return;
      const blob = new Blob([], {type: "application/json"});
      saveAs(blob, "scheme");
    }
  }
}
</script>

<style>
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

*{
  padding: 0;
  margin: 0;
}

body {
  background: #252525;
  font-family: san-serif;
}

#app {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "view tools";
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  width: 100vw;
  height: 100vh;
}

.colorboxes {
  scrollbar-width: none;
  overflow-y: scroll;
}

.recentcolors {
  display: flex;
  flex-direction: column;
}

.color_hint {
  width:100%;
  height: 100%;
  min-height: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
}

.color_hint_text {
  color: #FFF;
  font-size: 25px;
}

.btn-tools {
  border: 0;
  margin-top: 5px;
  display: inline-block;
  padding: 10px;
  width: 100%;
  background: #BD10E0;
  color: white;
  text-align: center;
  text-decoration: none;
}

.btn-tools:hover {
  background: #84099C;
}
</style>
