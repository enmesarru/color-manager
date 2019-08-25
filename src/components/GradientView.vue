<template>
    <div id="color_view">
        <div 
            class="view" 
            :style="{'background-image': this.combineColors()}"
            v-show="viewState"></div>

        <div 
            class="view box_view"
            v-show="viewState == false">

            <div
                class="box_item"
                :key="index"
                v-for="(item, index) in colors"
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
export default {
    name: 'GradientView',
    props: {
        colors: Array
    },
    data() {
        return {
            viewState: true
        }
    },
    methods: {
        combineColors() {
            if(this.colors.length == 0) 
                return;
            return `linear-gradient(-90deg, 
                ${this.colors.reverse().map(x => x.color).join(",")})`;
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
    background-color: #FFC25C;
    padding: 10px;
    text-align: center;
    transition: background-color 0.5s;
}
.view_button:hover {
    background-color: #F5A623;
}
</style>