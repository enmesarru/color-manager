<template>
    <div 
        class="color_box"
        draggable=true
        :id="index" 
        :style="{'background-color': box.backgroundColor}" 
        @contextmenu="clicked"
        @dragstart="onDrag"
        @click="copy_to_clipboard"
        ></div>
</template>

<script>
import { CopyToClipboard } from '../util/index';
import { store } from '../store';

export default {
    name: 'Box',
    props: {
        index: Number,
        box: Object,
        onClicked: Function,
        onDrag: Function
    },
    data() {
        return {
            sharedState: store.state
        }
    },
    methods: {
        clicked(event) {
            this.onClicked({
                id: this.index
            });
            event.preventDefault();
        },
        copy_to_clipboard(event) {
            event.preventDefault();
            CopyToClipboard(this.box.backgroundColor);

            this.$notify({
                group: 'color',
                title: 'Copied',
                text: this.box.backgroundColor
            });

            // Keyboard and mouse combination for gradient process
            if(event.ctrlKey) {
                if(this.box.isSelected()) {
                    store.removeColorFromGradient(this.box.id);
                    this.box.changeSelectedValue();
                    return;
                }
                this.box.changeSelectedValue();
                store.setGradientColor({id: this.box.id, color: this.box.backgroundColor});
            }
        }
    }
}
</script>

<style>
    .color_box {
        width: 22px;
        height: 22px;
    }
</style>
