
const FoldGraphics = ({
    system,
}) => {
    var c = document.getElementById("fold-graphics");
    var ctx = c != null ? c.getContext('2d') : null;

    if (ctx != null) {
        ctx.beginPath();
        ctx.arc(95 + system.timer, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
    }
};


export default FoldGraphics;


