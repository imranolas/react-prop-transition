import { Component } from 'react';
import PropTypes from 'prop-types';
import { interpolateObject } from 'd3-interpolate';
import { timer } from 'd3-timer';
import easeMap from './easing';

export default class Transition extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    duration: PropTypes.number,
    easing: PropTypes.oneOf(Object.keys(easeMap)),
    props: PropTypes.object.isRequired
  };

  static defaultProps = {
    duration: 400,
    easing: 'cubicOut'
  };

  constructor(props) {
    super(props);
    this.state = {
      props: props.props
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.props !== prevProps.props ||
      this.props.duration !== prevProps.duration ||
      this.props.easing !== prevProps.easing
    ) {
      this.timer && this.timer.stop();
      this.interpolator = interpolateObject(this.state.props, this.props.props);
      this.start();
    }
  }

  componentWillUnmount = () => {
    this.timer && this.timer.stop();
  };

  start = () => {
    this.timer = timer(this.animate);
  };

  animate = elapsed => {
    this.timer || this.start();
    const { duration, easing } = this.props;
    const t = elapsed / duration;
    let nextState;
    if (t > 1) {
      nextState = this.interpolator(1);
      this.timer.stop();
    } else {
      nextState = this.interpolator(easeMap[easing](t));
    }
    this.setState({ props: nextState });
  };

  render() {
    const { children } = this.props;
    return children(this.state.props);
  }
}
