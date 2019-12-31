<template>
    <div id="color_view">
        <div 
            class="view" 
            :style="{'background': combineColors}"
            v-show="viewState"></div>

        <div 
            class="view box_view"
            v-show="viewState == false">

            <div
                class="box_item"
                :key="index"
                v-for="(item, index) in sharedState.gradientColor"
                :style="{'background-color': item.color}">
                    <strong> {{ item.color }} </strong>
            </div>

        </div>
        
        <div
            class="view_button"
            @click="viewState = !viewState">
            {{ viewState ? "Gradient View" : "Colorbox View"}}
        </div>
    </div>
</template>

<script>
import { store } from '../store';

export default {
    name: 'GradientView',
    data() {
        return {
            viewState: true,
            sharedState: store.state,
        }
    },
    computed: {
        combineColors() {
            if(this.sharedState.gradientColor.length == 0) 
                return;
            if(this.sharedState.gradientColor.length == 1)
                return this.sharedState.gradientColor[0].color;
            return `linear-gradient(-90deg, 
                ${this.sharedState.gradientColor.reverse().map(x => x.color).join(",")})`;
        }
    }
}
</script>

<style>
#color_view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.view {
    height: 100%;
}
.box_view {
    display: flex;
}
.box_view > * {
    flex-grow: 1;
}
.box_item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.view_button {
    width: 100%;
    color: #ffffff;
    background-color: #07B90E;
    padding: 10px;
    text-align: center;
    transition: background-color 0.5s;
}
.view_button:hover {
    background-color: #0AE912;
}
</style>