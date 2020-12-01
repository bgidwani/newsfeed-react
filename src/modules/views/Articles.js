import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Typography from '../components/Typography';
import * as NewsService from '../services/newsservice';
import { Animator } from 'lottie-react';
import newsLoadingData from '../../assets/lottie/news_loader.json';
import ReactGA from 'react-ga';

const styles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '90%',
        overflow: 'hidden',
        backgroundColor: theme.palette.common.white,
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(20),
        display: 'flex',
        flexWrap: 'wrap',
    },
    articlesContainer: {
        marginTop: theme.spacing(5),
        height: '70vh',
        overflow: 'auto',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
    },
    image: {
        width: '100%',
    },
    title: {
        marginTop: theme.spacing(1),
        fontSize: '0.8rem',
    },
    source: {
        marginLeft: theme.spacing(6),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    description: {
        fontSize: '0.9rem',
    },
}));

const Articles = React.forwardRef((props, ref) => {
    //console.log('Article', props);
    const category = props.category;
    const classes = styles();
    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        //console.log('Retrieving data');
        setLoading(true);
        NewsService.getData(category).then((data) => {
            //console.log(data);
            setLoading(false);
            setArticles(data.articles);
        });
    }, [category]);

    return (
        <section className={classes.root}>
            <Container className={classes.root} component="section">
                <Typography
                    variant="h4"
                    marked="center"
                    align="center"
                    component="h2"
                >
                    {category.title}
                </Typography>
                <Grid
                    container
                    spacing={5}
                    className={classes.articlesContainer}
                >
                    {articles.map((article) => (
                        <Grid key={article.title} item xs={12} md={4}>
                            <div className={classes.item}>
                                <ReactGA.OutboundLink
                                    eventLabel={article.url}
                                    to={article.url}
                                    target="_blank"
                                >
                                    <img
                                        className={classes.image}
                                        src={article.urlToImage}
                                        alt={article.title}
                                    />
                                    <Typography
                                        variant="h6"
                                        className={classes.title}
                                    >
                                        {article.title}
                                    </Typography>
                                </ReactGA.OutboundLink>
                                <Typography
                                    variant="caption"
                                    className={classes.source}
                                >
                                    {'- '}
                                    {article.source.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={classes.description}
                                >
                                    {article.description &&
                                    article.description.indexOf('</') !== -1 ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: article.description.replace(
                                                    /(<? *script)/gi,
                                                    'illegalscript'
                                                ),
                                            }}
                                        ></div>
                                    ) : (
                                        article.description
                                    )}
                                </Typography>
                            </div>
                        </Grid>
                    ))}

                    {loading && (
                        <Grid item xs={10} md={10}>
                            <Animator
                                style={{ height: '400px' }}
                                animationData={newsLoadingData}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </section>
    );
});

Articles.propTypes = {
    category: PropTypes.object.isRequired,
};

export default Articles;
