import React, { useState} from 'react'
import './Home.css';
import { CopyToClipboard } from "react-copy-to-clipboard";

const API_KEY = process.env.REACT_APP_BITLY_TOKEN

export default function Home() {
    const [longURL, setLongUrl] = useState("");
    const [shortLink, setShortLink] = useState({});
    const [active, setActive] = useState(false);
    const [copy, setCopy] = useState(false);
    const [response, setResponse] = useState('')


    // Fetching API from endpoint.
    async function handleUrlSubmit(e) {
        e.preventDefault();
        await fetch("https://api-ssl.bitly.com/v4/shorten", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            long_url: longURL,
            domain: "bit.ly",
          }),
        })
          .then((res) => {
            console.log(res)
            setResponse(res)
            return res.json()
          })
          .then(data => {
            setShortLink(data);
            console.log(data);
            setActive(true);
          });
      }

      // Reseting the UI
    let  handleReset = () =>{
        window.location.reload();
      }

  return (
    <div className='home'>
       <h2 className='heading'>  URL Shortner Application </h2>
       <form onSubmit={handleUrlSubmit} data-testid = "form">
       <input
        type= "text"
        placeholder='Enter your URL to be shortened'
        value={longURL}
        onChange={(e)=>setLongUrl(e.target.value)}
       />
       <button>Go</button>
       </form>

        {/* Below div will appear with a option to copy and reset on success*/}

          {response.status !== 200 ? <div> {shortLink.description}</div> :
            (active && response.status === 200 )?
            <div className='result'>
                    <p>Shortened URL : {shortLink.link}</p>
                    <CopyToClipboard
                        onCopy = {() => {setCopy(true);}}
                        text = {shortLink.link}>
                        <button>{!copy ? "Copy to Clipboard" : "Copied"}</button>
                    </CopyToClipboard>
                    <button onClick={handleReset}>Reset</button>
            </div>
            : null}
    </div>
  )
}
