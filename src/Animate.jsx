import React, { memo } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import './style/animate.css/animate.min.css';
import './style/animate/_fade.scss';

const Animate = ({ delay = 0, children }) => {
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeOutDown"
      delay={delay}
      // scrollableParentSelector={scrollableParentSelector}
      animateOnce={true}
    >
      {children}
    </ScrollAnimation>
  );
};
export default memo(Animate);
