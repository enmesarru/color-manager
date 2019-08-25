import {createArray} from '../util/index';

class Box {
    constructor(t_id, t_backgroundColor = '#000', t_selected = false) {
        this.id = t_id;
        this.backgroundColor = t_backgroundColor;
        this.selected = t_selected;
    } 

    id() {
        return this.id;
    }

    backgroundColor() {
        return this.backgroundColor;
    }

    changeBackgroundColor(color) {
        this.backgroundColor = color;
    }

    isSelected() {
        return this.selected;
    }

    changeSelectedValue() {
        this.selected = !this.selected;
    }
}

export default class BoxGrid {
    constructor(size = 25) {
        this.boxes = createArray(size)
            .map((box, index) => new Box(index));
    }
}
