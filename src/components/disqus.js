import React from "react"
import styled from "styled-components"

class Disqus extends React.Component {
  render() {

    var disqus_config = function () {
        this.page.url = 'http://localhost:8000/';
        this.page.identifier = 'test';
    };

    var go = (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://zweishar.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    
    return (
        <div>
            <div id="disqus_thread"></div>
            {disqus_config}
            {go}
        </div>
    )
  }

}

export default Disqus