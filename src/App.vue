<template>
  <div id="app">
    <div class="colorboxes">
      <Grid :box_objects="this.grid" :selected_color="colors.hex" />
      <GradientView :colors="this.sharedState.gradientColor"/>
    </div>
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
    <div class="test">
    </div>
    <notifications group="color" position="bottom right" />
  </div>
</template>

<script>
import { Sketch } from 'vue-color';
import Grid from './components/Grid';
import GradientView from './components/GradientView';
import BoxGrid from './models/Models';

import { store } from './store';

var colors = {
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}
export default {
  name: 'app',
  components: {
    'sketch-picker': Sketch,
    Grid,
    GradientView
  },
  created() {
    this.grid = new BoxGrid(760); // 760
  },
  data() {
    return {
      colors,
      sharedState: store.state,
      grid: this.grid,
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
}

#app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
  grid-column-gap: 5px;
  grid-row-gap: 5px; 
  width: 100vw;
  height: 100vh;
}

.colorboxes { 
  grid-area: 1 / 1 / 6 / 5;
  scrollbar-width: none;
  overflow-y: scroll;
}

.recentcolors { 
  grid-area: 1 / 5 / 4 / 6;
  display: flex; 
  flex-direction: column;
}
.color_hint {
  width:100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.color_hint_text {
  color: #FFF;
  font-size: 25px;
}
.colorpicker { 
  grid-area: 4 / 5 / 6 / 6;
}
.test { 
  grid-area: 5 / 5 / 6 / 6; 
}
</style>
