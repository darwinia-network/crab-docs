import React, { memo } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import './animate.css/animate.min.css';
import './animate/_fade.scss';

const Animate = ({ delay = 0, className={}, style={}, children }) => {
    return (
        <ScrollAnimation
            animateIn="fadeInUp"
            animateOut="fadeOutDown"
            delay={delay}
            // scrollableParentSelector={scrollableParentSelector}
            animateOnce={true}
            className={className}
            style={style}
        >
            {children}
        </ScrollAnimation>
    );
};
export default memo(Animate);
