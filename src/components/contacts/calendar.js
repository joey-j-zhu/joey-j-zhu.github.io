import React from "react";

const Calendar = (props) => {
    return (
        <div>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%232d2a34&ctz=America%2FLos_Angeles&src=am9leS5qLnpodUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=OWE1NDUwMDA5ZjBkMDJiMDJlMTA2NDM2OTA2MzQzNjVlZTMwZGRmZGQ1ZGI3YmRlMjVkN2ZkYzkzMjRlYTY2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=am9leWp6aHVAbGJsLmdvdg&color=%232d2a34&color=%232d2a34&color=%232d2a34&color=%232d2a34" 
            style={{
                border:"solid 0px #777", 
                width:1100, 
                height:600, 
                frameborder:"0"}}></iframe>
        </div>
    );
}

export default Calendar;