import React, {useState,useEffect,createRef}from "react";
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@mui/material';

import useStyles from './styles.js';
const NewsCard = ({article: { description, publishedAt, source, title, url, urlToImage}, i , activeArticle}) => {
    const classes= useStyles();
    const [elRefs, setelRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setelRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));

    },[]);

    useEffect(() => {
        if(i===activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }

    }, [i, activeArticle,elRefs])
    return (
        <Card ref = {elRefs[i]} className={(classes.card , activeArticle === i ? classes.activeCard :null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image= {urlToImage || "https://www.google.com/imgres?q=news%20images&imgurl=https%3A%2F%2Fst.depositphotos.com%2F1011646%2F1255%2Fi%2F450%2Fdepositphotos_12553000-stock-photo-breaking-news-screen.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fphotos%2Fbreaking-news.html&docid=y9OSUFClMWc5QM&tbnid=S3OjdZLXTY42XM&vet=12ahUKEwiL_76394uHAxXL_7sIHW-xDPcQM3oECEYQAA..i&w=600&h=400&hcb=2&ved=2ahUKEwiL_76394uHAxXL_7sIHW-xDPcQM3oECEYQAA"}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date (publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom varient="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
                
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard;
