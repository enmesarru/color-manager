export const createArray = length => Array.from(new Array(length));

export const CopyToClipboard = (color) => {
    navigator.clipboard.writeText(color)
        .then(() => {
            console.log("Copied")
        }).catch((error) =>  {
            console.log(error);
        });
}