<template>
    <div class="box_container"
        @drop="drop"
        @dragover="allowDrop"
        :id="`box_${index}`"
        :style="{'border-color': box.isSelected() ? '#F5A623' : ''}">
        <Box
            :key="index"
            :index="index" 
            :onClicked="onClicked"
            :onDrag="drag"
            :box="box"/>
    </div>
</template>

<script>
import Box from "./Box";

export default {
    name: 'BoxContainer',
    props: {
        box: Object,
        index: Number,
        onClicked: Function,
        updateFrom: Event,
        updateTo: Event
    },
    components: {
        Box
    },
    methods: {
        allowDrop(event) {
            event.preventDefault()
        },
        drag(event) {
            event.dataTransfer.setData("text", event.target.id);
            this.$emit("updateFrom", event.target.id);
        },
        drop(event) {
            event.preventDefault();
            this.$emit("updateTo", event.target.id);
        }
    }
}
</script>

<style>
    .box_container {
        width: 30px;
        height: 30px;
        border: 1px solid #32ff6a;
        display: flex;
        justify-content: center;
        align-items: center;
        transition-duration: 0.3s;
    }

    .box_container:hover {
        background-color: #8e87d6;
    }
</style>
