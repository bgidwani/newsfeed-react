import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, ButtonBase, Modal, Zoom } from '@material-ui/core';
import Typography from '../components/Typography';
import ReactGA from 'react-ga';

import CategoryData from '../../data/categories.json';
import Articles from './Articles';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        background: theme.palette.common.white,
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '40vh',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function Categories(props) {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const [currentCateogry, setCurrentCategory] = React.useState({});

    const openCategory = (category) => {
        //console.log('Inside open category', category);
        ReactGA.event({
            category: 'Category',
            action: 'Category selected',
            label: category.title,
        });

        setCurrentCategory(category);
        setOpen(true);
    };

    const closeCategory = () => {
        //console.log('closing modal');
        setOpen(false);
    };

    return (
        <Container className={classes.root} component="section">
            <div className={classes.images}>
                {CategoryData.map((category) => (
                    <ButtonBase
                        key={category.title}
                        className={classes.imageWrapper}
                        style={{
                            width: category.width,
                        }}
                    >
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${category.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <div
                            className={classes.imageButton}
                            onClick={() => openCategory(category)}
                        >
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {category.title}
                                <div className={classes.imageMarked} />
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
                <Modal
                    key="articles"
                    className={classes.modal}
                    open={open}
                    onClose={closeCategory}
                >
                    <Zoom in={open} style={{ transitionDelay: '500ms' }}>
                        <Articles category={currentCateogry} />
                    </Zoom>
                </Modal>
            </div>
        </Container>
    );
}

Categories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
