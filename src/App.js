import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.scss";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const duration = 1000;

const fetchQuote = async () => {
  let response = await fetch("http://api.quotable.io/random");
  if (!response.ok) {
    throw new Error();
  } else {
    const result = await response.json();
    return result;
  }
};

function App() {
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState();

  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    getNewQuote();
  }, []);

  const getNewQuote = () => {
    fetchQuote()
      .then((data) => {
        let randomIndex = Math.floor(Math.random() * colors.length);
        setTimeout(() => {
          setColor(colors[randomIndex]);
          setQuote({
            text: data.content,
            author: data.author,
          });
          setInProp(true);
        }, duration / 2);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: color,
        transition: `background-color ${duration}ms ease-in-out`,
      }}
    >
      <div id="wrapper">
        <div id="quote-box">
          <CSSTransition
            nodeRef={nodeRef}
            in={inProp}
            timeout={duration}
            classNames="my-node"
            mountOnEnter
            unmountOnExit
          >
            <div ref={nodeRef} style={{ color }}>
              <div className="quote-text">
                <i className="fa fa-quote-left"></i>
                <span id="text">{quote.text}</span>
              </div>
              <div className="quote-author" style={{ color }}>
                - <span id="author">{quote.author}</span>
              </div>
            </div>
          </CSSTransition>

          <div className="buttons">
            <a
              href={
                "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                encodeURIComponent('"' + quote.text + '" ' + quote.author)
              }
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
              style={{
                backgroundColor: color,
                transition: `background-color ${duration}ms ease-in-out`,
              }}
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              href={
                "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                encodeURIComponent(quote.author) +
                "&content=" +
                encodeURIComponent(quote.text) +
                "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
              }
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_top"
              style={{
                backgroundColor: color,
                transition: `background-color ${duration}ms ease-in-out`,
              }}
            >
              <i className="fa fa-tumblr"></i>
            </a>
            <button
              className="button"
              id="new-quote"
              onClick={() => {
                setInProp(false);
                getNewQuote();
              }}
              style={{
                backgroundColor: color,
                transition: `background-color ${duration}ms ease-in-out`,
              }}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
