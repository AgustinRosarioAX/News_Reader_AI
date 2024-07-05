// import React , { useState, useEffect}from "react";
// import alanBtn from "@alan-ai/alan-sdk-web";

// import wordsToNumbers from "words-to-numbers";
// import NewsCards from "./components/NewsCards/NewsCards";
// import useStyles from './styles';

// const App = () => {
//   const [newsArticles, setNewsArticles] = useState([]);
//   const [activeArticle, setActiveArticle]=useState(-1);
//   const classes = useStyles();

//   useEffect(() => {
//     alanBtn({
//       key: '357e9e36fe6c1ed460dc8fb0d9873e712e956eca572e1d8b807a3e2338fdd0dc/stage',
//       onCommand: ({ command, articles, number}) => {
//         if(command === 'newHeadlines') {
//           setNewsArticles(articles);
//           setActiveArticle(-1);
//         } else if(command==='highlight') {
//           setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
         
//         } else if (command === 'open') {
//           const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
//           const article = articles[parsedNumber - 1];

//           if (parsedNumber > articles.length) {
//             alanBtn().playText('Please try that again...');
//           } else if (article) {
//             window.open(article.url);
//             alanBtn().playText('Opening...');
//           } else {
//             alanBtn().playText('Please try that again...');
//           }
//         }

//       }
//     })
//   }, []);

//   return (
//     <div>
//       <div className={classes.logoContainer}>
//         <img  src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg" className={classes.alanLogo} alt="alan logo"></img>
//       </div>
//       <h3>Created by Agustin Rosario</h3>
//       <NewsCards articles = {newsArticles} activeArticle= {activeArticle} />
//     </div>
//   );


// }
// export default App;

import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  const alanBtnInstance = useRef(null); // Use a ref to store the Alan Button instance

  useEffect(() => {
    if (!alanBtnInstance.current) {
      // Only create the Alan Button instance if it hasn't been created yet
      alanBtnInstance.current = alanBtn({
        key: '357e9e36fe6c1ed460dc8fb0d9873e712e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > articles.length) {
              alanBtnInstance.current.playText('Please try that again...');
            } else if (article) {
              window.open(article.url);
              alanBtnInstance.current.playText('Opening...');
            } else {
              alanBtnInstance.current.playText('Please try that again...');
            }
          }
        }
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg" className={classes.alanLogo} alt="alan logo" />
      </div>
      <h3>Created by Agustin Rosario</h3>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;