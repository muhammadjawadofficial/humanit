export default {
    parseImageSrc(type, data) {
        return "data:" + type + ";base64, " + data;
    },
}