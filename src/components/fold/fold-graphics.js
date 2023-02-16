
const FoldGraphics = ({
    system,
}) => {
    var c = document.getElementById("fold-graphics");
    var ctx = c != null ? c.getContext('2d') : null;
    //console.log(ctx);

    if (ctx != null) {
        ctx.beginPath();
        ctx.arc(95 + system, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
        //console.log("fold graphics rendered");
    }
};


export default FoldGraphics;


