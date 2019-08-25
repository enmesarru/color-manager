export const store = {
    state: {
        gradientColor: []
    },
    setGradientColor({id, color}) {
        this.state.gradientColor.push({
            id,
            color
        });
    },
    removeColorFromGradient(id) {
        const index = this.state.gradientColor.findIndex(x => x.id === id);
        this.state.gradientColor.splice(index, 1);
    }
};