<template>
    <div id="color_grid">
            <BoxContainer 
                :key="index"
                :box="item"
                :index="index"
                :onClicked="clicked"
                v-on:updateFrom="updateFrom"
                v-on:updateTo="updateTo"
                v-for="(item, index) in box_objects.boxes">
            </BoxContainer>
    </div>
</template>

<script>
import BoxContainer from "./BoxContainer";
import { lerpColor } from '../util/index';
import chroma from 'chroma-js';

export default {
    name: 'Grid',
    props: {
        box_objects: Object,
        selected_color: String
    },
    components: {
        BoxContainer
    },
    data() {
        return {
            from: 0,
            to: 1,
        }
    },
    methods: {
        clicked(event) {
            const box = this.box_objects.boxes.find(x => x.id == event.id);
            box.changeBackgroundColor(this.selected_color)
        },
        /* ToDo: Bug-fix -> left-to-right drag doesn't works.
        cuz' when the right-to-left drag trigger, from value will be bigger than to value.
        thus loop wont work well */
        orderColors() {
            const start_box = this.box_objects.boxes.find(x => x.id == this.from);
            const end_box = this.box_objects.boxes.find(x => x.id == this.to);
            let amount = 0;
            let colors = chroma
                .scale([start_box.backgroundColor, end_box.backgroundColor])
                .mode('lch').colors(this.to - this.from);
                
            let start_count = this.from;
            colors.forEach((color) => {
                const box = this.box_objects.boxes.find(x => x.id == start_count);
                box.backgroundColor = color;
                start_count++;
            });
        },
        updateFrom(value) {
            this.from = parseInt(value);
        },
        updateTo(value) {
            this.to = parseInt(value);
            this.orderColors();
        }
    }
}
</script>

<style>
#color_grid {
    width:100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
