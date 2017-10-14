import React from "react"
import styled from "styled-components"

class Disqus extends React.Component {
  render() {

    var disqus_config = function () {
        this.page.url = 'http://localhost:8000/';
        this.page.identifier = 'test';
    };

    var go = (function() {
        if (typeof document !== 'undefined') {
            var d = document, s = d.createElement('script');
            s.src = 'https://zweishar.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        }
    })();
    
    // return (
    //     <div>
    //         <div id="disqus_thread"></div>
    //         {disqus_config}
    //         {go}
    //     </div>
    // )

    return {
        <div dangerouslySetInnerHTML={{__html:
            <div id="disqus_thread"></div>
            <script>
            var disqus_config = function () {
            this.page.url = 'http://localhost:8000/';
            this.page.identifier = 'test';
            };
            */
            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://EXAMPLE.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
            </script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        }} />
    }
    
  }

}

export default Disqus