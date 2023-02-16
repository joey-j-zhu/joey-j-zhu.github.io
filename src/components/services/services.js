import React, { useEffect, useState } from 'react';
import '../../index.css';

function Services() {
    return (
        <div className="services-section">
            <h2>Services</h2>
            <h2>___</h2>
            <p></p>

            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FLos_Angeles&src=am9leS5qLnpodUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=OWE1NDUwMDA5ZjBkMDJiMDJlMTA2NDM2OTA2MzQzNjVlZTMwZGRmZGQ1ZGI3YmRlMjVkN2ZkYzkzMjRlYTY2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=am9leWp6aHVAbGJsLmdvdg&color=%23E67C73&color=%2333B679&color=%23F09300&color=%23A79B8E" 
            style={{border:"solid 1px #777", width:1200, height:800, frameborder:"0"}}></iframe>
        </div>
    );
}

export default Services;